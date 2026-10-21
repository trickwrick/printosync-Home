import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  articleSchema,
  breadcrumbSchema,
  createMetadata,
  webPageSchema,
} from "@/shared/lib/seo";
import { getLiveBlogPostBySlug } from "@/shared/lib/models/get-live-blogs";
import { JsonLd, Breadcrumbs, RelatedLinks } from "@/shared/ui/seo";
import { Container } from "@/shared/ui/container";
import { Heading, Text } from "@/shared/ui/typography";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getLiveBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return createMetadata({
    title: post.title,
    description: post.description,
    path: post.path,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified || post.datePublished,
    keywords: post.keywords,
    image: post.coverImage || undefined,
    imageAlt: post.imageAlt || post.title,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getLiveBlogPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: post.path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            title: post.title,
            description: post.description,
            path: post.path,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            author: post.author,
          }),
          webPageSchema({
            title: post.title,
            description: post.description,
            path: post.path,
          }),
        ]}
      />
      <article itemScope itemType="https://schema.org/Article">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>

        <header className="py-8 md:py-12">
          <Container className="max-w-3xl">
            <Text variant="muted" className="text-sm">
              <time dateTime={post.datePublished}>
                {new Date(post.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {" · "}
              {post.readTime}
              {" · "}
              <span itemProp="author">{post.author}</span>
            </Text>
            <Heading level="h1" className="mt-4 text-foreground" itemProp="headline">
              {post.title}
            </Heading>
            <Text variant="lead" className="mt-4 text-muted-foreground" itemProp="description">
              {post.description}
            </Text>

            {post.coverImage && (
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
                <Image
                  src={post.coverImage}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  unoptimized
                />
              </div>
            )}
          </Container>
        </header>

        <div className="pb-12">
          <Container className="max-w-3xl">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <Heading level="h2" className="text-2xl text-foreground">
                  {section.heading}
                </Heading>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <nav aria-label="Blog post navigation" className="mt-12 border-t border-border pt-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
              >
                ← Back to all articles
              </Link>
            </nav>
          </Container>
        </div>

        <Container>
          <RelatedLinks path={post.path} />
        </Container>
      </article>
    </>
  );
}
