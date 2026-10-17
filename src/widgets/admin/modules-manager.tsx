"use client";

import { useState, useEffect } from "react";
import {
  Edit2,
  Plus,
  Trash2,
  Save,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export interface ModuleItem {
  slug: string;
  title: string;
  shortTitle?: string;
  eyebrow: string;
  description: string;
  features: string[];
  benefits: string[];
  keywords: string[];
}

export function ModulesManager() {
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<ModuleItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/modules");
      const data = await res.json();
      if (data.success) {
        setModules(data.modules);
      }
    } catch (err) {
      console.error("Failed to load modules:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditFormData({ ...modules[index] });
    setIsNew(false);
  };

  const handleStartCreate = () => {
    const newModule: ModuleItem = {
      slug: "new-module-for-printing-press",
      title: "New Software for Printing Press",
      shortTitle: "New Module",
      eyebrow: "Module Subtitle / Tagline",
      description: "Comprehensive software module description for printing businesses.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      benefits: ["Benefit 1", "Benefit 2"],
      keywords: ["printing press software"],
    };
    setEditingIndex(modules.length);
    setEditFormData(newModule);
    setIsNew(true);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditFormData(null);
    setIsNew(false);
  };

  const handleDelete = async (index: number) => {
    if (!confirm(`Are you sure you want to remove "${modules[index].title}"?`)) return;
    const updated = modules.filter((_, i) => i !== index);
    setModules(updated);
    if (editingIndex === index) {
      handleCancel();
    }
    await saveToServer(updated);
  };

  const handleSave = async () => {
    if (!editFormData) return;
    if (!editFormData.title.trim() || !editFormData.slug.trim()) {
      alert("Title and Slug are required.");
      return;
    }

    let updated: ModuleItem[];
    if (isNew) {
      updated = [...modules, editFormData];
    } else if (editingIndex !== null) {
      updated = modules.map((m, idx) => (idx === editingIndex ? editFormData : m));
    } else {
      return;
    }

    setModules(updated);
    handleCancel();
    await saveToServer(updated);
  };

  const saveToServer = async (items: ModuleItem[]) => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modules: items }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("saved");
        setStatusMessage("Changes saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setStatusMessage(data.error || "Failed to save");
      }
    } catch {
      setSaveStatus("error");
      setStatusMessage("Error connecting to server");
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
      {/* Top Banner / Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Modules Management
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage PrintoSync modules, edit titles, descriptions, features, and SEO keywords.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90"
          >
            <Plus className="size-4" />
            Add New Module
          </button>
        </div>
      </div>

      {saveStatus === "saved" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-5" />
          <span>{statusMessage}</span>
        </div>
      )}

      {saveStatus === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-5" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Edit Modal or Inline Card */}
      {editingIndex !== null && editFormData && (
        <div className="rounded-2xl border border-brand/40 bg-card p-6 shadow-premium transition-all">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand font-semibold text-sm">
                {isNew ? "+" : editingIndex + 1}
              </span>
              <h3 className="font-semibold text-foreground text-lg">
                {isNew ? "Create New Module" : `Edit Module: ${editFormData.title}`}
              </h3>
            </div>
            <button
              onClick={handleCancel}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Module Title (Full)
              </label>
              <input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="e.g. Billing Software for Printing Press"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Short Title (Menu / Card Badge)
              </label>
              <input
                type="text"
                value={editFormData.shortTitle ?? ""}
                onChange={(e) => setEditFormData({ ...editFormData, shortTitle: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="e.g. Billing Software"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                URL Slug (/modules/[slug])
              </label>
              <input
                type="text"
                value={editFormData.slug}
                onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="e.g. billing-software-for-printing-press"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Eyebrow / Subtitle
              </label>
              <input
                type="text"
                value={editFormData.eyebrow}
                onChange={(e) => setEditFormData({ ...editFormData, eyebrow: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="e.g. GST billing & invoicing for print shops"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </label>
              <textarea
                rows={3}
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="Detailed description of what this module does..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Features (One per line)
              </label>
              <textarea
                rows={4}
                value={editFormData.features.join("\n")}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    features: e.target.value.split("\n").filter((line) => line.trim().length > 0),
                  })
                }
                className="mt-2 w-full font-mono text-xs rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Benefits (One per line)
              </label>
              <textarea
                rows={3}
                value={editFormData.benefits.join("\n")}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    benefits: e.target.value.split("\n").filter((line) => line.trim().length > 0),
                  })
                }
                className="mt-2 w-full font-mono text-xs rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="Benefit 1&#10;Benefit 2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                SEO Keywords (Comma separated)
              </label>
              <textarea
                rows={3}
                value={editFormData.keywords.join(", ")}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                  })
                }
                className="mt-2 w-full font-mono text-xs rounded-xl border border-border bg-background p-4 text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                placeholder="keyword 1, keyword 2, keyword 3"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              onClick={handleCancel}
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90"
            >
              <Save className="size-4" />
              Save Module
            </button>
          </div>
        </div>
      )}

      {/* Modules List Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((item, index) => {
          const isCurrentEditing = editingIndex === index;
          return (
            <div
              key={item.slug}
              className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                isCurrentEditing
                  ? "border-brand bg-brand-muted/20 shadow-md ring-2 ring-brand/30"
                  : "border-border bg-card hover:border-brand/30 hover:shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-brand/10 font-mono text-xs font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <Link
                      href={`/modules/${item.slug}`}
                      target="_blank"
                      title="Preview on website"
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-brand"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    <button
                      onClick={() => handleStartEdit(index)}
                      title="Edit Module"
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-brand/10 hover:text-brand"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      title="Delete Module"
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 font-display font-bold text-foreground group-hover:text-brand text-base leading-snug">
                  {item.title}
                </h3>
                <span className="mt-1 inline-block text-xs font-semibold text-brand">
                  {item.eyebrow}
                </span>

                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                    >
                      {f}
                    </span>
                  ))}
                  {item.features.length > 3 && (
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                      +{item.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 border-t border-border/60 pt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono text-[11px] truncate max-w-42.5">
                  /{item.slug}
                </span>
                <button
                  onClick={() => handleStartEdit(index)}
                  className="font-medium text-brand hover:underline inline-flex items-center gap-1"
                >
                  Edit details &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
