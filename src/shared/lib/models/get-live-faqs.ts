import { connectToDatabase } from "@/shared/lib/db";
import { HomeFaqModel } from "@/shared/lib/models/home-faq";
import { faqs as defaultFaqs } from "@/widgets/home/content";

export interface LiveFaqItem {
  _id?: string;
  question: string;
  answer: string;
}

export async function getLiveHomeFaqs(): Promise<LiveFaqItem[]> {
  try {
    await connectToDatabase();
    const docs = await HomeFaqModel.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    if (docs && docs.length > 0) {
      return docs.map((d) => ({
        _id: String(d._id),
        question: d.question,
        answer: d.answer,
      }));
    }
  } catch (err) {
    console.error("Error reading live homepage FAQs from DB:", err);
  }

  return defaultFaqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));
}
