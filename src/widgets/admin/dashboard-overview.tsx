"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Layers,
  BookOpen,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Building,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Globe,
} from "lucide-react";
import type { InquiryItem } from "./inquiries-manager";

interface DashboardOverviewProps {
  onNavigateTab: (tab: "inquiries" | "modules" | "industries" | "blogs" | "home-seo" | "clients" | "testimonials" | "faqs" | "settings") => void;
}

export function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogCount, setBlogCount] = useState<number>(0);

  const loadData = async () => {
    try {
      setLoading(true);
      const [inqRes, blogRes] = await Promise.all([
        fetch("/api/admin/inquiries"),
        fetch("/api/admin/blogs"),
      ]);

      const inqData = await inqRes.json();
      if (inqData.success && Array.isArray(inqData.inquiries)) {
        setInquiries(inqData.inquiries);
      }

      const blogData = await blogRes.json();
      if (blogData.success && Array.isArray(blogData.posts)) {
        setBlogCount(blogData.posts.length);
      }
    } catch (err) {
      console.error("Failed to load dashboard overview data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Inquiries Metrics
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;
  const inProgressInquiries = inquiries.filter((i) => i.status === "in-progress").length;
  const completedInquiries = inquiries.filter((i) => i.status === "completed").length;

  const demoRequests = inquiries.filter((i) => (i.type || "").toLowerCase().includes("demo")).length;
  const contactLeads = totalInquiries - demoRequests;

  const recentInquiries = inquiries.slice(0, 5);

  const getStatusBadge = (status: InquiryItem["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            New Lead
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            <Clock className="size-3" />
            Contacted
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3" />
            Closed / Done
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Top Welcome & Quick Actions Bar */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-card via-card to-brand/5 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles className="size-3.5" />
              <span>Admin Management Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-display">
              Welcome back, Admin
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time snapshot of customer inquiries, demo requests, and website content health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/50 transition shadow-xs"
            >
              <RefreshCw className={`size-3.5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Stats</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("inquiries")}
              className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold text-brand-foreground shadow-sm hover:opacity-95 transition"
            >
              <Mail className="size-4" />
              <span>Manage All Leads ({totalInquiries})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Leads */}
        <div
          onClick={() => onNavigateTab("inquiries")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-brand/40 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Inquiries
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:scale-110 transition-transform">
              <Mail className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground font-display">
              {totalInquiries}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="size-3 mr-0.5" />
              100% live
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {demoRequests} Demo requests · {contactLeads} Direct leads
          </p>
        </div>

        {/* Card 2: New / Action Required */}
        <div
          onClick={() => onNavigateTab("inquiries")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-amber-500/40 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              New / Pending Leads
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 group-hover:scale-110 transition-transform">
              <AlertCircle className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 font-display">
              {newInquiries}
            </span>
            {newInquiries > 0 ? (
              <span className="text-xs font-semibold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Action required
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">All caught up</span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Awaiting sales phone or demo call
          </p>
        </div>

        {/* Card 3: In Progress Leads */}
        <div
          onClick={() => onNavigateTab("inquiries")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-blue-500/40 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              In Progress / Contacted
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 font-display">
              {inProgressInquiries}
            </span>
            <span className="text-xs text-muted-foreground">
              {completedInquiries} completed
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Follow-up or quotation shared
          </p>
        </div>

        {/* Card 4: Published Articles */}
        <div
          onClick={() => onNavigateTab("blogs")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-brand/40 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Live Blog Posts
            </span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 group-hover:scale-110 transition-transform">
              <BookOpen className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground font-display">
              {blogCount}
            </span>
            <span className="text-xs font-semibold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded-full">
              CMS Active
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            In-page SEO &amp; article editor
          </p>
        </div>
      </div>

      {/* 3. Inquiries & Leads Real-Time Table Box */}
      <div className="rounded-3xl border border-border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border p-6 bg-surface/30">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Mail className="size-4" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Latest Customer Inquiries &amp; Demo Leads
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recent printing presses and clients who submitted demo or contact forms.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("inquiries")}
            className="flex items-center gap-1.5 text-xs font-bold text-brand hover:underline self-start sm:self-auto"
          >
            <span>Open Inquiries CRM</span>
            <ChevronRight className="size-4" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            <div className="mx-auto size-6 animate-spin rounded-full border-2 border-brand border-t-transparent mb-3" />
            Loading real-time inquiries...
          </div>
        ) : recentInquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            No inquiries received yet. New submissions will automatically appear here!
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {recentInquiries.map((inq) => {
              const formattedDate = inq.date
                ? (() => {
                    try {
                      const d = new Date(inq.date);
                      return d.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    } catch {
                      return inq.date;
                    }
                  })()
                : "Recent";

              return (
                <div
                  key={inq.id || inq._id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 hover:bg-muted/30 transition"
                >
                  {/* Lead Info */}
                  <div className="space-y-1.5 min-w-0 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-bold text-sm text-foreground">
                        {inq.name}
                      </span>
                      {getStatusBadge(inq.status)}
                      <span className="rounded-md bg-surface border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {inq.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {inq.company && (
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Building className="size-3 text-muted-foreground" />
                          {inq.company}
                        </span>
                      )}
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 text-brand font-medium hover:underline"
                        >
                          <Phone className="size-3" />
                          {inq.phone}
                        </a>
                      )}
                      {inq.city && (
                        <span>📍 {inq.city}</span>
                      )}
                      <span className="text-[11px] text-muted-foreground/80">
                        🕒 {formattedDate}
                      </span>
                    </div>

                    {inq.message && (
                      <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed bg-surface/50 p-2.5 rounded-xl border border-border/50 mt-2 font-mono">
                        {inq.message}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                    {inq.phone && (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${inq.name}, thank you for contacting PrintoSync regarding ${inq.company || "your print shop"}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-600 hover:text-white px-3 py-1.5 text-xs font-semibold transition border border-emerald-600/20"
                      >
                        WhatsApp
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => onNavigateTab("inquiries")}
                      className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Quick Navigation Hub to other Admin Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Nav 1: Modules */}
        <div
          onClick={() => onNavigateTab("modules")}
          className="group cursor-pointer rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:scale-105 transition-transform">
              <Layers className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">ERP Modules</h4>
              <p className="text-[11px] text-muted-foreground">Manage features &amp; slugs</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Nav 2: Home SEO */}
        <div
          onClick={() => onNavigateTab("home-seo")}
          className="group cursor-pointer rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:scale-105 transition-transform">
              <Globe className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Home SEO</h4>
              <p className="text-[11px] text-muted-foreground">Meta tags &amp; descriptions</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Nav 3: Blog Manager */}
        <div
          onClick={() => onNavigateTab("blogs")}
          className="group cursor-pointer rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 group-hover:scale-105 transition-transform">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Blog CMS</h4>
              <p className="text-[11px] text-muted-foreground">Articles &amp; FAQs</p>
            </div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Nav 4: Live Website */}
        <Link
          href="/"
          target="_blank"
          className="group rounded-2xl border border-border bg-card p-5 hover:border-brand/40 transition shadow-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 group-hover:scale-105 transition-transform">
              <ExternalLink className="size-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Live Site</h4>
              <p className="text-[11px] text-muted-foreground">printosync.com</p>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-transform" />
        </Link>
      </div>
    </div>
  );
}
