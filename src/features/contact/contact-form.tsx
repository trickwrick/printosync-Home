"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/shared/lib/validation";
import { siteConfig } from "@/shared/config/site";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import {
  FormField,
  formInputClassName,
  formTextareaClassName,
} from "@/features/forms/form-field";

type ContactIntent = "contact" | "quote" | "sales" | "support";

const intentCopy: Record<
  ContactIntent,
  { title: string; description: string; submit: string }
> = {
  contact: {
    title: "Send us a message",
    description: "Tell us how we can help your printing business.",
    submit: "Send message",
  },
  quote: {
    title: "Request a quote",
    description: "Share your requirements and our team will prepare the right solution.",
    submit: "Request quote",
  },
  sales: {
    title: "Talk to sales",
    description: "Tell us about your team, locations, and operational goals.",
    submit: "Contact sales",
  },
  support: {
    title: "Contact support",
    description: "Describe the issue and include the workflow or module involved.",
    submit: "Request support",
  },
};

export function ContactForm({ intent = "contact" }: { intent?: ContactIntent }) {
  const copy = intentCopy[intent];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    const subject = encodeURIComponent(`${copy.title} — ${data.company}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nRequest type: ${intent}\n\n${data.message}`,
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    await Promise.resolve();
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <Container className="pb-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <CheckCircle2 className="mx-auto size-12 text-brand" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
            Email draft prepared
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your email app should open with the request details. Send the draft
            to complete your enquiry.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pb-16">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <section aria-label="Contact form" className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{copy.description}</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="contact-name"
                label="Full name"
                required
                error={errors.name?.message}
                className="sm:col-span-2"
              >
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Smith"
                  className={formInputClassName()}
                  {...register("name")}
                />
              </FormField>

              <FormField
                id="contact-email"
                label="Email"
                required
                error={errors.email?.message}
              >
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={formInputClassName()}
                  {...register("email")}
                />
              </FormField>

              <FormField
                id="contact-company"
                label="Company"
                required
                error={errors.company?.message}
              >
                <input
                  id="contact-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Your print shop"
                  className={formInputClassName()}
                  {...register("company")}
                />
              </FormField>

              <FormField
                id="contact-message"
                label="Message"
                required
                error={errors.message?.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="How can we help you?"
                  className={formTextareaClassName}
                  {...register("message")}
                />
              </FormField>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full sm:w-auto sm:min-w-[180px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                copy.submit
              )}
            </Button>
          </form>
        </section>

        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Get in touch
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sales, support, or partnerships — our print industry team is here
              to help.
            </p>
            <div className="mt-6 space-y-4">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-brand"
              >
                <Mail className="size-4 shrink-0 text-brand" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
