import type { Metadata } from "next";
import { modules } from "@/entities/marketing";
import { generatePageMetadata } from "@/widgets/page-shell";
import { DetailLanding } from "@/widgets/marketing";

export const metadata: Metadata = generatePageMetadata("printingCrm");

const crmEntry = {
  slug: "printing-crm",
  title: "Printing CRM Software",
  shortTitle: "CRM",
  eyebrow: "Customer relationships & orders",
  description:
    "Organize print inquiries, customer records, quotation follow-ups, repeat print jobs, and order history built specifically for printing presses.",
  features: [
    "Lead & enquiry pipeline",
    "Quotation follow-up reminders",
    "Print customer order history",
    "Repeat order management",
  ],
  benefits: [
    "Convert more print inquiries",
    "Faster quotation follow-ups",
    "Stronger customer retention",
  ],
  keywords: [
    "printing CRM",
    "print shop CRM software",
    "customer management printing",
  ],
};

export default function PrintingCrmPage() {
  return (
    <DetailLanding
      entry={crmEntry}
      path="/printing-crm"
      categoryLabel="Printing CRM"
      related={modules}
      relatedBasePath="/modules"
    />
  );
}
