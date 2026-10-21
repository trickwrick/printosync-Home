import { connectToDatabase } from "@/shared/lib/db";
import { BlogPostModel, IBlogPostDoc } from "@/shared/lib/models/blog-post";
import { blogPosts as defaultBlogPosts, BlogPost } from "@/shared/lib/seo/blog-posts";

export interface LiveBlogPost extends BlogPost {
  _id?: string;
  coverImage?: string;
  order?: number;
  isActive?: boolean;
}

export async function getLiveBlogPosts(): Promise<LiveBlogPost[]> {
  try {
    await connectToDatabase();
    const docs = await BlogPostModel.find({ isActive: { $ne: false } })
      .sort({ order: 1, datePublished: -1 })
      .lean<IBlogPostDoc[]>();

    if (docs && docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        path: d.path || `/blog/${d.slug}`,
        title: d.title,
        description: d.description || "",
        excerpt: d.excerpt || "",
        coverImage: d.coverImage || "",
        datePublished: d.datePublished || "",
        dateModified: d.dateModified || "",
        author: d.author || "PrintoSync Team",
        readTime: d.readTime || "5 min read",
        keywords: d.keywords || [],
        imageAlt: d.imageAlt || d.title,
        sections: Array.isArray(d.sections) ? d.sections : [],
        isActive: d.isActive !== false,
      }));
    }
  } catch (err) {
    console.error("Error fetching live blog posts:", err);
  }

  return defaultBlogPosts as LiveBlogPost[];
}

export async function getLiveBlogPostBySlug(slug: string): Promise<LiveBlogPost | null> {
  try {
    await connectToDatabase();
    const doc = await BlogPostModel.findOne({ slug }).lean<IBlogPostDoc | null>();
    if (doc) {
      const d = doc;
      return {
        slug: d.slug,
        path: d.path || `/blog/${d.slug}`,
        title: d.title,
        description: d.description || "",
        excerpt: d.excerpt || "",
        coverImage: d.coverImage || "",
        datePublished: d.datePublished || "",
        dateModified: d.dateModified || "",
        author: d.author || "PrintoSync Team",
        readTime: d.readTime || "5 min read",
        keywords: d.keywords || [],
        imageAlt: d.imageAlt || d.title,
        sections: Array.isArray(d.sections) ? d.sections : [],
        isActive: d.isActive !== false,
      };
    }
  } catch (err) {
    console.error("Error fetching live blog post by slug:", err);
  }

  const fallback = defaultBlogPosts.find((p) => p.slug === slug);
  return fallback ? (fallback as LiveBlogPost) : null;
}
