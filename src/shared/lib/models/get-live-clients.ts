import { connectToDatabase } from "@/shared/lib/db";
import { ClientLogoModel } from "@/shared/lib/models/client-logo";
import { clientLogos as defaultClientLogos } from "@/shared/config/navigation";

export interface LiveClientItem {
  _id?: string;
  name: string;
  logoUrl?: string;
}

export async function getLiveClientLogos(): Promise<LiveClientItem[]> {
  try {
    await connectToDatabase();
    const list = await ClientLogoModel.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    if (list && list.length > 0) {
      return list.map((c) => ({
        _id: String(c._id),
        name: c.name,
        logoUrl: c.logoUrl || "",
      }));
    }
  } catch (error) {
    console.error("Failed to query live client logos:", error);
  }

  return defaultClientLogos.map((name) => ({
    name,
    logoUrl: "",
  }));
}
