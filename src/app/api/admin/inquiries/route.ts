import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

export interface InquiryItem {
  id: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  pressType?: string;
  city?: string;
  state?: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "completed" | "archived";
}

async function getInquiries(): Promise<InquiryItem[]> {
  try {
    const data = await fs.readFile(INQUIRIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveInquiries(items: InquiryItem[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  const inquiries = await getInquiries();
  return NextResponse.json({ success: true, inquiries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inquiry } = body;

    if (!inquiry) {
      return NextResponse.json({ success: false, error: "Invalid inquiry data" }, { status: 400 });
    }

    const current = await getInquiries();
    const newEntry: InquiryItem = {
      ...inquiry,
      id: inquiry.id || `inq-${Date.now()}`,
      date: inquiry.date || new Date().toISOString(),
      status: inquiry.status || "new",
    };

    const updated = [newEntry, ...current];
    await saveInquiries(updated);

    return NextResponse.json({ success: true, inquiry: newEntry });
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    return NextResponse.json({ success: false, error: "Failed to record inquiry" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    const current = await getInquiries();
    const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
    await saveInquiries(updated);

    return NextResponse.json({ success: true, inquiries: updated });
  } catch (err) {
    console.error("Failed to update inquiry status:", err);
    return NextResponse.json({ success: false, error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    const current = await getInquiries();
    const updated = current.filter((item) => item.id !== id);
    await saveInquiries(updated);

    return NextResponse.json({ success: true, inquiries: updated });
  } catch (err) {
    console.error("Failed to delete inquiry:", err);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
