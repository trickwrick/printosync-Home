import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { getAllBlogPosts } from "@/shared/lib/seo/blog-posts";
import { Container } from "@/shared/ui/container";
import { Heading, Text } from "@/shared/ui/typography";

export const metadata: Metadata = generatePageMetadata("blog");

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <MarketingPage pageKey="blog" showPlaceholder={false}>
      <Container className="pb-16">
        <section aria-label="Blog articles">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-brand/30 hover:shadow-md">
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
                  <Heading level="h2" className="mt-3 text-lg text-foreground group-hover:text-brand">
                    <Link href={post.path} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </Heading>
                  <Text variant="muted" className="mt-2 flex-1 text-sm">
                    {post.excerpt}
                  </Text>
                  <Link
                    href={post.path}
                    className="relative z-10 mt-4 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                  >
                    Read article →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </MarketingPage>
  );
}
