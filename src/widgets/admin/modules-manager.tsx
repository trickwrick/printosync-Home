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
  HelpCircle,
  Search,
} from "lucide-react";
import Link from "next/link";

export interface ModuleFaq {
  question: string;
  answer: string;
}

export interface ModuleItem {
  slug: string;
  title: string;
  shortTitle?: string;
  eyebrow: string;
  description: string;
  features: string[];
  benefits: string[];
  keywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: ModuleFaq[];
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
    const item = modules[index];
    setEditFormData({
      ...item,
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      faqs: Array.isArray(item.faqs) ? [...item.faqs] : [],
    });
    setIsNew(false);
  };

  const handleStartCreate = () => {
    setEditFormData({
      slug: "",
      title: "",
      shortTitle: "",
      eyebrow: "",
      description: "",
      features: [],
      benefits: [],
      keywords: [],
      seoTitle: "",
      seoDescription: "",
      faqs: [],
    });
    setIsNew(true);
    setEditingIndex(modules.length);
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
        setStatusMessage("Changes saved successfully to MongoDB!");
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

  // FAQ management inside edit form
  const handleAddFaq = () => {
    if (!editFormData) return;
    const currentFaqs = editFormData.faqs || [];
    setEditFormData({
      ...editFormData,
      faqs: [...currentFaqs, { question: "", answer: "" }],
    });
  };

  const handleUpdateFaq = (index: number, field: "question" | "answer", value: string) => {
    if (!editFormData) return;
    const currentFaqs = [...(editFormData.faqs || [])];
    currentFaqs[index] = { ...currentFaqs[index], [field]: value };
    setEditFormData({ ...editFormData, faqs: currentFaqs });
  };

  const handleRemoveFaq = (index: number) => {
    if (!editFormData) return;
    const currentFaqs = (editFormData.faqs || []).filter((_, i) => i !== index);
    setEditFormData({ ...editFormData, faqs: currentFaqs });
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
            Edit modules, custom SEO Title & Meta Description, and add Page FAQs directly into MongoDB.
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

      {/* Status Alert Banner */}
      {saveStatus !== "idle" && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 text-sm font-medium transition-all ${
            saveStatus === "saving"
              ? "bg-muted text-muted-foreground"
              : saveStatus === "saved"
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {saveStatus === "saving" && (
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {saveStatus === "saved" && <CheckCircle2 className="size-5 text-emerald-400" />}
            {saveStatus === "error" && <AlertCircle className="size-5 text-red-400" />}
            <span>
              {saveStatus === "saving"
                ? "Saving module changes to database..."
                : statusMessage}
            </span>
          </div>
          <button
            onClick={() => setSaveStatus("idle")}
            className="rounded-lg p-1 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* EDIT MODAL / DRAWER */}
      {editFormData && (
        <div className="rounded-3xl border border-brand/30 bg-card p-6 shadow-xl ring-1 ring-brand/10">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {isNew ? "Create New Module" : `Edit: ${editFormData.title}`}
              </h3>
              <p className="text-xs text-muted-foreground">
                Update module content, SEO meta tags, and FAQ questions & answers
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
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
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
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

            {/* SEO SECTION */}
            <div className="sm:col-span-2 rounded-2xl border border-brand/20 bg-brand-muted/20 p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-brand">
                <Search className="size-4" />
                SEO Settings (Title & Meta Description for this page)
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Custom SEO Page Title
                  </label>
                  <input
                    type="text"
                    value={editFormData.seoTitle || ""}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, seoTitle: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                    placeholder={`Default: ${editFormData.title || "Module"} for Printing Presses`}
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Search engine title tag. Leave empty to use default module title.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={editFormData.seoDescription || ""}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, seoDescription: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                    placeholder="Short description for Google Search snippets (150-160 characters)"
                  />
                </div>
              </div>
            </div>

            {/* FAQS SECTION */}
            <div className="sm:col-span-2 rounded-2xl border border-border bg-card/60 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <HelpCircle className="size-4 text-brand" />
                  Module FAQs ({editFormData.faqs?.length || 0})
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand hover:text-brand-foreground transition"
                >
                  <Plus className="size-3.5" />
                  Add FAQ
                </button>
              </div>

              {(!editFormData.faqs || editFormData.faqs.length === 0) ? (
                <p className="text-xs text-muted-foreground italic">
                  No FAQs added for this module yet. Click &quot;Add FAQ&quot; to add questions and answers.
                </p>
              ) : (
                <div className="space-y-4">
                  {editFormData.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="relative rounded-xl border border-border bg-background p-4 space-y-3"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(fIdx)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-red-400 transition"
                        title="Delete FAQ"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Question #{fIdx + 1}
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleUpdateFaq(fIdx, "question", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-brand"
                          placeholder="e.g. Can this module handle multi-rate GST invoices?"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Answer #{fIdx + 1}
                        </label>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => handleUpdateFaq(fIdx, "answer", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-border bg-card p-3 text-xs text-foreground outline-none focus:ring-1 focus:ring-brand"
                          placeholder="e.g. Yes, it automatically calculates 5%, 12%, 18% GST and prints HSN/SAC codes..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      {/* MODULES LIST TABLE */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="divide-y divide-border">
          {modules.map((item, index) => {
            const isEditing = editingIndex === index;
            return (
              <div
                key={item.slug}
                className={`flex flex-col gap-4 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                  isEditing ? "bg-brand/5" : "hover:bg-muted/40"
                }`}
              >
                <div className="space-y-1 sm:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-brand">
                      #{index + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    {item.shortTitle && (
                      <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {item.shortTitle}
                      </span>
                    )}
                    {item.faqs && item.faqs.length > 0 && (
                      <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                        {item.faqs.length} FAQs
                      </span>
                    )}
                    {item.seoTitle && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        Custom SEO
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1">
                    <span>
                      <strong className="text-foreground">{item.features.length}</strong> Features
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-foreground">{item.benefits.length}</strong> Benefits
                    </span>
                    <span>•</span>
                    <Link
                      href={`/modules/${item.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-brand hover:underline"
                    >
                      View Live Page <ExternalLink className="size-3" />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleStartEdit(index)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-brand/40 hover:bg-brand-muted hover:text-brand"
                  >
                    <Edit2 className="size-3.5" />
                    Edit & FAQs
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="rounded-xl border border-border p-1.5 text-muted-foreground transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    title="Delete Module"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
