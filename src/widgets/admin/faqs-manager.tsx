"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
} from "lucide-react";
import Link from "next/link";

export interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export function FaqsManager() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success && Array.isArray(data.faqs)) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: FaqItem) => {
    setEditingFaq(item);
    setQuestion(item.question);
    setAnswer(item.answer);
    setIsActive(item.isActive !== false);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      alert("Please enter both question and answer.");
      return;
    }

    try {
      setStatus("saving");
      const payload: Partial<FaqItem> = {
        question: question.trim(),
        answer: answer.trim(),
        isActive,
      };

      if (editingFaq?._id) {
        payload._id = editingFaq._id;
        payload.order = editingFaq.order;
      }

      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faq: payload }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("saved");
        setMessage(editingFaq ? "FAQ updated successfully!" : "FAQ added successfully!");
        setModalOpen(false);
        fetchFaqs();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error saving FAQ");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) => prev.filter((f) => f._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete FAQ");
    }
  };

  const handleToggleActive = async (item: FaqItem) => {
    try {
      const updated = { ...item, isActive: !item.isActive };
      setFaqs((prev) =>
        prev.map((f) => (f._id === item._id ? updated : f))
      );

      await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faq: updated }),
      });
    } catch (err) {
      console.error("Toggle error:", err);
      fetchFaqs();
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const newFaqs = [...faqs];
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[targetIndex];
    newFaqs[targetIndex] = temp;

    const reordered = newFaqs.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setFaqs(reordered);

    try {
      await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", faqs: reordered }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchFaqs();
    }
  };

  const filtered = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-brand" />
            <h2 className="text-lg font-bold text-foreground">
              Homepage FAQs Management (&quot;You ask. We answer.&quot;)
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Add, edit, reorder, and hide questions appearing in the main homepage FAQ accordion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#faq"
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-brand/40 transition"
          >
            <span>View on Home</span>
            <ExternalLink className="size-3.5 text-brand" />
          </Link>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Add New FAQ
          </button>
        </div>
      </div>

      {/* Status banner */}
      {status === "saved" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          Total: {faqs.length} FAQs ({faqs.filter((f) => f.isActive !== false).length} active)
        </span>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Homepage Questions ({filtered.length})</span>
          <span className="text-[11px] normal-case font-normal text-muted-foreground">
            Controls accordion on the main landing page
          </span>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No FAQs found</p>
            <p className="mt-1 text-xs text-muted-foreground">Click &quot;Add New FAQ&quot; above to create one.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((item, idx) => (
              <div
                key={item._id || idx}
                className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 transition hover:bg-muted/30 ${
                  item.isActive === false ? "opacity-60 bg-muted/20" : ""
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 text-muted-foreground pt-0.5">
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
                      disabled={idx === faqs.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move down"
                    >
                      <MoveDown className="size-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                        Q{idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-foreground">
                        {item.question}
                      </h4>
                      {item.isActive === false && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:self-start self-end shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title={item.isActive === false ? "Show on homepage" : "Hide from homepage"}
                  >
                    {item.isActive === false ? <EyeOff className="size-4" /> : <Eye className="size-4 text-brand" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="Edit question & answer"
                  >
                    <Edit2 className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="size-5 text-brand" />
                <h3 className="text-base font-bold text-foreground">
                  {editingFaq ? "Edit FAQ" : "Add New Homepage FAQ"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How long does implementation take?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Answer *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="e.g. Most shops go live within 2–4 weeks. Our team handles data migration, configuration, and training..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="faq-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-border text-brand focus:ring-brand"
                />
                <label htmlFor="faq-active" className="text-xs font-medium text-foreground cursor-pointer">
                  Display actively on homepage accordion
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "saving"}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  {editingFaq ? "Save Changes" : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
