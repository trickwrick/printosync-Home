import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { HomePageSeoModel } from "@/shared/lib/models/home-seo";
import { pageSeo } from "@/shared/lib/seo/pages";

const DEFAULT_HOME_SEO = {
  key: "home",
  metaTitle: "PrintoSync – Smart Printing Press Management Software",
  metaDescription: pageSeo.home.description || "Simplify job cards, production, inventory, challans, invoicing, paper stock, statements, and reports with PrintoSync printing press management software.",
  h1Title: pageSeo.home.h1 || "PrintoSync – Smart Printing Press Management Software",
  keywords: pageSeo.home.keywords || [
    "printosync",
    "printing press management software",
    "printing ERP software",
    "print shop management software",
    "printing business ERP",
    "print production management software",
  ],
  ogImageAlt: pageSeo.home.imageAlt || "PrintoSync printing press management dashboard preview",
};

export async function GET() {
  try {
    await connectToDatabase();
    let seo = await HomePageSeoModel.findOne({ key: "home" }).lean();
    if (!seo) {
      seo = {
        _id: "default",
        ...DEFAULT_HOME_SEO,
      } as unknown as typeof seo;
    }
    return NextResponse.json({ success: true, seo });
  } catch (err) {
    console.error("Failed to fetch home SEO from MongoDB:", err);
    return NextResponse.json({ success: true, seo: DEFAULT_HOME_SEO });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { seo } = body;

    if (!seo) {
      return NextResponse.json(
        { success: false, error: "Invalid SEO payload" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updated = await HomePageSeoModel.findOneAndUpdate(
      { key: "home" },
      {
        key: "home",
        metaTitle: seo.metaTitle || "",
        metaDescription: seo.metaDescription || "",
        h1Title: seo.h1Title || "",
        keywords: Array.isArray(seo.keywords) ? seo.keywords : [],
        ogImageAlt: seo.ogImageAlt || "",
      },
      { upsert: true, returnDocument: "after" }
    ).lean();

    return NextResponse.json({ success: true, seo: updated });
  } catch (err) {
    console.error("Failed to update home SEO in MongoDB:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to save SEO settings";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
