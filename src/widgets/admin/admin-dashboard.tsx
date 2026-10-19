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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModulesManager } from "./modules-manager";
import { InquiriesManager } from "./inquiries-manager";
import { HomeSeoManager } from "./home-seo-manager";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "inquiries" | "modules" | "home-seo" | "settings"
  >("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-border bg-card/50 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/" target="_blank" className="font-display text-xl font-bold tracking-tight text-foreground hover:opacity-85 transition">
            Printo<span className="text-brand">Sync</span> <span className="text-muted-foreground font-medium text-xs ml-1 border border-border px-1.5 py-0.5 rounded">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
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
            onClick={() => setActiveTab("inquiries")}
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
            onClick={() => setActiveTab("modules")}
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
            onClick={() => setActiveTab("home-seo")}
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
            onClick={() => setActiveTab("settings")}
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
      <main className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-foreground text-lg capitalize">
              {activeTab === "modules"
                ? "Modules & ERP Features"
                : activeTab === "home-seo"
                ? "Home Page SEO Management"
                : activeTab === "inquiries"
                ? "Customer Inquiries & Leads"
                : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="size-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30">
              <span className="text-xs font-bold text-brand">AD</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors ml-2"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-8">
          {activeTab === "inquiries" && <InquiriesManager />}

          {activeTab === "modules" && <ModulesManager />}

          {activeTab === "home-seo" && <HomeSeoManager />}

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
