import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { HomeFaqModel } from "@/shared/lib/models/home-faq";
import { faqs as defaultFaqs } from "@/widgets/home/content";

const DEFAULT_HOMEPAGE_FAQS = defaultFaqs.map((item, idx) => ({
  question: item.question,
  answer: item.answer,
  order: idx,
  isActive: true,
}));

export async function GET() {
  try {
    await connectToDatabase();
    let faqsFromDb = await HomeFaqModel.find({}).sort({ order: 1, createdAt: 1 }).lean();

    if (!faqsFromDb || faqsFromDb.length === 0) {
      const seeded = await HomeFaqModel.insertMany(DEFAULT_HOMEPAGE_FAQS);
      faqsFromDb = seeded.map((item) => item.toObject());
    }

    return NextResponse.json({ success: true, faqs: faqsFromDb });
  } catch (error) {
    console.error("Error fetching homepage FAQs:", error);
    return NextResponse.json({ success: true, faqs: DEFAULT_HOMEPAGE_FAQS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, faq, faqs } = body;

    await connectToDatabase();

    // Reorder action
    if (action === "reorder" && Array.isArray(faqs)) {
      for (const item of faqs) {
        if (item._id) {
          await HomeFaqModel.findByIdAndUpdate(item._id, {
            order: item.order,
            isActive: item.isActive,
          });
        }
      }
      const updatedList = await HomeFaqModel.find({}).sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({ success: true, faqs: updatedList });
    }

    // Single FAQ upsert
    if (faq) {
      const question = (faq.question || "").trim();
      const answer = (faq.answer || "").trim();

      if (!question || !answer) {
        return NextResponse.json(
          { success: false, error: "Both question and answer are required." },
          { status: 400 }
        );
      }

      const isValidObjectId =
        faq._id &&
        typeof faq._id === "string" &&
        /^[0-9a-fA-F]{24}$/.test(faq._id);

      if (isValidObjectId) {
        const updated = await HomeFaqModel.findByIdAndUpdate(
          faq._id,
          {
            question,
            answer,
            order: typeof faq.order === "number" ? faq.order : 0,
            isActive: faq.isActive !== undefined ? faq.isActive : true,
          },
          { returnDocument: "after" }
        );
        if (updated) {
          return NextResponse.json({ success: true, faq: updated });
        }
      }

      const count = await HomeFaqModel.countDocuments();
      const created = await HomeFaqModel.create({
        question,
        answer,
        order: typeof faq.order === "number" ? faq.order : count,
        isActive: faq.isActive !== undefined ? faq.isActive : true,
      });
      return NextResponse.json({ success: true, faq: created });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action or payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving homepage FAQ:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save homepage FAQ";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing FAQ ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await HomeFaqModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting homepage FAQ:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete homepage FAQ" },
      { status: 500 }
    );
  }
}
