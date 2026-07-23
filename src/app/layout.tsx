import type { Metadata } from "next";
import { Providers } from "@/shared/providers";
import { fontVariables } from "@/shared/config/fonts";
import {
  rootMetadata,
  organizationSchema,
  websiteSchema,
} from "@/shared/lib/seo";
import { JsonLd } from "@/shared/ui/seo";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
