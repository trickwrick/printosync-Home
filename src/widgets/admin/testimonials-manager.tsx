"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Edit2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export interface TestimonialItem {
  _id?: string;
  quote: string;
  author: string;
  authorInitial?: string;
  designation: string;
  avatarUrl?: string;
  order: number;
  isActive: boolean;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [author, setAuthor] = useState("");
  const [authorInitial, setAuthorInitial] = useState("");
  const [designation, setDesignation] = useState("");
  const [quote, setQuote] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success && Array.isArray(data.testimonials)) {
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setAuthor("");
    setAuthorInitial("");
    setDesignation("");
    setQuote("");
    setAvatarUrl("");
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setAuthor(item.author);
    setAuthorInitial(item.authorInitial || "");
    setDesignation(item.designation);
    setQuote(item.quote);
    setAvatarUrl(item.avatarUrl || "");
    setIsActive(item.isActive !== false);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setAvatarUrl(data.url);
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload avatar image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      alert("Please fill in author name and testimonial quote.");
      return;
    }

    try {
      setStatus("saving");
      const payload: Partial<TestimonialItem> = {
        author: author.trim(),
        authorInitial: authorInitial.trim(),
        designation: designation.trim(),
        quote: quote.trim(),
        avatarUrl: avatarUrl.trim(),
        isActive,
      };

      if (editingItem?._id) {
        payload._id = editingItem._id;
        payload.order = editingItem.order;
      }

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonial: payload }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("saved");
        setMessage(editingItem ? "Testimonial updated successfully!" : "Testimonial added successfully!");
        setModalOpen(false);
        fetchTestimonials();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error saving testimonial");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete testimonial");
    }
  };

  const handleToggleActive = async (item: TestimonialItem) => {
    try {
      const updated = { ...item, isActive: !item.isActive };
      setTestimonials((prev) =>
        prev.map((t) => (t._id === item._id ? updated : t))
      );

      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonial: updated }),
      });
    } catch (err) {
      console.error("Toggle error:", err);
      fetchTestimonials();
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= testimonials.length) return;

    const newItems = [...testimonials];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setTestimonials(reordered);

    try {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", testimonials: reordered }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchTestimonials();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="size-5 text-brand" />
            <h2 className="text-lg font-bold text-foreground">
              Book Demo Page Testimonials
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage customer quotes, press names, reviewer names, and photos on the &quot;/book-demo&quot; form page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/book-demo"
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-brand/40 transition"
          >
            <span>View Demo Page</span>
            <ExternalLink className="size-3.5 text-brand" />
          </Link>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Add Testimonial
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

      {/* List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Testimonials ({testimonials.length})</span>
          <span className="text-[11px] normal-case font-normal text-muted-foreground">
            Shown in testimonial carousel on /book-demo
          </span>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquareQuote className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No testimonials yet</p>
            <p className="mt-1 text-xs text-muted-foreground">Click &quot;Add Testimonial&quot; above to create one.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {testimonials.map((item, idx) => (
              <div
                key={item._id || idx}
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
                      disabled={idx === testimonials.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move down"
                    >
                      <MoveDown className="size-3.5" />
                    </button>
                  </div>

                  {/* Avatar or Initial Icon */}
                  <div className="size-12 shrink-0 rounded-full border border-border bg-surface flex items-center justify-center overflow-hidden font-bold text-brand text-sm shadow-sm">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt={item.author}
                        width={48}
                        height={48}
                        className="size-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span>{item.authorInitial || item.author.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">{item.author}</p>
                      {item.designation && (
                        <span className="text-xs text-muted-foreground">
                          • {item.designation}
                        </span>
                      )}
                      {item.isActive === false && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-xs italic text-muted-foreground leading-relaxed">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:self-center self-end">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title={item.isActive === false ? "Show in carousel" : "Hide from carousel"}
                  >
                    {item.isActive === false ? <EyeOff className="size-4" /> : <Eye className="size-4 text-brand" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="Edit testimonial"
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
              <h3 className="text-base font-bold text-foreground">
                {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Author / Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Initials (optional)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. RS"
                    value={authorInitial}
                    onChange={(e) => setAuthorInitial(e.target.value.toUpperCase())}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Designation / Company &amp; City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Offset & Packaging, Jaipur"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. The demo helped me understand how PrintoSync simplifies offset job cards..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Avatar / Client Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <div className="size-14 shrink-0 rounded-full border border-border bg-surface flex items-center justify-center overflow-hidden font-bold text-brand text-sm shadow-inner">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt="Avatar Preview"
                        width={56}
                        height={56}
                        className="size-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span>{authorInitial || (author ? author.slice(0, 2).toUpperCase() : "PS")}</span>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="testimonial-file-upload"
                    />
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="testimonial-file-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted/60 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
                      >
                        <Upload className="size-3.5 text-brand" />
                        {uploading ? "Uploading..." : "Upload Photo"}
                      </label>

                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl("")}
                          className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Upload directly from your computer (PNG, JPG, WebP)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="testimonial-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-border text-brand focus:ring-brand"
                />
                <label htmlFor="testimonial-active" className="text-xs font-medium text-foreground cursor-pointer">
                  Display on /book-demo page carousel
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
                  disabled={uploading}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  {editingItem ? "Save Changes" : "Add Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
