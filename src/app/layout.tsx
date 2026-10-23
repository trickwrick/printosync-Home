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
        <meta name="google-site-verification" content="3tElN3kZuFlpYXysH2YrMNm1cIsFhwe1WDCXUW87fhM" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
