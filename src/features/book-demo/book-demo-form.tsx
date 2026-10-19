"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Star, Shield, Award, Users } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  quote: string;
  author: string;
  authorInitial: string;
  designation: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The demo helped me understand how PrintoSync simplifies offset job cards, GST invoicing, and manages paper inventory effortlessly.",
    author: "Rajesh Sharma",
    authorInitial: "RS",
    designation: "Sharma Offset & Packaging, Jaipur",
  },
  {
    quote:
      "We cut down our quotation and estimation time from 2 hours to 2 minutes. The live demonstration showed exactly what our operators needed.",
    author: "Amit Patel",
    authorInitial: "AP",
    designation: "Patel Color Graphics, Ahmedabad",
  },
  {
    quote:
      "Delivery challans, WhatsApp invoice links, and plate consumption tracking are unmatched. Highly recommended for commercial presses.",
    author: "Vikas Malhotra",
    authorInitial: "VM",
    designation: "Delhi Print Pack Solutions, New Delhi",
  },
];

export function BookDemoForm() {
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [natureOfEnquiry, setNatureOfEnquiry] = useState("Commercial Printing Press ERP");
  const [currentSoftware, setCurrentSoftware] = useState<"Yes" | "No">("No");
  const [requirement, setRequirement] = useState<string>("Complete Print ERP (Job Card + Billing + Stock)");
  const [businessSize, setBusinessSize] = useState<string>("40 lakhs to 1 crore");
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi / English");

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and mobile number.");
      return;
    }

    setIsSubmitting(true);

    const messageDetails = `Nature: ${natureOfEnquiry} | Currently using billing software: ${currentSoftware} | Requirement: ${requirement} | Business Size: ${businessSize} | Language: ${preferredLanguage} | City: ${city || "Not provided"}`;

    try {
      await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry: {
            type: "Demo Request",
            name,
            email: `${phone.replace(/\D/g, "")}@demo-lead.com`,
            phone,
            company: company || "Printing Press",
            city: city || "",
            pressType: `Size: ${businessSize} (${natureOfEnquiry})`,
            message: messageDetails,
            status: "new",
          },
        }),
      });
    } catch (err) {
      console.error("Failed to save demo inquiry to database:", err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full bg-[#5235d9] text-white">
      {/* Top Banner Navigation / Header Title */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
            Printo<span className="text-[#29b8ba]">Sync</span>
          </span>
        </Link>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
          Book Free Live Product Demo
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Left Column: Heading, Value Bullets, Testimonial & Badges */}
          <div className="space-y-8 lg:col-span-6 lg:pt-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Book your free demo
              </h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-white/90 sm:text-lg">
                Get a personalized one-on-one product walkthrough in just 15 mins and learn:
              </p>
            </div>

            {/* Value Bullet Points */}
            <div className="space-y-3.5 text-sm sm:text-base font-semibold">
              <div className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#20c997] text-white mt-0.5">
                  ✓
                </span>
                <span>How to check your daily printing hisab-kitab in 15 minutes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#20c997] text-white mt-0.5">
                  ✓
                </span>
                <span>How to eliminate shop-floor paper wastage & rotate stock up to 3x faster</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#20c997] text-white mt-0.5">
                  ✓
                </span>
                <span>How to collect 97% client payments faster with WhatsApp QR invoices</span>
              </div>
            </div>

            {/* Quote / Testimonial Box */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/15">
              <span className="font-serif text-4xl leading-none text-white/50">“</span>
              <p className="mt-1 text-sm font-medium italic leading-relaxed text-white/95 sm:text-base">
                {testimonials[activeTestimonial].quote}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20 font-bold text-white text-sm border border-white/30">
                    {testimonials[activeTestimonial].authorInitial || "PS"}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-white/80">
                      {testimonials[activeTestimonial].designation}
                    </p>
                  </div>
                </div>

                {/* Dots carousel */}
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeTestimonial === i ? "w-6 bg-white" : "w-2 bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Social Proof Trust Badges */}
            <div className="pt-2 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                Trusted by more than 500+ printing presses across India
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                  <Award className="mx-auto size-5 text-[#29b8ba]" />
                  <div className="mt-1 text-[11px] font-bold">BEST PRINT ERP</div>
                  <div className="text-[9px] text-white/70">INDIA 2026</div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                  <Shield className="mx-auto size-5 text-[#29b8ba]" />
                  <div className="mt-1 text-[11px] font-bold">GST READY</div>
                  <div className="text-[9px] text-white/70">100% COMPLIANT</div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                  <Star className="mx-auto size-5 text-amber-300" />
                  <div className="mt-1 text-[11px] font-bold">4.9 ★ RATING</div>
                  <div className="text-[9px] text-white/70">CLIENT VERIFIED</div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                  <Users className="mx-auto size-5 text-[#29b8ba]" />
                  <div className="mt-1 text-[11px] font-bold">100% PRIVACY</div>
                  <div className="text-[9px] text-white/70">SECURE CLOUD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Demo Form Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 shadow-2xl text-slate-800 sm:p-9 border border-slate-100">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="mx-auto size-16 text-[#20c997]" />
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Demo Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you <strong>{name}</strong>! Our product specialist will call you at{" "}
                    <strong>{phone}</strong> to confirm your personalized walkthrough.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 rounded-full bg-[#5235d9] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#4327ca] transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#5235d9] focus:bg-white focus:ring-2 focus:ring-[#5235d9]/10"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your 10-digit mobile number"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#5235d9] focus:bg-white focus:ring-2 focus:ring-[#5235d9]/10"
                    />
                  </div>

                  {/* Company Name & City */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        Printing Press / Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Royal Offset Printers"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#5235d9] focus:bg-white focus:ring-2 focus:ring-[#5235d9]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Jaipur, Delhi, Mumbai"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#5235d9] focus:bg-white focus:ring-2 focus:ring-[#5235d9]/10"
                      />
                    </div>
                  </div>

                  {/* Nature of Enquiry */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Nature of your Enquiry <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        value={natureOfEnquiry}
                        onChange={(e) => setNatureOfEnquiry(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-[#5235d9] focus:bg-white focus:ring-2 focus:ring-[#5235d9]/10"
                      >
                        <option value="Commercial Printing Press ERP">Commercial Printing Press ERP</option>
                        <option value="Packaging & Corrugation Management">Packaging & Corrugation Management</option>
                        <option value="Digital Print & Signage Billing">Digital Print & Signage Billing</option>
                        <option value="Job Card & Inventory Tracking">Job Card & Inventory Tracking</option>
                        <option value="General Sales / Pricing Inquiry">General Sales / Pricing Inquiry</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Are you currently using any billing software? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Are you currently using any billing software? <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="currentSoftware"
                          checked={currentSoftware === "Yes"}
                          onChange={() => setCurrentSoftware("Yes")}
                          className="size-4 accent-[#5235d9]"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="currentSoftware"
                          checked={currentSoftware === "No"}
                          onChange={() => setCurrentSoftware("No")}
                          className="size-4 accent-[#5235d9]"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {/* Select your printing / billing requirement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Select your primary requirement <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
                        <input
                          type="radio"
                          name="requirement"
                          checked={requirement === "Basic billing & GST invoices on mobile/laptop"}
                          onChange={() => setRequirement("Basic billing & GST invoices on mobile/laptop")}
                          className="mt-0.5 size-4 accent-[#5235d9]"
                        />
                        <span>Basic GST billing & WhatsApp invoices</span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
                        <input
                          type="radio"
                          name="requirement"
                          checked={requirement === "Complete Print ERP (Job Card + Billing + Stock)"}
                          onChange={() => setRequirement("Complete Print ERP (Job Card + Billing + Stock)")}
                          className="mt-0.5 size-4 accent-[#5235d9]"
                        />
                        <span>Complete Press ERP: Job Card, Paper Stock, Challans & Billing</span>
                      </label>
                    </div>
                  </div>

                  {/* Size of your business? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      Annual Press Turnover / Business Size <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs font-medium text-slate-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="businessSize"
                          checked={businessSize === "More Than 5 crore"}
                          onChange={() => setBusinessSize("More Than 5 crore")}
                          className="size-4 accent-[#5235d9]"
                        />
                        <span>More Than 5 crore</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="businessSize"
                          checked={businessSize === "1 crore to 5 crore"}
                          onChange={() => setBusinessSize("1 crore to 5 crore")}
                          className="size-4 accent-[#5235d9]"
                        />
                        <span>1 crore to 5 crore</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="businessSize"
                          checked={businessSize === "40 lakhs to 1 crore"}
                          onChange={() => setBusinessSize("40 lakhs to 1 crore")}
                          className="size-4 accent-[#5235d9]"
                        />
                        <span>40 lakhs to 1 crore</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="businessSize"
                          checked={businessSize === "Less than 40 lakhs"}
                          onChange={() => setBusinessSize("Less than 40 lakhs")}
                          className="size-4 accent-[#5235d9]"
                        />
                        <span>Less than 40 lakhs</span>
                      </label>
                    </div>
                  </div>

                  {/* What language do you like to talk in? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      What language do you like to talk in? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        value={preferredLanguage}
                        onChange={(e) => setPreferredLanguage(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-[#5235d9] focus:bg-white focus:ring-2 focus:ring-[#5235d9]/10"
                      >
                        <option value="Hindi / English">Hindi / English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Tamil / Telugu">Tamil / Telugu</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl bg-[#5235d9] py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-[#5235d9]/30 transition hover:bg-[#4327ca] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting ? "Booking your demo..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
