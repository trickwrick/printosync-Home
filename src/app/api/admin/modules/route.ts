import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

    const data =
      !modulesFromDb || modulesFromDb.length === 0
        ? defaultModules
        : modulesFromDb;

    return NextResponse.json(
      { success: true, modules: data },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
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
    const itemsToInsert = modules.map((item: ModulePayloadItem, idx: number) => {
      // Filter out empty FAQs so Mongoose required validation doesn't fail
      const validFaqs = Array.isArray(item.faqs)
        ? item.faqs.filter((f) => f && f.question && f.question.trim() !== "")
        : [];

      return {
        slug: item.slug.trim(),
        title: item.title.trim(),
        shortTitle: (item.shortTitle || item.title).trim(),
        eyebrow: (item.eyebrow || "").trim(),
        description: (item.description || "").trim(),
        features: Array.isArray(item.features) ? item.features.filter(Boolean) : [],
        benefits: Array.isArray(item.benefits) ? item.benefits.filter(Boolean) : [],
        keywords: Array.isArray(item.keywords) ? item.keywords.filter(Boolean) : [],
        seoTitle: (item.seoTitle || "").trim(),
        seoDescription: (item.seoDescription || "").trim(),
        faqs: validFaqs,
        order: idx,
      };
    });

    await ModuleModel.insertMany(itemsToInsert);

    try {
      revalidatePath("/modules/[slug]", "page");
      revalidatePath("/", "page");
    } catch (revalErr) {
      console.warn("Revalidation notice:", revalErr);
    }

    const saved = await ModuleModel.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, modules: saved });
  } catch (error) {
    console.error("Error saving modules to MongoDB:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to update modules";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
