import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  quote: string;
  author: string;
  authorInitial: string;
  designation: string;
  avatarUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    authorInitial: { type: String, default: "" },
    designation: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
