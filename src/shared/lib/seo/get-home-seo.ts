import { connectToDatabase } from "@/shared/lib/db";
import { HomePageSeoModel } from "@/shared/lib/models/home-seo";
import { pageSeo } from "@/shared/lib/seo/pages";

export async function getLiveHomeSeo() {
  try {
    await connectToDatabase();
    const doc = await HomePageSeoModel.findOne({ key: "home" }).lean();
    if (doc) {
      return {
        title: doc.metaTitle || pageSeo.home.title,
        h1: doc.h1Title || pageSeo.home.h1,
        description: doc.metaDescription || pageSeo.home.description,
        keywords: doc.keywords && doc.keywords.length > 0 ? doc.keywords : pageSeo.home.keywords,
        imageAlt: doc.ogImageAlt || pageSeo.home.imageAlt,
        path: "/",
        breadcrumb: "Home",
      };
    }
  } catch (err) {
    console.error("Error reading home SEO from DB:", err);
  }

  return pageSeo.home;
}
