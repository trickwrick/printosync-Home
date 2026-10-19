import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomePageSeo extends Document {
  key: string; // 'home'
  metaTitle: string;
  metaDescription: string;
  h1Title?: string;
  keywords?: string[];
  ogImageAlt?: string;
}

const HomePageSeoSchema = new Schema<IHomePageSeo>(
  {
    key: { type: String, required: true, unique: true, default: "home" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    h1Title: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    ogImageAlt: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const HomePageSeoModel: Model<IHomePageSeo> =
  mongoose.models.HomePageSeo ||
  mongoose.model<IHomePageSeo>("HomePageSeo", HomePageSeoSchema);
