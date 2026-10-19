"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Search,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface HomeSeoData {
  key: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  keywords: string[];
  ogImageAlt: string;
}

export function HomeSeoManager() {
  const [seo, setSeo] = useState<HomeSeoData>({
    key: "home",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
    keywords: [],
    ogImageAlt: "",
  });
  const [loading, setLoading] = useState(true);
  const [keywordsInput, setKeywordsInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/home-seo");
      const data = await res.json();
      if (data.success && data.seo) {
        setSeo(data.seo);
        setKeywordsInput((data.seo.keywords || []).join(", "));
      }
    } catch (err) {
      console.error("Failed to fetch home SEO:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const parsedKeywords = keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const payload = {
        ...seo,
        keywords: parsedKeywords,
      };

      const res = await fetch("/api/admin/home-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seo: payload }),
      });

      const data = await res.json();
      if (data.success) {
        setSeo(data.seo);
        setKeywordsInput((data.seo.keywords || []).join(", "));
        setStatus("saved");
        setMessage("Home page SEO updated successfully in MongoDB!");
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to update SEO");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to connect to server");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold text-brand">
            <Globe className="size-3.5" />
            Special Home SEO Manager
          </div>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Home Page SEO & Meta Tags
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage Title Tag, Meta Description, H1 Heading, and Ranking Keywords for the main website home page.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition hover:border-brand/40 hover:bg-brand-muted hover:text-brand"
        >
          View Live Home Page <ExternalLink className="size-3.5" />
        </Link>
      </div>

      {/* Notification banner */}
      {status !== "idle" && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 text-sm font-medium transition-all ${
            status === "saving"
              ? "bg-muted text-muted-foreground"
              : status === "saved"
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {status === "saving" && (
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {status === "saved" && <CheckCircle2 className="size-5 text-emerald-400" />}
            {status === "error" && <AlertCircle className="size-5 text-red-400" />}
            <span>{status === "saving" ? "Saving to database..." : message}</span>
          </div>
        </div>
      )}

      {/* Google Search Live Preview Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Search className="size-3.5 text-brand" />
          Google Search Live Snippet Preview
        </span>
        <div className="mt-4 rounded-2xl border border-border/80 bg-background p-5 space-y-1.5 max-w-2xl">
          <div className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
            <span className="font-medium text-foreground">https://printosync.com</span>
            <span>›</span>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-brand hover:underline cursor-pointer line-clamp-1">
            {seo.metaTitle || "PrintoSync – Smart Printing Press Management Software"}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {seo.metaDescription ||
              "Simplify job cards, production, inventory, challans, invoicing, paper stock, statements, and reports with PrintoSync printing press management software."}
          </p>
        </div>
      </div>

      {/* SEO Edit Form */}
      <form onSubmit={handleSave} className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Home Page Meta Title (&lt;title&gt;)
              </label>
              <span
                className={`text-[11px] font-mono ${
                  seo.metaTitle.length > 60 ? "text-amber-400" : "text-muted-foreground"
                }`}
              >
                {seo.metaTitle.length} / 60 recommended
              </span>
            </div>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
              placeholder="e.g. PrintoSync – Smart Printing Press Management Software"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Displayed as the main clickable headline in search engine results and browser tabs.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Meta Description Tag
              </label>
              <span
                className={`text-[11px] font-mono ${
                  seo.metaDescription.length > 160 ? "text-amber-400" : "text-muted-foreground"
                }`}
              >
                {seo.metaDescription.length} / 160 recommended
              </span>
            </div>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-brand"
              placeholder="Concise, compelling summary of PrintoSync features and value for Google snippet..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Main H1 Headline Text
            </label>
            <input
              type="text"
              value={seo.h1Title || ""}
              onChange={(e) => setSeo({ ...seo, h1Title: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
              placeholder="e.g. PrintoSync – Smart Printing Press Management Software"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Primary heading identifier utilized for screen readers and SEO indexing.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Target SEO Keywords (Comma separated)
            </label>
            <textarea
              rows={3}
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              className="mt-2 w-full font-mono text-xs rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:ring-1 focus:ring-brand"
              placeholder="printing press management software, print shop erp, gst billing for printing press"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Target search queries for indexing and schema tags.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              OG / Social Share Image Alt Text
            </label>
            <input
              type="text"
              value={seo.ogImageAlt || ""}
              onChange={(e) => setSeo({ ...seo, ogImageAlt: e.target.value })}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-brand"
              placeholder="PrintoSync printing press management dashboard preview"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <button
            type="submit"
            disabled={status === "saving"}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90 disabled:opacity-50"
          >
            <Save className="size-4" />
            {status === "saving" ? "Saving..." : "Save Home SEO Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
