/** Internal linking map for SEO — related pages per route */
export const internalLinks: Record<
  string,
  { label: string; href: string; description?: string }[]
> = {
  "/": [
    { label: "Printing CRM", href: "/printing-crm", description: "Manage clients & quotes" },
    { label: "Printing ERP", href: "/printing-erp", description: "Production & operations" },
    { label: "Pricing", href: "/pricing", description: "Compare flexible plans" },
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
  if (internalLinks[path]) return internalLinks[path];

  if (path.startsWith("/modules/")) {
    return [
      { label: "All Modules", href: "/services", description: "Explore the full ERP" },
      { label: "Pricing", href: "/pricing", description: "Compare plans" },
      { label: "Book Demo", href: "/book-demo", description: "See the module live" },
      { label: "Case Studies", href: "/case-studies", description: "Customer results" },
    ];
  }

  if (path.startsWith("/industries/")) {
    return [
      { label: "All Modules", href: "/services" },
      { label: "Printing ERP", href: "/printing-erp" },
      { label: "Book Demo", href: "/book-demo" },
      { label: "Contact Sales", href: "/sales-enquiry" },
    ];
  }

  if (path.startsWith("/resources/")) {
    return [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/resources/help-center" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Support", href: "/support" },
    ];
  }

  return internalLinks["/"];
}
