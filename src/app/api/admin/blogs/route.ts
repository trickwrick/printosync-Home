import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/shared/lib/db";
import { BlogPostModel } from "@/shared/lib/models/blog-post";
import { SystemSettingModel } from "@/shared/lib/models/system-setting";
import { blogPosts as defaultBlogPosts } from "@/shared/lib/seo/blog-posts";

export async function GET() {
  try {
    await connectToDatabase();
    const seededSetting = await SystemSettingModel.findOne({ key: "blogs_seeded" }).lean();
    let posts = await BlogPostModel.find({}).sort({ order: 1, createdAt: -1 }).lean();

    // Only seed once on initial fresh install if never seeded before
    if (!seededSetting) {
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
      await SystemSettingModel.findOneAndUpdate(
        { key: "blogs_seeded" },
        { $set: { key: "blogs_seeded", value: true } },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true, posts: posts || [] });
  } catch (error) {
    console.error("Error fetching blog posts from DB:", error);
    return NextResponse.json({ success: false, posts: [], error: "Failed to fetch blogs" });
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

      // Sanitize sections so invalid/empty entries don't fail Mongoose validation
      interface RawBlogSection {
        heading?: unknown;
        paragraphs?: unknown;
      }

      const sanitizedSections = Array.isArray(post.sections)
        ? (post.sections as RawBlogSection[])
            .filter((sec): sec is RawBlogSection & { heading: string } => 
              Boolean(sec && typeof sec.heading === "string" && sec.heading.trim().length > 0)
            )
            .map((sec) => ({
              heading: sec.heading.trim(),
              paragraphs: Array.isArray(sec.paragraphs)
                ? (sec.paragraphs as unknown[])
                    .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
                    .map((p) => p.trim())
                : [],
            }))
        : [];

      const sanitizedFaqs = Array.isArray(post.faqs)
        ? post.faqs
            .filter((f: { question?: string; answer?: string }) => f && typeof f.question === "string" && f.question.trim().length > 0)
            .map((f: { question: string; answer?: string }) => ({
              question: f.question.trim(),
              answer: (f.answer || "").trim(),
            }))
        : [];

      const updated = await BlogPostModel.findOneAndUpdate(
        { slug },
        {
          $set: {
            slug,
            path,
            title: (post.title || "Untitled Article").trim(),
            description: (post.description || "").trim(),
            excerpt: (post.excerpt || "").trim(),
            coverImage: (post.coverImage || "").trim(),
            imageAlt: (post.imageAlt || post.title || "").trim(),
            datePublished: post.datePublished || now,
            dateModified: now,
            author: (post.author || "PrintoSync Team").trim(),
            readTime: (post.readTime || "5 min read").trim(),
            category: (post.category || "General").trim(),
            tags: Array.isArray(post.tags) ? post.tags.map((t: string) => String(t).trim()).filter(Boolean) : [],
            keywords: Array.isArray(post.keywords) ? post.keywords.map((k: string) => k.trim()).filter(Boolean) : [],
            contentHtml: typeof post.contentHtml === "string" ? post.contentHtml : "",
            sections: sanitizedSections,
            faqs: sanitizedFaqs,
            isFeatured: Boolean(post.isFeatured),
            order: typeof post.order === "number" ? post.order : 0,
            isActive: post.isActive !== undefined ? post.isActive : true,
          },
        },
        { upsert: true, returnDocument: "after" }
      );

      // Mark blogs as seeded so deletion won't re-trigger default post insertion
      await SystemSettingModel.findOneAndUpdate(
        { key: "blogs_seeded" },
        { $set: { key: "blogs_seeded", value: true } },
        { upsert: true }
      );

      try {
        revalidatePath("/blog");
        revalidatePath(path);
      } catch {}

      return NextResponse.json({ success: true, post: updated });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload: 'slug' and 'title' are required." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving blog post:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save blog post";
    return NextResponse.json(
      { success: false, error: errorMessage },
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

    // Mark as seeded so empty DB will never resurrect deleted defaults
    await SystemSettingModel.findOneAndUpdate(
      { key: "blogs_seeded" },
      { $set: { key: "blogs_seeded", value: true } },
      { upsert: true }
    );

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
    } catch {}

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
