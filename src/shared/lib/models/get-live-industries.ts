import { connectToDatabase } from "@/shared/lib/db";
import { IndustryModel } from "@/shared/lib/models/industry";
import { industries as defaultIndustries, MarketingEntry } from "@/entities/marketing/content";

export interface LiveIndustryEntry extends MarketingEntry {
  shortTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  faqs?: Array<{ question: string; answer: string }>;
  isActive?: boolean;
}

export async function getLiveIndustries(): Promise<LiveIndustryEntry[]> {
  try {
    await connectToDatabase();
    const docs = await IndustryModel.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    if (docs && docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        shortTitle: d.shortTitle || d.title,
        eyebrow: d.eyebrow || "Industry solution",
        description: d.description || "",
        features: d.features || [],
        benefits: d.benefits || [],
        keywords: d.keywords || [],
        seoTitle: d.seoTitle || "",
        seoDescription: d.seoDescription || "",
        faqs: Array.isArray(d.faqs) ? d.faqs : [],
        isActive: d.isActive !== false,
      }));
    }
  } catch (err) {
    console.error("Error reading live industries from DB:", err);
  }

  return defaultIndustries as LiveIndustryEntry[];
}

export async function getLiveIndustryBySlug(slug: string): Promise<LiveIndustryEntry | null> {
  try {
    await connectToDatabase();
    const doc = await IndustryModel.findOne({ slug }).lean();
    if (doc) {
      return {
        slug: doc.slug,
        title: doc.title,
        shortTitle: doc.shortTitle || doc.title,
        eyebrow: doc.eyebrow || "Industry solution",
        description: doc.description || "",
        features: doc.features || [],
        benefits: doc.benefits || [],
        keywords: doc.keywords || [],
        seoTitle: doc.seoTitle || "",
        seoDescription: doc.seoDescription || "",
        faqs: Array.isArray(doc.faqs) ? doc.faqs : [],
        isActive: doc.isActive !== false,
      };
    }
  } catch (err) {
    console.error("Error reading live industry by slug from DB:", err);
  }

  const fallback = defaultIndustries.find((item) => item.slug === slug);
  return fallback ? (fallback as LiveIndustryEntry) : null;
}
