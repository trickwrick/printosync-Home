import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { Inquiry } from "@/shared/lib/models/inquiry";

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1, date: -1 }).lean();
    return NextResponse.json({ success: true, inquiries });
  } catch (err) {
    console.error("Failed to fetch inquiries from MongoDB:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inquiry } = body;

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: "Invalid inquiry data" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newInquiry = await Inquiry.create({
      id: inquiry.id || `inq-${Date.now()}`,
      type: inquiry.type || "General Inquiry",
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || "",
      company: inquiry.company || "",
      pressType: inquiry.pressType || "",
      city: inquiry.city || "",
      state: inquiry.state || "",
      message: inquiry.message || "",
      date: inquiry.date || new Date().toISOString(),
      status: inquiry.status || "new",
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (err) {
    console.error("Failed to save inquiry to MongoDB:", err);
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Inquiry.findOneAndUpdate({ id }, { status });

    const updated = await Inquiry.find({}).sort({ createdAt: -1, date: -1 }).lean();
    return NextResponse.json({ success: true, inquiries: updated });
  } catch (err) {
    console.error("Failed to update inquiry status in MongoDB:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry" },
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
        { success: false, error: "ID required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Inquiry.findOneAndDelete({ id });

    const updated = await Inquiry.find({}).sort({ createdAt: -1, date: -1 }).lean();
    return NextResponse.json({ success: true, inquiries: updated });
  } catch (err) {
    console.error("Failed to delete inquiry from MongoDB:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}
