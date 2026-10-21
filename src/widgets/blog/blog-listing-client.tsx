"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, User, BookOpen } from "lucide-react";
import type { LiveBlogPost } from "@/shared/lib/models/get-live-blogs";

interface BlogListingClientProps {
  posts: LiveBlogPost[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase().trim();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (Array.isArray(p.keywords) &&
          p.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  }, [posts, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Top Search Bar (Matching Reference Layout) */}
      <div className="flex justify-center">
        <div className="relative flex w-full max-w-xl items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
          <input
            type="text"
            placeholder="Search Blog"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            type="button"
            aria-label="Search"
            className="flex h-full items-center justify-center bg-brand px-5 py-3 text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Search className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Grid of Blog Cards */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <BookOpen className="mx-auto mb-3 size-10 text-muted-foreground/40" />
          <h3 className="text-base font-semibold text-foreground">
            No articles found matching &quot;{searchQuery}&quot;
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Try searching for other topics like &quot;CRM&quot;, &quot;ERP&quot;, &quot;Waste&quot;, or clear the search.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 inline-flex items-center rounded-xl bg-brand/10 px-4 py-2 text-xs font-semibold text-brand hover:bg-brand/20 transition"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const formattedDate = formatDate(post.datePublished);
            const authorName = post.author || "PrintoSync";

            return (
              <li key={post.slug} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md">
                  {/* Thumbnail / Cover Image */}
                  <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl bg-muted">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-brand/10 via-surface to-muted p-4 text-center">
                        <BookOpen className="size-10 text-brand/40 mb-2" />
                        <span className="font-display text-xs font-bold text-foreground/80 line-clamp-2">
                          {post.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Meta Bar: Author & Date (Matching reference design) */}
                  <div className="mt-3 flex items-center gap-3.5 px-1 text-xs font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <User className="size-3.5 shrink-0 text-foreground/70" />
                      <span className="truncate">{authorName}</span>
                    </span>
                    {formattedDate && (
                      <span className="inline-flex items-center gap-1.5 shrink-0">
                        <Calendar className="size-3.5 text-foreground/70" />
                        <time dateTime={post.datePublished}>{formattedDate}</time>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="mt-2.5 px-1 flex-1">
                    <h2 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-brand line-clamp-2">
                      <Link href={post.path} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
