import { siteConfig } from "@/shared/config/site";
import { blogPosts } from "./blog-posts";

export interface SeoRoute {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastModified?: string;
}

/** All indexable marketing routes — SEO-friendly URLs */
export const seoRoutes: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/services", changefreq: "monthly", priority: 0.9 },
  { path: "/printing-crm", changefreq: "monthly", priority: 0.9 },
  { path: "/printing-erp", changefreq: "monthly", priority: 0.9 },
  { path: "/pricing", changefreq: "weekly", priority: 0.9 },
  { path: "/blog", changefreq: "daily", priority: 0.8 },
  { path: "/case-studies", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.7 },
  { path: "/book-demo", changefreq: "monthly", priority: 0.85 },
];

export const blogPostRoutes = blogPosts.map((post) => ({
  slug: post.slug,
  path: post.path,
}));

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(path: string): string {
  return absoluteUrl(path);
}
