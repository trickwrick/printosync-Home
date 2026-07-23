"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading, Text } from "@/shared/ui/typography";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-8" aria-hidden="true" />
      </div>
      <Heading level="h1" className="text-3xl">
        Something went wrong
      </Heading>
      <Text variant="lead" className="mt-4 max-w-md">
        An unexpected error occurred. Please try again or return to the homepage.
      </Text>
      <div className="mt-8 flex gap-3">
        <Button variant="brand" onClick={reset}>
          Try again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </Container>
  );
}
