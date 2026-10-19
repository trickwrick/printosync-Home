import mongoose, { Schema, Document, Model } from "mongoose";

export interface IModuleFaq {
  question: string;
  answer: string;
}

export interface IModule extends Document {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  features: string[];
  benefits: string[];
  keywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: IModuleFaq[];
  order?: number;
}

const ModuleFaqSchema = new Schema<IModuleFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const ModuleSchema = new Schema<IModule>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    eyebrow: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    faqs: { type: [ModuleFaqSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const ModuleModel: Model<IModule> =
  mongoose.models.Module || mongoose.model<IModule>("Module", ModuleSchema);
