import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  id: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  pressType?: string;
  city?: string;
  state?: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "completed" | "archived";
}

const InquirySchema = new Schema<IInquiry>(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    pressType: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    message: { type: String, default: "" },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
