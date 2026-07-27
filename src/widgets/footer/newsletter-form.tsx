"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  newsletterFormSchema,
  type NewsletterFormValues,
} from "@/shared/lib/validation";
import { cn } from "@/shared/lib/cn";
import { siteConfig } from "@/shared/config/site";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    const subject = encodeURIComponent("PrintoSync newsletter signup");
    const body = encodeURIComponent(
      `Please add ${data.email} to the PrintoSync product updates list.`,
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    await Promise.resolve();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-3", className)}
    >
      <p className="text-sm font-medium text-foreground">Stay in the loop</p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Product updates, print industry insights, and exclusive resources.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          aria-label="Email address"
          placeholder="you@company.com"
          {...register("email")}
          className="h-10 flex-1 rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground transition-colors hover:opacity-90 disabled:opacity-50"
          aria-label="Subscribe"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      {errors.email && (
        <p className="text-xs text-destructive">{errors.email.message}</p>
      )}
      {isSubmitSuccessful && (
        <p className="text-xs text-brand">
          Email draft opened—send it to complete your signup.
        </p>
      )}
    </form>
  );
}
