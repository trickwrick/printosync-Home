"use client";

import { useState, useEffect } from "react";
import {
  Factory,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Search,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
} from "lucide-react";
import Link from "next/link";

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryItem {
  _id?: string;
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
  faqs?: IndustryFaq[];
  order?: number;
  isActive?: boolean;
}

export function IndustriesManager() {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<IndustryItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Input states for comma-separated fields
  const [featuresInput, setFeaturesInput] = useState("");
  const [benefitsInput, setBenefitsInput] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/industries");
      const data = await res.json();
      if (data.success && Array.isArray(data.industries)) {
        setIndustries(data.industries);
      }
    } catch (err) {
      console.error("Failed to load industries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    const item = industries[index];
    setEditFormData({
      ...item,
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      faqs: Array.isArray(item.faqs) ? [...item.faqs] : [],
    });
    setFeaturesInput((item.features || []).join("\n"));
    setBenefitsInput((item.benefits || []).join("\n"));
    setKeywordsInput((item.keywords || []).join(", "));
    setIsNew(false);
  };

  const handleStartCreate = () => {
    const newItem: IndustryItem = {
      slug: "",
      title: "",
      shortTitle: "",
      eyebrow: "Industry solution",
      description: "",
      features: [
        "Industry-ready workflow",
        "Accurate job costing",
        "Live production tracking",
        "Connected inventory",
      ],
      benefits: ["Faster turnaround", "Lower waste", "Better margins"],
      keywords: [],
      seoTitle: "",
      seoDescription: "",
      faqs: [],
      isActive: true,
      order: industries.length,
    };
    setEditFormData(newItem);
    setFeaturesInput(newItem.features.join("\n"));
    setBenefitsInput(newItem.benefits.join("\n"));
    setKeywordsInput("");
    setIsNew(true);
    setEditingIndex(-1);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditFormData(null);
    setIsNew(false);
  };

  const handleAddFaq = () => {
    if (!editFormData) return;
    setEditFormData({
      ...editFormData,
      faqs: [...(editFormData.faqs || []), { question: "", answer: "" }],
    });
  };

  const handleRemoveFaq = (index: number) => {
    if (!editFormData) return;
    const nextFaqs = [...(editFormData.faqs || [])];
    nextFaqs.splice(index, 1);
    setEditFormData({ ...editFormData, faqs: nextFaqs });
  };

  const handleFaqChange = (index: number, field: "question" | "answer", val: string) => {
    if (!editFormData) return;
    const nextFaqs = [...(editFormData.faqs || [])];
    nextFaqs[index] = { ...nextFaqs[index], [field]: val };
    setEditFormData({ ...editFormData, faqs: nextFaqs });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    if (!editFormData.slug.trim()) {
      alert("Please provide a URL Slug (e.g., offset-printing-press)");
      return;
    }
    if (!editFormData.title.trim()) {
      alert("Please provide an Industry Title");
      return;
    }

    setSaveStatus("saving");
    setStatusMessage("Saving changes to database...");

    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const benefits = benefitsInput
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const keywords = keywordsInput
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const payload: IndustryItem = {
      ...editFormData,
      features,
      benefits,
      keywords,
    };

    try {
      const res = await fetch("/api/admin/industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: payload }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Failed to update industry");
      }

      setSaveStatus("saved");
      setStatusMessage("Industry successfully updated in live database!");
      handleCancel();
      fetchIndustries();

      setTimeout(() => setSaveStatus("idle"), 4000);
    } catch (err: unknown) {
      setSaveStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Error saving industry");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) return;

    try {
      const res = await fetch(`/api/admin/industries?slug=${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setIndustries((prev) => prev.filter((i) => i.slug !== slug));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete industry");
    }
  };

  const handleToggleActive = async (item: IndustryItem) => {
    try {
      const updated = { ...item, isActive: !item.isActive };
      setIndustries((prev) =>
        prev.map((i) => (i.slug === item.slug ? updated : i))
      );

      await fetch("/api/admin/industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry: updated }),
      });
    } catch (err) {
      console.error("Toggle error:", err);
      fetchIndustries();
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= industries.length) return;

    const newItems = [...industries];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setIndustries(reordered);

    try {
      await fetch("/api/admin/industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", industries: reordered }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchIndustries();
    }
  };

  const filtered = industries.filter((item) =>
    item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.slug.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Factory className="size-5 text-brand" />
            <h2 className="text-lg font-bold text-foreground">
              &quot;Who We Help&quot; &amp; Industries Management
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Edit and manage all 10+ printing segments appearing in the header navbar menu and homepage overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Add New Industry
          </button>
        </div>
      </div>

      {/* Status banner */}
      {saveStatus === "saved" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {saveStatus === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Search & Counter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search industries (e.g. Offset, Digital)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          Showing {filtered.length} of {industries.length} industries
        </span>
      </div>

      {/* Industries Table / Grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>All Industries ({industries.length})</span>
          <span className="text-[11px] normal-case font-normal text-muted-foreground">
            Syncs with Header Menu &amp; /industries/[slug] pages
          </span>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Factory className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No industries found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try clearing your search or add a new industry.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((item, idx) => (
              <div
                key={item.slug || idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition hover:bg-muted/30 ${
                  item.isActive === false ? "opacity-60 bg-muted/20" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 text-muted-foreground pt-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move up"
                    >
                      <MoveUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === industries.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move down"
                    >
                      <MoveDown className="size-3.5" />
                    </button>
                  </div>

                  <div className="size-11 shrink-0 rounded-xl border border-border bg-surface flex items-center justify-center text-brand shadow-sm">
                    <Factory className="size-5" />
                  </div>

                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">{item.title}</p>
                      <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        /industries/{item.slug}
                      </span>
                      {item.isActive === false && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(item.features || []).slice(0, 3).map((f) => (
                        <span key={f} className="text-[10px] font-medium bg-brand/10 text-brand px-2 py-0.5 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:self-center self-end">
                  <Link
                    href={`/industries/${item.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="View live landing page"
                  >
                    <ExternalLink className="size-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title={item.isActive === false ? "Show in menu" : "Hide from menu"}
                  >
                    {item.isActive === false ? <EyeOff className="size-4" /> : <Eye className="size-4 text-brand" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(industries.findIndex((ind) => ind.slug === item.slug))}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="Edit Industry"
                  >
                    <Edit2 className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.slug)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Create Form Modal */}
      {editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8 rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4 sticky top-0 bg-card z-10">
              <div className="flex items-center gap-2">
                <Factory className="size-5 text-brand" />
                <h3 className="text-base font-bold text-foreground">
                  {isNew ? "Add New Industry Solution" : `Edit Industry: ${editFormData.title}`}
                </h3>
              </div>
              <button
                onClick={handleCancel}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Industry Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Offset Printing Press"
                    value={editFormData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = isNew
                        ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                        : editFormData.slug;
                      setEditFormData({ ...editFormData, title, slug });
                    }}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    URL Slug * (Unique)
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!isNew}
                    placeholder="e.g. offset-printing-press"
                    value={editFormData.slug}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      })
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-mono text-foreground outline-none transition focus:ring-1 focus:ring-brand disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Eyebrow Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Industry solution or Custom offset press"
                  value={editFormData.eyebrow}
                  onChange={(e) => setEditFormData({ ...editFormData, eyebrow: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Plan plates, paper, machines, finishing, and costs for complex offset jobs."
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Core Features (One per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Industry-ready workflow&#10;Accurate job costing&#10;Live production tracking"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Key Benefits (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Faster turnaround&#10;Lower waste&#10;Better margins"
                  value={benefitsInput}
                  onChange={(e) => setBenefitsInput(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  SEO Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="offset printing software, printing press ERP"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* SEO Meta Title & Description */}
              <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-3">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Page SEO Meta Information
                </p>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Offset Printing Press Management Software | PrintoSync"
                    value={editFormData.seoTitle || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, seoTitle: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Search engine snippet description..."
                    value={editFormData.seoDescription || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, seoDescription: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* FAQs Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-foreground">
                    Frequently Asked Questions (FAQs)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <Plus className="size-3.5" /> Add Question
                  </button>
                </div>

                {(editFormData.faqs || []).map((faq, fIdx) => (
                  <div key={fIdx} className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        placeholder="Question (e.g. How does PrintoSync help offset presses?)"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(fIdx, "question", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-brand"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(fIdx)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Answer..."
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(fIdx, "answer", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="industry-active"
                  checked={editFormData.isActive !== false}
                  onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                  className="rounded border-border text-brand focus:ring-brand"
                />
                <label htmlFor="industry-active" className="text-xs font-medium text-foreground cursor-pointer">
                  Display active in &quot;Who we help&quot; header menu and homepage
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveStatus === "saving"}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  {isNew ? "Create Industry" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
