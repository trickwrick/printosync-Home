import { connectToDatabase } from "@/shared/lib/db";
import { ModuleModel } from "@/shared/lib/models/module";
import { modules as defaultModules, MarketingEntry } from "@/entities/marketing/content";

export interface LiveModuleEntry extends MarketingEntry {
  seoTitle?: string;
  seoDescription?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export async function getLiveModules(): Promise<LiveModuleEntry[]> {
  try {
    await connectToDatabase();
    const docs = await ModuleModel.find({}).sort({ order: 1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        shortTitle: d.shortTitle || d.title,
        eyebrow: d.eyebrow || "",
        description: d.description || "",
        features: d.features || [],
        benefits: d.benefits || [],
        keywords: d.keywords || [],
        seoTitle: d.seoTitle || "",
        seoDescription: d.seoDescription || "",
        faqs: Array.isArray(d.faqs) ? d.faqs : [],
      }));
    }
  } catch (err) {
    console.error("Error reading live modules from DB:", err);
  }

  return defaultModules as LiveModuleEntry[];
}

export async function getLiveModuleBySlug(slug: string): Promise<LiveModuleEntry | null> {
  const normalizedSlug = (slug || "").trim().toLowerCase();
  try {
    await connectToDatabase();
    const doc = await ModuleModel.findOne({
      slug: { $regex: new RegExp(`^${normalizedSlug}$`, "i") },
    }).lean();
    if (doc) {
      return {
        slug: doc.slug,
        title: doc.title,
        shortTitle: doc.shortTitle || doc.title,
        eyebrow: doc.eyebrow || "",
        description: doc.description || "",
        features: doc.features || [],
        benefits: doc.benefits || [],
        keywords: doc.keywords || [],
        seoTitle: doc.seoTitle || "",
        seoDescription: doc.seoDescription || "",
        faqs: Array.isArray(doc.faqs) ? doc.faqs : [],
      };
    }
  } catch (err) {
    console.error("Error reading live module by slug from DB:", err);
  }

  const fallback = defaultModules.find(
    (m) => m.slug.toLowerCase() === normalizedSlug
  );
  return (fallback as LiveModuleEntry) || null;
}
