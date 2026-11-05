import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  articleSchema,
  breadcrumbSchema,
  createMetadata,
  webPageSchema,
} from "@/shared/lib/seo";
import {
  getLiveBlogPostBySlug,
  getLiveBlogPosts,
} from "@/shared/lib/models/get-live-blogs";
import { JsonLd, Breadcrumbs, RelatedLinks } from "@/shared/ui/seo";
import { Container } from "@/shared/ui/container";
import { BlogPostContent } from "@/widgets/blog/blog-post-content";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getLiveBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

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
  const [post, allPosts] = await Promise.all([
    getLiveBlogPostBySlug(slug),
    getLiveBlogPosts(),
  ]);

  if (!post) notFound();

  // Recent posts excluding current post
  const recentPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 5);

  // Group categories with counts
  const catCountMap = new Map<string, number>();
  for (const p of allPosts) {
    const c = p.category || "Printing Press ERP";
    catCountMap.set(c, (catCountMap.get(c) || 0) + 1);
  }
  const allCategories = Array.from(catCountMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));

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

      <div className="bg-surface/50 py-6 sm:py-8 lg:py-10 border-b border-border/60">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </div>

      <main className="py-8 sm:py-12 bg-background">
        <Container>
          <BlogPostContent
            post={post}
            recentPosts={recentPosts}
            allCategories={allCategories}
          />
        </Container>
      </main>

      <div className="border-t border-border bg-surface/30 py-12">
        <Container>
          <RelatedLinks path={post.path} />
        </Container>
      </div>
    </>
  );
}
