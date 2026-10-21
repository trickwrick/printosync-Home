import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomeFaq extends Document {
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HomeFaqSchema = new Schema<IHomeFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const HomeFaqModel: Model<IHomeFaq> =
  mongoose.models.HomeFaq || mongoose.model<IHomeFaq>("HomeFaq", HomeFaqSchema);
