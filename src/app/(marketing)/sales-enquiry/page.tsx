import type { Metadata } from "next";
import { ContactForm } from "@/features/contact";
import { createMetadata } from "@/shared/lib/seo";
import { PageHeroBanner } from "@/widgets/page-shell/page-hero-banner";

export const metadata: Metadata = createMetadata({
  title: "Printing ERP Sales Enquiry",
  description:
    "Talk to PrintoSync sales about printing press ERP modules, implementation, migration, users, and pricing.",
  path: "/sales-enquiry",
  keywords: ["printing ERP sales", "PrintoSync quote", "printing software enquiry"],
});

export default function SalesEnquiryPage() {
  return (
    <>
      <PageHeroBanner title="Talk to PrintoSync Sales" breadcrumbLabel="Sales Enquiry" />
      <div className="pt-16">
        <ContactForm intent="sales" />
      </div>
    </>
  );
}
