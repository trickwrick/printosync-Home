import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading, Text } from "@/shared/ui/typography";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center py-24">
      <Container className="text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-brand-muted text-brand">
          <FileQuestion className="size-8" aria-hidden="true" />
        </div>
        <Heading level="h1" className="text-3xl">
          Page not found
        </Heading>
        <Text variant="lead" className="mt-4 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <nav aria-label="404 navigation" className="mt-8">
          <Button variant="brand" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </nav>
      </Container>
    </main>
  );
}
