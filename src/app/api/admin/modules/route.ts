import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { modules as defaultModules, MarketingEntry } from "@/entities/marketing/content";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "modules.json");

async function getStoredModules(): Promise<MarketingEntry[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [...defaultModules];
  }
}

export async function GET() {
  const modules = await getStoredModules();
  return NextResponse.json({ success: true, modules });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { modules } = body;

    if (!Array.isArray(modules)) {
      return NextResponse.json(
        { success: false, error: "Invalid modules payload" },
        { status: 400 }
      );
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(modules, null, 2), "utf-8");

    return NextResponse.json({ success: true, modules });
  } catch (error) {
    console.error("Error saving modules:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update modules" },
      { status: 500 }
    );
  }
}
