"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  Share2,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Laptop,
} from "lucide-react";
import type { LiveBlogPost } from "@/shared/lib/models/get-live-blogs";

interface BlogPostContentProps {
  post: LiveBlogPost;
  recentPosts: LiveBlogPost[];
  allCategories: { name: string; count: number }[];
}

export function BlogPostContent({
  post,
  recentPosts,
  allCategories,
}: BlogPostContentProps) {
  // Accordion states for sidebar widgets (like reference: Recent Posts, Software Modules, Categories)
  const [recentOpen, setRecentOpen] = useState(true);
  const [ctaCardOpen, setCtaCardOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  // FAQ accordion open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formattedDate = post.datePublished
    ? (() => {
        try {
          const d = new Date(post.datePublished);
          if (isNaN(d.getTime())) return post.datePublished;
          return d.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });
        } catch {
          return post.datePublished;
        }
      })()
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* ============================================================ */}
      {/* LEFT COLUMN: Main Blog Post Content (8 cols on lg)           */}
      {/* ============================================================ */}
      <article className="lg:col-span-8 bg-card rounded-2xl border border-border p-6 sm:p-8 lg:p-10 shadow-xs">
        {/* Category & Date Header Line (Reference format: Category on left, Date on right) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              <Tag className="size-3" />
              {post.category || "Printing Press ERP"}
            </span>
            {post.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600">
                <Sparkles className="size-3" />
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            {formattedDate && (
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="size-3.5 text-muted-foreground" />
                <time dateTime={post.datePublished}>{formattedDate}</time>
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-muted-foreground" />
                {post.readTime}
              </span>
            )}
            {post.author && (
              <span className="hidden sm:flex items-center gap-1.5 font-medium">
                <User className="size-3.5 text-muted-foreground" />
                {post.author}
              </span>
            )}
          </div>
        </div>

        {/* Blog Title */}
        <h1 className="mt-5 font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-foreground leading-[1.25]">
          {post.title}
        </h1>

        {/* Featured Cover Image (Directly below Title as in reference image) */}
        {post.coverImage && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Lead Summary / Excerpt */}
        {post.excerpt && (
          <div className="mt-6 rounded-xl border-l-4 border-brand bg-brand/5 p-4 sm:p-5">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-medium italic">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Content Body Sections or Rich Text HTML */}
        <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed text-sm sm:text-base">
          {post.contentHtml ? (
            <div
              className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 leading-relaxed [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:my-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-brand [&>blockquote]:pl-4 [&>blockquote]:italic"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : post.sections && post.sections.length > 0 ? (
            post.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3.5">
                {sec.heading && (
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground pt-3 border-t border-border/40 first:border-0 first:pt-0">
                    {sec.heading}
                  </h2>
                )}
                {Array.isArray(sec.paragraphs) &&
                  sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed whitespace-pre-line"
                    >
                      {p}
                    </p>
                  ))}
              </section>
            ))
          ) : post.description ? (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.description}
            </p>
          ) : null}
        </div>

        {/* Article FAQs Accordion Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="size-5 text-brand" />
              <h2 className="font-display text-xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Clear answers to the most common queries related to this topic.
            </p>

            <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-background/50 overflow-hidden">
              {post.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div key={fIdx} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-foreground hover:bg-muted/40 transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-3 ${
                          isOpen ? "rotate-180 text-brand" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/40 bg-muted/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Tags Pills at Footer */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-1">
              Tags:
            </span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-surface border border-border px-3 py-1 text-xs font-medium text-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand hover:underline"
          >
            ← Back to All Articles
          </Link>
          <button
            type="button"
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Article link copied to clipboard!");
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Share2 className="size-3.5" />
            Share
          </button>
        </div>
      </article>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: Sidebar (4 cols on lg) matching reference site */}
      {/* ============================================================ */}
      <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
        {/* 1. Recent Posts Accordion Card */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setRecentOpen(!recentOpen)}
            className="flex w-full items-center justify-between p-4 bg-surface border-b border-border text-left"
          >
            <span className="text-sm font-bold text-foreground">Recent Posts</span>
            {recentOpen ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </button>

          {recentOpen && (
            <div className="p-4 space-y-3.5 divide-y divide-border/60">
              {recentPosts.length > 0 ? (
                recentPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={rPost.path || `/blog/${rPost.slug}`}
                    className="flex gap-3 group pt-3.5 first:pt-0 items-start"
                  >
                    {rPost.coverImage ? (
                      <div className="relative size-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted">
                        <Image
                          src={rPost.coverImage}
                          alt={rPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="64px"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="size-16 shrink-0 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold text-xs">
                        <BookOpen className="size-6 text-brand" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-foreground line-clamp-2 group-hover:text-brand transition-colors leading-snug">
                        {rPost.title}
                      </h3>
                      {rPost.datePublished && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {rPost.datePublished}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-muted-foreground py-2">No other posts yet.</p>
              )}
            </div>
          )}
        </div>

        {/* 2. Featured Software Demo / ERP Product Card (like Course card in reference) */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setCtaCardOpen(!ctaCardOpen)}
            className="flex w-full items-center justify-between p-4 bg-surface border-b border-border text-left"
          >
            <span className="text-sm font-bold text-foreground">PrintoSync ERP</span>
            {ctaCardOpen ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </button>

          {ctaCardOpen && (
            <div className="p-5 space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-linear-to-br from-brand/90 to-brand/60 flex flex-col justify-end p-4 text-brand-foreground shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit">
                  Live Software
                </span>
                <h4 className="mt-2 text-base font-bold leading-tight text-white drop-shadow-xs">
                  All-in-One Printing Press ERP &amp; MIS
                </h4>
                <p className="text-[11px] text-white/90 mt-1 line-clamp-2">
                  Automate estimates, job cards, inventory, GST billing &amp; machine dispatch.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/book-demo"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-4 text-xs font-bold text-brand-foreground shadow-sm hover:opacity-90 transition"
                >
                  <Laptop className="size-3.5" />
                  <span>Book Free Live Demo</span>
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-2 px-4 text-xs font-semibold text-foreground hover:bg-muted/50 transition"
                >
                  <PhoneCall className="size-3.5 text-brand" />
                  <span>Talk to ERP Specialist</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 3. Categories Accordion Card */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="flex w-full items-center justify-between p-4 bg-surface border-b border-border text-left"
          >
            <span className="text-sm font-bold text-foreground">Categories</span>
            {categoriesOpen ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </button>

          {categoriesOpen && (
            <div className="p-4 space-y-1.5">
              {allCategories.length > 0 ? (
                allCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/blog?category=${encodeURIComponent(cat.name)}`}
                    className="flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface transition"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      {cat.count}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="space-y-1">
                  <span className="block text-xs text-muted-foreground px-2 py-1">
                    Printing Industry
                  </span>
                  <span className="block text-xs text-muted-foreground px-2 py-1">
                    ERP &amp; Management
                  </span>
                  <span className="block text-xs text-muted-foreground px-2 py-1">
                    Press Automation
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

