import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { TestimonialModel } from "@/shared/lib/models/testimonial";

const DEFAULT_BOOK_DEMO_TESTIMONIALS = [
  {
    quote:
      "The demo helped me understand how PrintoSync simplifies offset job cards, GST invoicing, and manages paper inventory effortlessly.",
    author: "Rajesh Sharma",
    authorInitial: "RS",
    designation: "Sharma Offset & Packaging, Jaipur",
    avatarUrl: "",
    order: 0,
    isActive: true,
  },
  {
    quote:
      "We cut down our quotation and estimation time from 2 hours to 2 minutes. The live demonstration showed exactly what our operators needed.",
    author: "Amit Patel",
    authorInitial: "AP",
    designation: "Patel Color Graphics, Ahmedabad",
    avatarUrl: "",
    order: 1,
    isActive: true,
  },
  {
    quote:
      "Delivery challans, WhatsApp invoice links, and plate consumption tracking are unmatched. Highly recommended for commercial presses.",
    author: "Vikas Malhotra",
    authorInitial: "VM",
    designation: "Delhi Print Pack Solutions, New Delhi",
    avatarUrl: "",
    order: 2,
    isActive: true,
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    let testimonials = await TestimonialModel.find({}).sort({ order: 1, createdAt: 1 }).lean();

    if (!testimonials || testimonials.length === 0) {
      const seeded = await TestimonialModel.insertMany(DEFAULT_BOOK_DEMO_TESTIMONIALS);
      testimonials = seeded.map((t) => t.toObject());
    }

    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ success: true, testimonials: DEFAULT_BOOK_DEMO_TESTIMONIALS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, testimonial, testimonials } = body;

    await connectToDatabase();

    // Reorder action
    if (action === "reorder" && Array.isArray(testimonials)) {
      for (const item of testimonials) {
        if (item._id) {
          await TestimonialModel.findByIdAndUpdate(item._id, {
            order: item.order,
            isActive: item.isActive,
          });
        }
      }
      const updatedList = await TestimonialModel.find({}).sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({ success: true, testimonials: updatedList });
    }

    // Create or update single testimonial
    if (testimonial) {
      const initials = testimonial.authorInitial?.trim() ||
        testimonial.author
          ?.split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) ||
        "PS";

      const quote = (testimonial.quote || "").trim();
      const author = (testimonial.author || "").trim();

      if (!quote || !author) {
        return NextResponse.json(
          { success: false, error: "Both 'quote' and 'author' are required fields." },
          { status: 400 }
        );
      }

      const isValidObjectId =
        testimonial._id &&
        typeof testimonial._id === "string" &&
        /^[0-9a-fA-F]{24}$/.test(testimonial._id);

      if (isValidObjectId) {
        const updated = await TestimonialModel.findByIdAndUpdate(
          testimonial._id,
          {
            quote,
            author,
            authorInitial: initials,
            designation: testimonial.designation?.trim() || "",
            avatarUrl: testimonial.avatarUrl?.trim() || "",
            order: typeof testimonial.order === "number" ? testimonial.order : 0,
            isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
          },
          { returnDocument: "after" }
        );

        if (updated) {
          return NextResponse.json({ success: true, testimonial: updated });
        }
      }

      // If no valid _id or document not found by _id, create new
      const count = await TestimonialModel.countDocuments();
      const created = await TestimonialModel.create({
        quote,
        author,
        authorInitial: initials,
        designation: testimonial.designation?.trim() || "",
        avatarUrl: testimonial.avatarUrl?.trim() || "",
        order: typeof testimonial.order === "number" ? testimonial.order : count,
        isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
      });
      return NextResponse.json({ success: true, testimonial: created });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload or missing testimonial data" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving testimonial:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save testimonial";
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
        { success: false, error: "Missing testimonial ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await TestimonialModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
