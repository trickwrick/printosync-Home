"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Printer, AlertCircle, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@printosync.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Standard credential check (ready for MongoDB / PostgreSQL / Supabase replacement)
    setTimeout(() => {
      const validEmail = "admin@printosync.com";
      const validPass = "admin123";

      if (email.trim().toLowerCase() === validEmail && password === validPass) {
        // Set local storage session flag
        if (typeof window !== "undefined") {
          localStorage.setItem("printosync_admin_auth", "true");
        }
        setIsLoading(false);
        router.push("/admin");
      } else {
        setIsLoading(false);
        setError("Invalid email or password. Please use admin@printosync.com / admin123");
      }
    }, 600);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(41,184,186,0.15)_0%,transparent_70%)]" />
        <div className="absolute left-1/2 top-0 h-150 w-full max-w-250 -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 h-200 w-200 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-8 shadow-premium backdrop-blur-xl sm:p-10">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20 shadow-[0_0_25px_rgba(41,184,186,0.3)]">
              <Printer className="size-7 text-brand" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              PrintoSync Admin
            </h1>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Sign in to manage modules, inquiries, and press operations
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="mb-6 rounded-2xl border border-brand/30 bg-brand-muted/40 p-3.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-brand">
              <ShieldCheck className="size-4" />
              Default Admin Credentials:
            </div>
            <div className="mt-2 space-y-1 font-mono text-[11px] text-foreground/90">
              <div>Email: <strong className="text-brand">admin@printosync.com</strong></div>
              <div>Pass: <strong className="text-brand">admin123</strong></div>
            </div>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail className="size-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@printosync.com"
                  className="w-full rounded-xl border border-border bg-background/70 py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="size-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background/70 py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="size-5 animate-spin rounded-full border-2 border-brand-foreground border-t-transparent" />
              ) : (
                <>
                  Sign In to Admin Panel
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              &larr; Back to live website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
