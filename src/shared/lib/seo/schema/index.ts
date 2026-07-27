import { siteConfig } from "@/shared/config/site";
import { absoluteUrl } from "../routes";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      "@type": "Offer",
      price: "299",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "500",
      bestRating: "5",
    },
    featureList: [
      "Printing CRM",
      "Printing ERP",
      "MIS",
      "Inventory Management",
      "Production Scheduling",
      "GST Billing",
      "Client Portal",
    ],
  };
}

export function productSchema(options: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path),
    brand: { "@type": "Brand", name: siteConfig.name },
    category: options.category ?? "Printing Press Management Software",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "299",
      highPrice: "699",
      priceCurrency: "INR",
      offerCount: "3",
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(options: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: absoluteUrl(options.path),
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Person",
      name: options.author ?? siteConfig.name,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    image: options.image ? absoluteUrl(options.image) : absoluteUrl(siteConfig.ogImage),
    mainEntityOfPage: absoluteUrl(options.path),
  };
}

export function blogSchema(options: {
  name?: string;
  description?: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: options.name ?? `${siteConfig.name} Blog`,
    description:
      options.description ??
      "Insights, guides, and industry news for printing press owners and operators.",
    url: absoluteUrl(options.path ?? "/blog"),
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function webPageSchema(options: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.title,
    description: options.description,
    url: absoluteUrl(options.path),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}
