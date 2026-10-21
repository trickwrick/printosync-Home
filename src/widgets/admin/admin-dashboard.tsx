"use client";

import { useState, useEffect } from "react";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  Bell,
  Layers,
  ArrowUpRight,
  Mail,
  Globe,
  Building2,
  MessageSquareQuote,
  Factory,
  HelpCircle,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModulesManager } from "./modules-manager";
import { InquiriesManager } from "./inquiries-manager";
import { HomeSeoManager } from "./home-seo-manager";
import { ClientsManager } from "./clients-manager";
import { TestimonialsManager } from "./testimonials-manager";
import { IndustriesManager } from "./industries-manager";
import { FaqsManager } from "./faqs-manager";
import { BlogsManager } from "./blogs-manager";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "inquiries" | "modules" | "industries" | "blogs" | "home-seo" | "clients" | "testimonials" | "faqs" | "settings"
  >("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("printosync_admin_auth");
    if (!isAuth) {
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("printosync_admin_auth");
    router.push("/admin/login");
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    );
  }
  
  const selectTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/" target="_blank" className="font-display text-xl font-bold tracking-tight text-foreground hover:opacity-85 transition">
            Printo<span className="text-brand">Sync</span> <span className="text-muted-foreground font-medium text-xs ml-1 border border-border px-1.5 py-0.5 rounded">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <button
            onClick={() => selectTab("dashboard")}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="size-5" />
            Overview
          </button>

          <button
            onClick={() => selectTab("inquiries")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "inquiries"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="size-5" />
              Inquiries
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              New
            </span>
          </button>

          <button
            onClick={() => selectTab("modules")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "modules"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="size-5" />
              Modules
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-background/20 font-bold">
              6
            </span>
          </button>

          <button
            onClick={() => selectTab("industries")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "industries"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Factory className="size-5" />
              Who We Help
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold">
              10
            </span>
          </button>

          <button
            onClick={() => selectTab("blogs")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "blogs"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="size-5" />
              Blog &amp; Articles
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold">
              Posts
            </span>
          </button>

          <button
            onClick={() => selectTab("home-seo")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "home-seo"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Globe className="size-5" />
              Home SEO
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-brand/20 text-brand font-bold">
              Special
            </span>
          </button>

          <button
            onClick={() => selectTab("clients")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "clients"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Building2 className="size-5" />
              Clients &amp; Logos
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              Ticker
            </span>
          </button>

          <button
            onClick={() => selectTab("testimonials")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "testimonials"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquareQuote className="size-5" />
              Testimonials
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
              Demo
            </span>
          </button>

          <button
            onClick={() => selectTab("faqs")}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "faqs"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="size-5" />
              Homepage FAQs
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
              Home
            </span>
          </button>

          <button
            onClick={() => selectTab("settings")}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              activeTab === "settings"
                ? "bg-brand text-brand-foreground shadow-sm shadow-brand/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="size-5" />
            Settings
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-brand/40 transition"
          >
            <span>Visit Live Website</span>
            <ArrowUpRight className="size-3.5 text-brand" />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-0 lg:pl-64 min-w-0 transition-all">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden shrink-0"
              aria-label="Open navigation sidebar"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="font-bold text-foreground text-base sm:text-lg capitalize truncate">
              {activeTab === "modules"
                ? "Modules & ERP Features"
                : activeTab === "industries"
                ? "Who We Help (Printing Segments)"
                : activeTab === "blogs"
                ? "Blog Articles & Publishing"
                : activeTab === "home-seo"
                ? "Home Page SEO Management"
                : activeTab === "clients"
                ? "Trusted Print Shops & Client Logos"
                : activeTab === "testimonials"
                ? "Book Demo Testimonials"
                : activeTab === "faqs"
                ? "Homepage FAQs Management"
                : activeTab === "inquiries"
                ? "Customer Inquiries & Leads"
                : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted">
              <Bell className="size-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30">
              <span className="text-xs font-bold text-brand">AD</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-destructive transition-colors ml-1 sm:ml-2 p-1.5 rounded-lg hover:bg-muted"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "inquiries" && <InquiriesManager />}

          {activeTab === "modules" && <ModulesManager />}

          {activeTab === "industries" && <IndustriesManager />}

          {activeTab === "blogs" && <BlogsManager />}

          {activeTab === "home-seo" && <HomeSeoManager />}

          {activeTab === "clients" && <ClientsManager />}

          {activeTab === "testimonials" && <TestimonialsManager />}

          {activeTab === "faqs" && <FaqsManager />}

          {activeTab === "dashboard" && (
            <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
              <LayoutDashboard className="mx-auto mb-4 size-12 text-muted-foreground/50" />
              <h2 className="text-lg font-semibold text-foreground">Overview Dashboard</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Quick stats, system health, and website analytics.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
              <Settings className="mx-auto mb-4 size-12 text-muted-foreground/50" />
              <h2 className="text-lg font-semibold text-foreground">Admin Settings</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Platform configuration, notification webhooks, and security settings.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
