import type { Metadata } from "next";
import { ContactForm } from "@/features/contact";
import { createMetadata } from "@/shared/lib/seo";
import { PageHeroBanner } from "@/widgets/page-shell/page-hero-banner";

export const metadata: Metadata = createMetadata({
  title: "PrintoSync Support",
  description:
    "Get help with PrintoSync setup, workflows, modules, accounts, and daily printing press operations.",
  path: "/support",
  keywords: ["PrintoSync support", "printing ERP support"],
});

export default function SupportPage() {
  return (
    <>
      <PageHeroBanner title="PrintoSync Support" breadcrumbLabel="Support" />
      <div className="pt-16">
        <ContactForm intent="support" />
      </div>
    </>
  );
}
