import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { IndustryModel } from "@/shared/lib/models/industry";
import { industries as defaultIndustries } from "@/entities/marketing/content";

export async function GET() {
  try {
    await connectToDatabase();
    let industriesFromDb = await IndustryModel.find({}).sort({ order: 1, createdAt: 1 }).lean();

    // If empty in MongoDB, seed initial 10 industries
    if (!industriesFromDb || industriesFromDb.length === 0) {
      const seeded = await IndustryModel.insertMany(
        defaultIndustries.map((ind, idx) => ({
          slug: ind.slug,
          title: ind.title,
          shortTitle: ind.title,
          eyebrow: ind.eyebrow || "Industry solution",
          description: ind.description || "",
          features: ind.features || [],
          benefits: ind.benefits || [],
          keywords: ind.keywords || [],
          seoTitle: `${ind.title} Management Software | PrintoSync`,
          seoDescription: ind.description,
          order: idx,
          isActive: true,
        }))
      );
      industriesFromDb = seeded.map((item) => item.toObject());
    }

    return NextResponse.json({ success: true, industries: industriesFromDb });
  } catch (error) {
    console.error("Error fetching industries from MongoDB:", error);
    return NextResponse.json({ success: true, industries: defaultIndustries });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { industry: singleIndustry, action, industries } = body;

    await connectToDatabase();

    // Batch reorder / status update
    if (action === "reorder" && Array.isArray(industries)) {
      for (const item of industries) {
        if (item.slug) {
          await IndustryModel.findOneAndUpdate(
            { slug: item.slug },
            { order: item.order, isActive: item.isActive }
          );
        }
      }
      const updatedList = await IndustryModel.find({}).sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({ success: true, industries: updatedList });
    }

    // Save or update single industry
    if (singleIndustry && singleIndustry.slug) {
      const validFaqs = Array.isArray(singleIndustry.faqs)
        ? singleIndustry.faqs.filter(
            (f: any) => f && typeof f.question === "string" && f.question.trim().length > 0
          ).map((f: any) => ({
            question: f.question.trim(),
            answer: (f.answer || "").trim(),
          }))
        : [];

      const updated = await IndustryModel.findOneAndUpdate(
        { slug: singleIndustry.slug },
        {
          $set: {
            slug: singleIndustry.slug,
            title: singleIndustry.title,
            shortTitle: singleIndustry.shortTitle || singleIndustry.title,
            eyebrow: singleIndustry.eyebrow || "Industry solution",
            description: singleIndustry.description || "",
            features: singleIndustry.features || [],
            benefits: singleIndustry.benefits || [],
            keywords: singleIndustry.keywords || [],
            seoTitle: singleIndustry.seoTitle || "",
            seoDescription: singleIndustry.seoDescription || "",
            faqs: validFaqs,
            order: typeof singleIndustry.order === "number" ? singleIndustry.order : 0,
            isActive: singleIndustry.isActive !== undefined ? singleIndustry.isActive : true,
          },
        },
        { upsert: true, returnDocument: "after" }
      );
      return NextResponse.json({ success: true, industry: updated });
    }

    return NextResponse.json(
      { success: false, error: "Invalid industry payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving industry:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save industry";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Missing industry slug" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await IndustryModel.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, message: "Industry deleted successfully" });
  } catch (error) {
    console.error("Error deleting industry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete industry" },
      { status: 500 }
    );
  }
}
