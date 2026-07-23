import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
}
