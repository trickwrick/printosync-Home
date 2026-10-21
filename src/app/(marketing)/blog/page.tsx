import type { Metadata } from "next";
import { MarketingPage, generatePageMetadata } from "@/widgets/page-shell";
import { getLiveBlogPosts } from "@/shared/lib/models/get-live-blogs";
import { Container } from "@/shared/ui/container";
import { BlogListingClient } from "@/widgets/blog/blog-listing-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generatePageMetadata("blog");

export default async function BlogPage() {
  const posts = await getLiveBlogPosts();

  return (
    <MarketingPage pageKey="blog" showPlaceholder={false}>
      <Container className="pb-20 pt-4">
        <section aria-label="Blog articles and search">
          <BlogListingClient posts={posts} />
        </section>
      </Container>
    </MarketingPage>
  );
}
