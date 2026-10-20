import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { ModuleModel } from "@/shared/lib/models/module";
import { modules as defaultModules } from "@/entities/marketing/content";

interface ModulePayloadItem {
  slug: string;
  title: string;
  shortTitle?: string;
  eyebrow?: string;
  description?: string;
  features?: string[];
  benefits?: string[];
  keywords?: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export async function GET() {
  try {
    await connectToDatabase();
    const modulesFromDb = await ModuleModel.find({}).sort({ order: 1 }).lean();

    if (!modulesFromDb || modulesFromDb.length === 0) {
      return NextResponse.json({ success: true, modules: defaultModules });
    }

    return NextResponse.json({ success: true, modules: modulesFromDb });
  } catch (error) {
    console.error("Error fetching modules from MongoDB:", error);
    return NextResponse.json({ success: true, modules: defaultModules });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { modules, module: singleModule } = body;

    await connectToDatabase();

    if (singleModule && typeof singleModule === "object" && singleModule.slug) {
      // Upsert a single module
      await ModuleModel.findOneAndUpdate(
        { slug: singleModule.slug },
        {
          $set: {
            slug: singleModule.slug,
            title: singleModule.title,
            shortTitle: singleModule.shortTitle || singleModule.title,
            eyebrow: singleModule.eyebrow || "",
            description: singleModule.description || "",
            features: singleModule.features || [],
            benefits: singleModule.benefits || [],
            keywords: singleModule.keywords || [],
            seoTitle: singleModule.seoTitle || "",
            seoDescription: singleModule.seoDescription || "",
            faqs: Array.isArray(singleModule.faqs) ? singleModule.faqs : [],
          },
        },
        { upsert: true, new: true }
      );

      const all = await ModuleModel.find({}).sort({ order: 1 }).lean();
      return NextResponse.json({ success: true, modules: all });
    }

    if (!Array.isArray(modules)) {
      return NextResponse.json(
        { success: false, error: "Invalid modules payload. Expected array 'modules' or object 'module'." },
        { status: 400 }
      );
    }

    // Upsert or replace modules with new list preserving order
    await ModuleModel.deleteMany({});
    const itemsToInsert = modules.map((item: ModulePayloadItem, idx: number) => ({
      slug: item.slug,
      title: item.title,
      shortTitle: item.shortTitle || item.title,
      eyebrow: item.eyebrow || "",
      description: item.description || "",
      features: item.features || [],
      benefits: item.benefits || [],
      keywords: item.keywords || [],
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      faqs: Array.isArray(item.faqs) ? item.faqs : [],
      order: idx,
    }));

    await ModuleModel.insertMany(itemsToInsert);

    const saved = await ModuleModel.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, modules: saved });
  } catch (error) {
    console.error("Error saving modules to MongoDB:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update modules" },
      { status: 500 }
    );
  }
}
