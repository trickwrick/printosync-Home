import type { Metadata } from "next";
import { modules } from "@/entities/marketing";
import { generatePageMetadata } from "@/widgets/page-shell";
import { DetailLanding } from "@/widgets/marketing";

export const metadata: Metadata = generatePageMetadata("printingCrm");

export default function PrintingCrmPage() {
  const crm = modules.find((module) => module.slug === "crm")!;
  return (
    <DetailLanding
      entry={crm}
      path="/printing-crm"
      categoryLabel="Printing CRM"
      related={modules.filter((module) => module.slug !== "crm")}
      relatedBasePath="/modules"
    />
  );
}
