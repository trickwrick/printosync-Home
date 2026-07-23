"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-neutral-950 p-6 font-sans text-neutral-50">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold">Application Error</h1>
          <p className="mt-3 text-neutral-400">
            A critical error occurred. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
