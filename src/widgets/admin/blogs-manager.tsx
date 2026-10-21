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
  X,
  ExternalLink,
  Search,
  Calendar,
  Clock,
  User,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
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
  order: number;
  isActive: boolean;
}

export function BlogsManager() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [author, setAuthor] = useState("PrintoSync Team");
  const [readTime, setReadTime] = useState("6 min read");
  const [datePublished, setDatePublished] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [sections, setSections] = useState<BlogSection[]>([]);
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
    setDescription("");
    setExcerpt("");
    setCoverImage("");
    setImageAlt("");
    setAuthor("PrintoSync Team");
    setReadTime("6 min read");
    setDatePublished(today);
    setKeywordsInput("");
    setSections([
      {
        heading: "Introduction",
        paragraphs: ["Write introductory paragraphs here..."],
      },
    ]);
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: BlogItem) => {
    setEditingBlog(item);
    setIsNew(false);
    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description || "");
    setExcerpt(item.excerpt || "");
    setCoverImage(item.coverImage || "");
    setImageAlt(item.imageAlt || "");
    setAuthor(item.author || "PrintoSync Team");
    setReadTime(item.readTime || "5 min read");
    setDatePublished(item.datePublished || new Date().toISOString().split("T")[0]);
    setKeywordsInput((item.keywords || []).join(", "));
    setSections(Array.isArray(item.sections) && item.sections.length > 0 ? item.sections : []);
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
        description: description.trim(),
        excerpt: excerpt.trim(),
        coverImage: coverImage.trim(),
        imageAlt: imageAlt.trim() || title.trim(),
        author: author.trim() || "PrintoSync Team",
        readTime: readTime.trim() || "5 min read",
        datePublished: datePublished || new Date().toISOString().split("T")[0],
        keywords,
        sections,
        isActive,
      };

      if (editingBlog?._id) {
        payload._id = editingBlog._id;
        payload.order = editingBlog.order;
      }

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: payload }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("saved");
        setMessage(isNew ? "Blog article published successfully!" : "Blog updated successfully!");
        setModalOpen(false);
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
            Write, edit, and publish blog articles with custom images, sections, and SEO tags.
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
            Write New Article
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
            <p className="mt-1 text-xs text-muted-foreground">Click &quot;Write New Article&quot; to publish your first post.</p>
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
                        width={80}
                        height={80}
                        className="size-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground/50 text-[10px]">
                        <ImageIcon className="size-6 mb-1" />
                        <span>No cover</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-foreground hover:text-brand transition truncate">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        /blog/{item.slug}
                      </span>
                      {item.isActive === false && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Draft / Hidden
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.excerpt || item.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3 text-brand" /> {item.datePublished}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3 text-brand" /> {item.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <User className="size-3 text-brand" /> {item.author}
                      </span>
                      <span>• {item.sections?.length || 0} sections</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:self-center self-end shrink-0">
                  <Link
                    href={`/blog/${item.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="View live article"
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

      {/* Add / Edit Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8 rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4 sticky top-0 bg-card z-10">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-brand" />
                <h3 className="text-base font-bold text-foreground">
                  {isNew ? "Create New Blog Article" : `Edit Article: ${title}`}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="mt-5 space-y-5">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Ways to Reduce Waste in Your Print Shop"
                    value={title}
                    onChange={(e) => {
                      const t = e.target.value;
                      setTitle(t);
                      if (isNew) {
                        setSlug(t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                      }
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
                    placeholder="e.g. reduce-waste-print-shop"
                    value={slug}
                    onChange={(e) =>
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                    }
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-mono text-foreground outline-none transition focus:ring-1 focus:ring-brand disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Cover Image Upload (From PC or URL) */}
              <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                  Featured / Cover Image
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Image Preview Box */}
                  <div className="size-24 shrink-0 rounded-xl border border-border bg-surface flex items-center justify-center overflow-hidden shadow-inner relative">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={imageAlt || "Cover image preview"}
                        width={96}
                        height={96}
                        className="size-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="size-8 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="blog-cover-upload"
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      <label
                        htmlFor="blog-cover-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition shadow-xs"
                      >
                        <Upload className="size-3.5 text-brand" />
                        {uploading ? "Uploading from PC..." : "Upload from Computer"}
                      </label>
                      {coverImage && (
                        <button
                          type="button"
                          onClick={() => setCoverImage("")}
                          className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                    {coverImage && (
                      <p className="text-[11px] font-mono text-muted-foreground truncate max-w-md">
                        {coverImage}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                    Image Alt Description (SEO)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Modern printing machine operators reducing substrate waste"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Excerpt & Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Card Short Excerpt * (Appears on /blog listing)
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Short 1-2 sentence teaser for cards..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Detailed Meta Description (For Google search snippet)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Comprehensive SEO summary..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Metadata: Author, Read Time, Date, Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6 min read"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  SEO Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="print shop erp, reduce waste, printing cost control"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* Article Content Sections */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                    Article Headings &amp; Paragraphs ({sections.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                  >
                    <Plus className="size-3.5" /> Add New Section
                  </button>
                </div>

                {sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="rounded-xl border border-border bg-muted/20 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs font-mono font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                          H2
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="Section Heading (e.g. Core tactics to reduce paper waste)"
                          value={section.heading}
                          onChange={(e) => handleSectionHeadingChange(sIdx, e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(sIdx)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        title="Remove section"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                        Paragraphs (Separate paragraphs with double newlines / Enter key twice)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Write paragraph text here... Press Enter twice for the next paragraph."
                        value={section.paragraphs.join("\n\n")}
                        onChange={(e) => handleSectionParagraphsChange(sIdx, e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-xs leading-relaxed text-foreground outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="blog-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-border text-brand focus:ring-brand"
                />
                <label htmlFor="blog-active" className="text-xs font-medium text-foreground cursor-pointer">
                  Publish article live on website (/blog)
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
                  disabled={uploading || status === "saving"}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  {isNew ? "Publish Article" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
