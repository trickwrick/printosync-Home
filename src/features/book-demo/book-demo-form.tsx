"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, CheckCircle2, Loader2, Mail } from "lucide-react";
import {
  bookDemoFormSchema,
  type BookDemoFormValues,
} from "@/shared/lib/validation";
import { siteConfig } from "@/shared/config/site";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import {
  FormField,
  formInputClassName,
  formSelectClassName,
  formTextareaClassName,
} from "@/features/forms/form-field";

const companySizeOptions = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "200+", label: "200+ employees" },
] as const;

const demoBenefits = [
  "30-minute personalized walkthrough",
  "See CRM, ERP & production modules live",
  "Get answers for your print shop workflow",
  "No obligation — free consultation",
];

export function BookDemoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<BookDemoFormValues>({
    resolver: zodResolver(bookDemoFormSchema),
  });

  const onSubmit = async (data: BookDemoFormValues) => {
    const subject = encodeURIComponent(`Free demo request — ${data.company}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nWork email: ${data.email}\nPhone: ${data.phone || "Not provided"}\nCompany: ${data.company}\nCity: ${data.city}\nCompany size: ${data.companySize}\nPreferred date: ${data.preferredDate || "Flexible"}\n\nRequirements:\n${data.message}`,
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
            Demo email prepared
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your email app should open with your demo details. Send the prepared
            draft to complete your request.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pb-16">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        {/* Form */}
        <section
          aria-label="Book demo form"
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="name"
                label="Full name"
                required
                error={errors.name?.message}
                className="sm:col-span-2"
              >
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Smith"
                  className={formInputClassName()}
                  {...register("name")}
                />
              </FormField>

              <FormField
                id="email"
                label="Work email"
                required
                error={errors.email?.message}
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@printshop.com"
                  className={formInputClassName()}
                  {...register("email")}
                />
              </FormField>

              <FormField
                id="phone"
                label="Phone number"
                error={errors.phone?.message}
              >
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  className={formInputClassName()}
                  {...register("phone")}
                />
              </FormField>

              <FormField
                id="company"
                label="Company Name"
                required
                error={errors.company?.message}
                className="sm:col-span-2"
              >
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Apex Print Co."
                  className={formInputClassName()}
                  {...register("company")}
                />
              </FormField>

              <FormField
                id="city"
                label="City"
                required
                error={errors.city?.message}
              >
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Mumbai"
                  className={formInputClassName()}
                  {...register("city")}
                />
              </FormField>

              <FormField
                id="companySize"
                label="Company size"
                required
                error={errors.companySize?.message}
              >
                <select
                  id="companySize"
                  defaultValue=""
                  className={formSelectClassName}
                  {...register("companySize")}
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {companySizeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="preferredDate"
                label="Preferred demo date"
                error={errors.preferredDate?.message}
              >
                <input
                  id="preferredDate"
                  type="date"
                  className={formInputClassName()}
                  {...register("preferredDate")}
                />
              </FormField>

              <FormField
                id="message"
                label="What would you like to see?"
                required
                error={errors.message?.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your print shop, current tools, and what you'd like to improve..."
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
              className="mt-6 w-full rounded-full sm:w-auto sm:min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request demo"
              )}
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              By submitting, you agree to be contacted about PrintoSync. We
              respect your privacy and never share your details.
            </p>
          </form>
        </section>

        {/* Sidebar info */}
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="font-display text-lg font-semibold text-foreground">
              What to expect
            </h2>
            <ul className="mt-4 space-y-3">
              {demoBenefits.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Prefer to talk now?
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-brand"
              >
                <Mail className="size-4 text-brand" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
