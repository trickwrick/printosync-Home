/** Internal linking map for SEO — related pages per route */
export const internalLinks: Record<
  string,
  { label: string; href: string; description?: string }[]
> = {
  "/": [
    { label: "Printing CRM", href: "/printing-crm", description: "Manage clients & quotes" },
    { label: "Printing ERP", href: "/printing-erp", description: "Production & operations" },
    { label: "Pricing", href: "/pricing", description: "Plans from $299/mo" },
    { label: "Book Demo", href: "/book-demo", description: "Free 30-min walkthrough" },
  ],
  "/about": [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
    { label: "Book Demo", href: "/book-demo" },
  ],
  "/services": [
    { label: "Printing CRM", href: "/printing-crm" },
    { label: "Printing ERP", href: "/printing-erp" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  "/printing-crm": [
    { label: "Printing ERP", href: "/printing-erp" },
    { label: "Pricing", href: "/pricing" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Book Demo", href: "/book-demo" },
  ],
  "/printing-erp": [
    { label: "Printing CRM", href: "/printing-crm" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Book Demo", href: "/book-demo" },
  ],
  "/pricing": [
    { label: "Book Demo", href: "/book-demo" },
    { label: "Printing CRM", href: "/printing-crm" },
    { label: "Printing ERP", href: "/printing-erp" },
    { label: "Contact", href: "/contact" },
  ],
  "/blog": [
    { label: "CRM Guide", href: "/blog/print-shop-crm-guide" },
    { label: "ERP Guide", href: "/blog/erp-for-printing-presses" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Services", href: "/services" },
  ],
  "/case-studies": [
    { label: "Book Demo", href: "/book-demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "Printing CRM", href: "/printing-crm" },
  ],
  "/contact": [
    { label: "Book Demo", href: "/book-demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "Services", href: "/services" },
  ],
  "/book-demo": [
    { label: "Pricing", href: "/pricing" },
    { label: "Printing CRM", href: "/printing-crm" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  "/blog/print-shop-crm-guide": [
    { label: "Printing CRM", href: "/printing-crm" },
    { label: "Book Demo", href: "/book-demo" },
    { label: "ERP Guide", href: "/blog/erp-for-printing-presses" },
  ],
  "/blog/erp-for-printing-presses": [
    { label: "Printing ERP", href: "/printing-erp" },
    { label: "Pricing", href: "/pricing" },
    { label: "CRM Guide", href: "/blog/print-shop-crm-guide" },
  ],
  "/blog/reduce-print-shop-waste": [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Services", href: "/services" },
    { label: "Book Demo", href: "/book-demo" },
  ],
};

export function getRelatedLinks(path: string) {
  return internalLinks[path] ?? internalLinks["/"];
}
