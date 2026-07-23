import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const bookDemoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Print shop / company name is required"),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, "").length >= 10, {
      message: "Please enter a valid phone number",
    }),
  companySize: z.enum(["1-10", "11-50", "51-200", "200+"], {
    message: "Please select company size",
  }),
  preferredDate: z.string().optional(),
  message: z
    .string()
    .min(10, "Please share a few details about your requirements"),
});

export type BookDemoFormValues = z.infer<typeof bookDemoFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
