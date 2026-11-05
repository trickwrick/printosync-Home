"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BookOpen,
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
  ExternalLink,
  Search,
  Calendar,
  Clock,
  User,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  Tag,
  Check,
  FileText,
} from "lucide-react";
import Link from "next/link";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogItem {
  _id?: string;
  slug: string;
  path?: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage?: string;
  imageAlt?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  readTime: string;
  keywords: string[];
  sections: BlogSection[];
  faqs?: BlogFaq[];
  isFeatured?: boolean;
  order: number;
  isActive: boolean;
}

const COMMON_TAGS = [
  "Offset Printing",
  "Digital Printing",
  "Packaging",
  "Job Cards & Production",
  "GST Billing & Accounts",
  "Paper Stock & Inventory",
  "Cost Estimation & Margin",
  "Print Shop CRM",
] as const;

export function BlogsManager() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  // View state: 'list' | 'editor'
  const [view, setView] = useState<"list" | "editor">("list");
  const [, setEditingBlog] = useState<BlogItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [author, setAuthor] = useState("PrintoSync Team");
  const [readTime, setReadTime] = useState("5 min read");
  const [datePublished, setDatePublished] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [sections, setSections] = useState<BlogSection[]>([]);
  const [faqs, setFaqs] = useState<BlogFaq[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setBlogs(data.posts);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    const today = new Date().toISOString().split("T")[0];
    setEditingBlog(null);
    setIsNew(true);
    setTitle("");
    setSlug("");
    setSlugManual(false);
    setDescription("");
    setExcerpt("");
    setCoverImage("");
    setImageAlt("");
    setAuthor("PrintoSync Team");
    setReadTime("5 min read");
    setDatePublished(today);
    setKeywordsInput("");
    setCustomTag("");
    setSections([
      {
        heading: "Introduction",
        paragraphs: ["Write introductory paragraphs here..."],
      },
    ]);
    setFaqs([]);
    setIsFeatured(false);
    setIsActive(true);
    setView("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenEdit = (item: BlogItem) => {
    setEditingBlog(item);
    setIsNew(false);
    setTitle(item.title);
    setSlug(item.slug);
    setSlugManual(true);
    setDescription(item.description || "");
    setExcerpt(item.excerpt || "");
    setCoverImage(item.coverImage || "");
    setImageAlt(item.imageAlt || "");
    setAuthor(item.author || "PrintoSync Team");
    setReadTime(item.readTime || "5 min read");
    setDatePublished(item.datePublished || new Date().toISOString().split("T")[0]);
    setKeywordsInput((item.keywords || []).join(", "));
    setCustomTag("");
    setSections(Array.isArray(item.sections) && item.sections.length > 0 ? item.sections : []);
    setFaqs(Array.isArray(item.faqs) ? item.faqs : []);
    setIsFeatured(Boolean(item.isFeatured));
    setIsActive(item.isActive !== false);
    setView("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManual || isNew) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blogs");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setCoverImage(data.url);
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Section helpers
  const handleAddSection = () => {
    setSections([
      ...sections,
      { heading: "New Section", paragraphs: ["Enter content paragraph..."] },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    const next = [...sections];
    next.splice(idx, 1);
    setSections(next);
  };

  const handleSectionHeadingChange = (idx: number, heading: string) => {
    const next = [...sections];
    next[idx] = { ...next[idx], heading };
    setSections(next);
  };

  const handleSectionParagraphsChange = (idx: number, rawText: string) => {
    const next = [...sections];
    next[idx] = {
      ...next[idx],
      paragraphs: rawText.split("\n\n").map((p) => p.trim()).filter(Boolean),
    };
    setSections(next);
  };

  // FAQ helpers
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleUpdateFaq = (idx: number, field: "question" | "answer", val: string) => {
    const next = [...faqs];
    next[idx] = { ...next[idx], [field]: val };
    setFaqs(next);
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  // Tags helper
  const currentTags = keywordsInput
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const toggleTag = (tag: string) => {
    if (currentTags.includes(tag)) {
      setKeywordsInput(currentTags.filter((t) => t !== tag).join(", "));
    } else {
      setKeywordsInput([...currentTags, tag].join(", "));
    }
  };

  const handleAddCustomTag = () => {
    if (!customTag.trim()) return;
    const tag = customTag.trim();
    if (!currentTags.includes(tag)) {
      setKeywordsInput([...currentTags, tag].join(", "));
    }
    setCustomTag("");
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert("Please provide both a Blog Title and a unique URL Slug.");
      return;
    }

    try {
      setStatus("saving");
      const keywords = keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const payload: Partial<BlogItem> = {
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, ""),
        description: description.trim() || excerpt.trim(),
        excerpt: excerpt.trim(),
        coverImage: coverImage.trim(),
        imageAlt: imageAlt.trim() || title.trim(),
        author: author.trim() || "PrintoSync Team",
        readTime: readTime.trim() || "5 min read",
        datePublished: datePublished || new Date().toISOString().split("T")[0],
        keywords,
        sections,
        faqs,
        isFeatured,
        isActive,
      };

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: payload }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("saved");
        setMessage(isNew ? "Blog article published successfully!" : "Blog updated successfully!");
        setView("list");
        fetchBlogs();
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error saving blog post");
    }
  };

  const handleDelete = async (slugToDelete: string) => {
    if (!confirm(`Are you sure you want to delete "${slugToDelete}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs?slug=${slugToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slugToDelete));
        setStatus("saved");
        setMessage("Blog post deleted successfully!");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog post");
    }
  };

  const handleToggleActive = async (item: BlogItem) => {
    try {
      const updated = { ...item, isActive: !item.isActive };
      setBlogs((prev) =>
        prev.map((b) => (b.slug === item.slug ? updated : b))
      );

      await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: updated }),
      });
    } catch (err) {
      console.error("Toggle error:", err);
      fetchBlogs();
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blogs.length) return;

    const newBlogs = [...blogs];
    const temp = newBlogs[index];
    newBlogs[index] = newBlogs[targetIndex];
    newBlogs[targetIndex] = temp;

    const reordered = newBlogs.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setBlogs(reordered);

    try {
      await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", posts: reordered }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchBlogs();
    }
  };

  const filtered = blogs.filter(
    (item) =>
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // ----------------------------------------------------
  // FULL PAGE EDITOR VIEW (Matches reference screenshot)
  // ----------------------------------------------------
  if (view === "editor") {
    return (
      <div className="space-y-6 pb-20 animate-in fade-in duration-150">
        {/* Top Header / Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setView("list")}
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition"
              title="Back to all articles"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                {isNew ? "Create New Blog Post" : `Edit Blog Post: ${title}`}
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Fill in the details below. All sections, FAQs, and SEO tags will publish to live website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setView("list")}
              className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveBlog}
              disabled={status === "saving"}
              className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
            >
              {status === "saving" ? (
                <>
                  <div className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  <span>{isNew ? "Publish Blog Post" : "Update Blog Post"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status notification */}
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

        {/* Two Column Layout matching screenshot */}
        <form onSubmit={handleSaveBlog} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Content Column (~8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Slug Box */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter blog post title here..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Slug (URL-friendly) <span className="text-destructive">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setSlugManual(!slugManual)}
                    className="text-[11px] font-medium text-brand hover:underline"
                  >
                    {slugManual ? "Auto-generate from title" : "Edit slug manually"}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={slug}
                  disabled={!slugManual && isNew}
                  onChange={(e) => {
                    setSlugManual(true);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                  }}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-mono text-foreground outline-none transition focus:ring-1 focus:ring-brand disabled:opacity-60"
                  placeholder="e.g. printing-press-crm-guide"
                />
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Live URL: <span className="font-mono text-foreground">https://printosync.com/blog/{slug || "slug-url"}</span>
                </p>
              </div>

              {/* Date */}
              <div className="max-w-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Publish Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Featured / Cover Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 disabled:opacity-50 transition"
                  >
                    <Upload className="size-4" />
                    <span>{uploading ? "Uploading..." : "Choose Image"}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="text-[11px] text-muted-foreground">
                    PNG, JPG, WebP up to 5MB. Recommended: 1200x630px.
                  </span>
                </div>

                {coverImage && (
                  <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-muted/20 p-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      <Image
                        src={coverImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-mono text-muted-foreground">{coverImage}</p>
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="mt-1 text-[11px] font-semibold text-destructive hover:underline"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Image Alt (SEO description for image)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Modern printing press machine in operation"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a 1-2 sentence compelling summary of this article for cards and search snippets..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>

            {/* Article Content & Sections Box */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Content &amp; Article Sections</h3>
                  <p className="text-xs text-muted-foreground">
                    Organize your article with headings and paragraphs. Blank lines create paragraph breaks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-brand hover:border-brand/40 transition"
                >
                  <Plus className="size-3.5" />
                  Add Section
                </button>
              </div>

              <div className="space-y-4">
                {sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-surface p-4 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-[10px] font-bold text-brand">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          placeholder="Section Heading (e.g. Why Automation Matters)"
                          value={section.heading}
                          onChange={(e) => handleSectionHeadingChange(idx, e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                        />
                      </div>
                      {sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSection(idx)}
                          className="text-muted-foreground hover:text-destructive p-1 rounded transition"
                          title="Delete section"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <textarea
                        rows={5}
                        placeholder="Type section paragraphs here. Hit Enter twice (blank line) between paragraphs..."
                        value={section.paragraphs.join("\n\n")}
                        onChange={(e) => handleSectionParagraphsChange(idx, e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-xs leading-relaxed text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSection}
                className="w-full py-3 rounded-xl border border-dashed border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-brand/50 transition flex items-center justify-center gap-2"
              >
                <Plus className="size-4" />
                Add Another Section
              </button>
            </div>

            {/* FAQs Box matching screenshot */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">FAQ&apos;s</h3>
                  <p className="text-xs text-muted-foreground">
                    Add frequently asked questions specific to this article for SEO rich snippets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="flex items-center gap-1.5 rounded-xl bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground shadow-xs hover:opacity-90 transition"
                >
                  <Plus className="size-3.5" />
                  Add FAQ
                </button>
              </div>

              {faqs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                  No FAQs added yet. Click &quot;Add FAQ&quot; to attach Q&amp;As to this post.
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-xl border border-border bg-surface p-4 space-y-3 relative"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-brand">Q{fIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(fIdx)}
                          className="text-muted-foreground hover:text-destructive p-1 rounded transition"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Question: e.g. How does print CRM integrate with production?"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(fIdx, "question", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer..."
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(fIdx, "answer", e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-xs leading-relaxed text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SEO & Meta Tags Box matching screenshot */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="border-b border-border pb-4">
                <h3 className="text-sm font-bold text-foreground">SEO / Meta Tags</h3>
                <p className="text-xs text-muted-foreground">
                  Define page meta title, meta keywords, and meta description to rank your page in search engines.
                </p>
              </div>

              <div className="space-y-4">
                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-foreground">
                      Meta Title <span className="text-destructive">*</span>
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      Max recommended: 60 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder={title || "Enter meta title for Google..."}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>

                {/* Meta Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-foreground">
                      Meta Keywords
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      Comma-separated phrases
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="e.g. printing press software, print shop CRM, job cards"
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-foreground">
                      Meta Description
                    </label>
                    <span className="text-[11px] text-muted-foreground">
                      Max recommended: 160 characters ({description.length}/160)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Concise, keyword-rich summary of the article for Google search snippet..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveBlog}
                disabled={status === "saving"}
                className="flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
              >
                <Check className="size-4" />
                <span>{isNew ? "Create Blog" : "Update Blog"}</span>
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className="rounded-xl border border-border bg-background px-5 py-3 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right Sidebar (~4 cols) matching screenshot */}
          <div className="lg:col-span-4 space-y-6">
            {/* Publish Settings Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-3">
                Publish Status
              </h3>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-xs font-semibold text-foreground">Live Visibility</p>
                  <p className="text-[11px] text-muted-foreground">
                    {isActive ? "Visible on /blog and sitemap" : "Saved as hidden draft"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isActive ? "bg-brand" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  placeholder="PrintoSync Team"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  placeholder="e.g. 5 min read"
                />
              </div>

              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleSaveBlog}
                  disabled={status === "saving"}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  <Check className="size-4" />
                  <span>{isNew ? "Create Blog" : "Update Blog"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition text-center"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Featured Post Card matching screenshot */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-3">
                Featured
              </h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="size-4 rounded border-border text-brand focus:ring-brand mt-0.5"
                />
                <div>
                  <span className="text-xs font-semibold text-foreground">Mark as Featured post</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Featured posts are highlighted with priority on the blog homepage.
                  </p>
                </div>
              </label>
            </div>

            {/* Categories & Tags Card matching screenshot */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Categories &amp; Tags
                </h3>
                <Tag className="size-3.5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                {COMMON_TAGS.map((tag) => {
                  const isChecked = currentTags.includes(tag);
                  return (
                    <label
                      key={tag}
                      className="flex items-center gap-2.5 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTag(tag)}
                        className="size-3.5 rounded border-border text-brand focus:ring-brand"
                      />
                      <span>{tag}</span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-border">
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1.5">
                  + Add Custom Tag
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomTag();
                      }
                    }}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomTag}
                    className="rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ----------------------------------------------------
  // ARTICLE LIST VIEW
  // ----------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-brand" />
            <h2 className="text-lg font-bold text-foreground">
              Blog &amp; Article Manager
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Write, edit, and publish blog articles with custom images, sections, FAQs, and SEO tags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-brand/40 transition"
          >
            <span>View Live Blog</span>
            <ExternalLink className="size-3.5 text-brand" />
          </Link>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Create New Blog Post
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
            placeholder="Search articles by title or slug..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          Showing {filtered.length} of {blogs.length} articles
        </span>
      </div>

      {/* Blog Cards List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Articles ({blogs.length})</span>
          <span className="text-[11px] normal-case font-normal text-muted-foreground">
            Synchronizes with /blog and /blog/[slug]
          </span>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No blog posts found</p>
            <p className="mt-1 text-xs text-muted-foreground">Click &quot;Create New Blog Post&quot; to publish your first post.</p>
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
                <div className="flex items-start gap-4 flex-1">
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
                      disabled={idx === blogs.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move down"
                    >
                      <MoveDown className="size-3.5" />
                    </button>
                  </div>

                  {/* Cover thumbnail */}
                  <div className="size-20 shrink-0 rounded-xl border border-border bg-surface flex items-center justify-center overflow-hidden shadow-sm relative">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="size-6 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] text-brand">/blog/{item.slug}</span>
                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                          <Sparkles className="size-3" /> Featured
                        </span>
                      )}
                      {item.isActive === false && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-semibold text-foreground text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      {item.excerpt || item.description || "No excerpt added."}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {item.datePublished}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {item.readTime || "5 min read"}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="size-3" />
                        {item.author}
                      </span>
                      {Array.isArray(item.sections) && (
                        <span className="flex items-center gap-1">
                          <FileText className="size-3" />
                          {item.sections.length} sections
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/blog/${item.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="View live post"
                  >
                    <ExternalLink className="size-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title={item.isActive === false ? "Publish" : "Unpublish / Hide"}
                  >
                    {item.isActive === false ? <EyeOff className="size-4" /> : <Eye className="size-4 text-brand" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="Edit article"
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
    </div>
  );
}
