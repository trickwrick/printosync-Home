"use client";

import { LogOut, LayoutDashboard, Settings, Users, FileText, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-border bg-card/50 backdrop-blur-xl">
        <div className="flex h-16 items-center border-b border-border px-6">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Printo<span className="text-brand">Sync</span> <span className="text-muted-foreground font-medium text-lg ml-1">Admin</span>
          </span>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-brand/10 px-3 py-2 text-sm font-medium text-brand">
            <LayoutDashboard className="size-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Users className="size-5" />
            Users
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <FileText className="size-5" />
            Reports
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings className="size-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
          <h1 className="font-semibold text-foreground">Overview</h1>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="size-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center border border-brand/30">
              <span className="text-xs font-bold text-brand">AD</span>
            </div>
            <button 
              onClick={() => router.push('/admin/login')}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors ml-2"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Content Placeholder */}
        <div className="p-8">
          <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
            <LayoutDashboard className="mx-auto mb-4 size-12 text-muted-foreground/50" />
            <h2 className="text-lg font-semibold text-foreground">Admin Panel Ready</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              This is a placeholder for your future admin dashboard. We&apos;ve set up the layout, sidebar, and routing for you. Just let me know what features you want to add next!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
