import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClientLogo extends Document {
  name: string;
  logoUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClientLogoSchema = new Schema<IClientLogo>(
  {
    name: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ClientLogoModel: Model<IClientLogo> =
  mongoose.models.ClientLogo ||
  mongoose.model<IClientLogo>("ClientLogo", ClientLogoSchema);
