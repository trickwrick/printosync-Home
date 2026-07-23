import type { LucideIcon } from "lucide-react";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageProps<T extends Record<string, string> = Record<string, string>> {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  highlighted?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
}

export type Theme = "light" | "dark" | "system";
