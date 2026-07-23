import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";
import { blogPostRoutes, seoRoutes } from "@/shared/lib/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = seoRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: route.lastModified ? new Date(route.lastModified) : lastModified,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  const blogPosts: MetadataRoute.Sitemap = blogPostRoutes.map((post) => ({
    url: `${siteConfig.url}${post.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...blogPosts];
}
