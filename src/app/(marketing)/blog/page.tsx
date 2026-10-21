import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { getLiveBlogPosts } from "@/shared/lib/models/get-live-blogs";
import { Container } from "@/shared/ui/container";
import { Heading, Text } from "@/shared/ui/typography";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generatePageMetadata("blog");

export default async function BlogPage() {
  const posts = await getLiveBlogPosts();

  return (
    <MarketingPage pageKey="blog" showPlaceholder={false}>
      <Container className="pb-16">
        <section aria-label="Blog articles">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-premium">
                  {post.coverImage ? (
                    <div className="relative aspect-video w-full overflow-hidden bg-surface">
                      <Image
                        src={post.coverImage}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-6">
                    <Text variant="muted" className="text-xs">
                      <time dateTime={post.datePublished}>
                        {new Date(post.datePublished).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {" · "}
                      {post.readTime}
                    </Text>
                    <Heading level="h2" className="mt-3 text-lg font-bold text-foreground group-hover:text-brand">
                      <Link href={post.path} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </Heading>
                    <Text variant="muted" className="mt-2 flex-1 text-sm leading-relaxed">
                      {post.excerpt}
                    </Text>
                    <span className="relative z-10 mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors group-hover:text-brand/80">
                      Read article →
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </MarketingPage>
  );
}
