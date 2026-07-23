import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { BookDemoForm } from "@/features/book-demo";

export const metadata: Metadata = generatePageMetadata("bookDemo");

export default function BookDemoPage() {
  return (
    <MarketingPage pageKey="bookDemo" showPlaceholder={false}>
      <BookDemoForm />
    </MarketingPage>
  );
}
