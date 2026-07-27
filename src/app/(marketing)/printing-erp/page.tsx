import type { Metadata } from "next";
import type { MarketingEntry } from "@/entities/marketing";
import { generatePageMetadata } from "@/widgets/page-shell";
import { DetailLanding } from "@/widgets/marketing";

export const metadata: Metadata = generatePageMetadata("printingErp");

const erpEntry: MarketingEntry = {
  slug: "printing-erp",
  title: "Printing ERP Software",
  shortTitle: "Printing ERP",
  eyebrow: "One connected platform",
  description:
    "Unify CRM, quotations, orders, job cards, production, machines, inventory, purchases, vendors, dispatch, GST billing, payments, and reports.",
  features: [
    "End-to-end workflow",
    "Real-time production",
    "Connected stock and accounts",
    "Multi-user access",
  ],
  benefits: ["Complete visibility", "Less manual work", "Scalable operations"],
  keywords: ["printing ERP software", "printing business ERP"],
};

export default function PrintingErpPage() {
  return (
    <DetailLanding
      entry={erpEntry}
      path="/printing-erp"
      categoryLabel="Printing ERP"
    />
  );
}
