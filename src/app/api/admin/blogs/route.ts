import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { BlogPostModel } from "@/shared/lib/models/blog-post";
import { blogPosts as defaultBlogPosts } from "@/shared/lib/seo/blog-posts";

export async function GET() {
  try {
    await connectToDatabase();
    let posts = await BlogPostModel.find({}).sort({ order: 1, createdAt: -1 }).lean();

    // If empty in MongoDB, seed initial posts
    if (!posts || posts.length === 0) {
      const seeded = await BlogPostModel.insertMany(
        defaultBlogPosts.map((post, idx) => ({
          ...post,
          coverImage: "",
          order: idx,
          isActive: true,
        }))
      );
      posts = seeded.map((item) => item.toObject());
    }

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching blog posts from DB:", error);
    return NextResponse.json({ success: true, posts: defaultBlogPosts });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, post, posts } = body;

    await connectToDatabase();

    // Reorder action
    if (action === "reorder" && Array.isArray(posts)) {
      for (const item of posts) {
        if (item.slug) {
          await BlogPostModel.findOneAndUpdate(
            { slug: item.slug },
            { order: item.order, isActive: item.isActive }
          );
        }
      }
      const updatedList = await BlogPostModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
      return NextResponse.json({ success: true, posts: updatedList });
    }

    // Upsert single post
    if (post && post.slug) {
      const slug = post.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
      const path = `/blog/${slug}`;
      const now = new Date().toISOString().split("T")[0];

      const updated = await BlogPostModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            slug,
            path,
            title: post.title.trim(),
            description: post.description || "",
            excerpt: post.excerpt || "",
            coverImage: post.coverImage || "",
            imageAlt: post.imageAlt || post.title,
            datePublished: post.datePublished || now,
            dateModified: now,
            author: post.author || "PrintoSync Team",
            readTime: post.readTime || "5 min read",
            keywords: Array.isArray(post.keywords) ? post.keywords : [],
            sections: Array.isArray(post.sections) ? post.sections : [],
            order: typeof post.order === "number" ? post.order : 0,
            isActive: post.isActive !== undefined ? post.isActive : true,
          },
        },
        { upsert: true, new: true }
      );

      return NextResponse.json({ success: true, post: updated });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload or post slug" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Missing post slug" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await BlogPostModel.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
