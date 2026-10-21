import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIndustryFaq {
  question: string;
  answer: string;
}

export interface IIndustry extends Document {
  slug: string;
  title: string;
  shortTitle?: string;
  eyebrow: string;
  description: string;
  features: string[];
  benefits: string[];
  keywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: IIndustryFaq[];
  order?: number;
  isActive?: boolean;
}

const IndustryFaqSchema = new Schema<IIndustryFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const IndustrySchema = new Schema<IIndustry>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortTitle: { type: String, default: "" },
    eyebrow: { type: String, default: "Industry solution" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    faqs: { type: [IndustryFaqSchema], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const IndustryModel: Model<IIndustry> =
  mongoose.models.Industry ||
  mongoose.model<IIndustry>("Industry", IndustrySchema);
