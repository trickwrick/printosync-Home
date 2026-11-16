import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogSection {
  heading: string;
  paragraphs: string[];
}

export interface IBlogFaq {
  question: string;
  answer: string;
}

export interface IBlogPostDoc extends Document {
  slug: string;
  path: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage?: string;
  imageAlt?: string;
  datePublished: string;
  dateModified: string;
  author: string;
  readTime: string;
  category?: string;
  tags?: string[];
  keywords: string[];
  contentHtml?: string;
  sections: IBlogSection[];
  faqs?: IBlogFaq[];
  isFeatured?: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<IBlogSection>(
  {
    heading: { type: String, required: true },
    paragraphs: { type: [String], default: [] },
  },
  { _id: false }
);

const BlogFaqSchema = new Schema<IBlogFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPostDoc>(
  {
    slug: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    datePublished: { type: String, default: "" },
    dateModified: { type: String, default: "" },
    author: { type: String, default: "PrintoSync Team" },
    readTime: { type: String, default: "5 min read" },
    category: { type: String, default: "General" },
    tags: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
    contentHtml: { type: String, default: "" },
    sections: { type: [BlogSectionSchema], default: [] },
    faqs: { type: [BlogFaqSchema], default: [] },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const BlogPostModel: Model<IBlogPostDoc> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPostDoc>("BlogPost", BlogPostSchema);
