import type { Metadata } from "next";
import { modules } from "@/entities/marketing";
import { generatePageMetadata } from "@/widgets/page-shell";
import { CollectionIndex } from "@/widgets/marketing";

export const metadata: Metadata = generatePageMetadata("services");

export default function ServicesPage() {
  return (
    <CollectionIndex
      title="Printing Press ERP Modules"
      label="Modules"
      description="Everything your printing business needs—from customer enquiry and quotation through production, stock, billing, payments, and business analytics."
      entries={modules}
      basePath="/modules"
    />
  );
}
