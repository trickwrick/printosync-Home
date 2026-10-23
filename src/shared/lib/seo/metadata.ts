import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { absoluteUrl, canonicalUrl } from "./routes";

export interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

const defaultKeywords = [
  "printing press software",
  "print shop CRM",
  "print ERP",
  "printing MIS",
  "print management system",
  "print shop inventory",
  "printing production software",
  "GST billing for print shops",
];

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = siteConfig.ogImage,
  imageAlt,
  noIndex = false,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataOptions = {}): Metadata {
  const defaultFullTitle = `${siteConfig.name} – ${siteConfig.tagline}`;
  const fullTitle = title
    ? (title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`)
    : defaultFullTitle;
  const url = canonicalUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);
  const alt = imageAlt ?? fullTitle;
  const pageTitle =
    path === "/" || path === ""
      ? { absolute: title ?? defaultFullTitle }
      : title ?? siteConfig.name;

  return {
    title: pageTitle,
    description,
    keywords: [...new Set([...defaultKeywords, ...keywords])],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt,
          type: "image/png",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@printosync",
      creator: "@printosync",
      title: fullTitle,
      description,
      images: [{ url: ogImage, alt }],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    category: "technology",
  };
}

/** @deprecated Use schema functions from ./schema */
export function createJsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}

/** @deprecated Use organizationSchema from ./schema */
export function organizationJsonLd() {
  return createJsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  });
}

/** @deprecated Use websiteSchema from ./schema */
export function websiteJsonLd() {
  return createJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  });
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
  },
  verification: {
    google: "3tElN3kZuFlpYXysH2YrMNm1cIsFhwe1WDCXUW87fhM",
  },
  manifest: "/manifest.webmanifest",
};
