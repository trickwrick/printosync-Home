import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique name
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const fileName = `${timestamp}-${cleanName}`;

    const folder = (formData.get("folder") as string) || "blogs";
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${fileName}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
