import { connectToDatabase } from "@/shared/lib/db";
import { BlogPostModel, IBlogPostDoc } from "@/shared/lib/models/blog-post";
import type { BlogPost } from "@/shared/lib/seo/blog-posts";

export interface LiveBlogPost extends BlogPost {
  _id?: string;
  coverImage?: string;
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  category?: string;
  tags?: string[];
  faqs?: { question: string; answer: string }[];
}

export async function getLiveBlogPosts(): Promise<LiveBlogPost[]> {
  try {
    await connectToDatabase();
    const docs = await BlogPostModel.find({ isActive: { $ne: false } })
      .sort({ order: 1, datePublished: -1 })
      .lean<IBlogPostDoc[]>();

    if (docs) {
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
        category: d.category || "General",
        tags: Array.isArray(d.tags) ? d.tags : [],
        keywords: d.keywords || [],
        imageAlt: d.imageAlt || d.title,
        sections: Array.isArray(d.sections) ? d.sections : [],
        faqs: Array.isArray(d.faqs) ? d.faqs : [],
        isFeatured: Boolean(d.isFeatured),
        isActive: d.isActive !== false,
      }));
    }
  } catch (err) {
    console.error("Error fetching live blog posts:", err);
  }

  return [];
}

export async function getLiveBlogPostBySlug(slug: string): Promise<LiveBlogPost | null> {
  try {
    await connectToDatabase();
    const doc = await BlogPostModel.findOne({ slug, isActive: { $ne: false } }).lean<IBlogPostDoc | null>();
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
        category: d.category || "General",
        tags: Array.isArray(d.tags) ? d.tags : [],
        keywords: d.keywords || [],
        imageAlt: d.imageAlt || d.title,
        sections: Array.isArray(d.sections) ? d.sections : [],
        faqs: Array.isArray(d.faqs) ? d.faqs : [],
        isFeatured: Boolean(d.isFeatured),
        isActive: d.isActive !== false,
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching live blog post by slug:", err);
    return null;
  }
}
