import { Container } from "@/shared/ui/container";
import { Heading, Text } from "@/shared/ui/typography";
import { cn } from "@/shared/lib/cn";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  centered?: boolean;
}

export function PageHeader({
  title,
  description,
  badge,
  className,
  centered = true,
}: PageHeaderProps) {
  return (
    <Container
      className={cn(
        "py-16 md:py-20 lg:py-24",
        centered && "text-center",
        className,
      )}
    >
      {badge && (
        <span className="mb-4 inline-flex items-center rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
          {badge}
        </span>
      )}
      <Heading level="h1" className={cn(centered && "mx-auto max-w-4xl")}>
        {title}
      </Heading>
      {description && (
        <Text
          variant="lead"
          className={cn("mt-4", centered && "mx-auto max-w-2xl")}
        >
          {description}
        </Text>
      )}
    </Container>
  );
}

interface PagePlaceholderProps {
  title: string;
  description?: string;
  badge?: string;
}

export function PagePlaceholder({
  title,
  description = "Page content coming soon.",
  badge = "Architecture Ready",
}: PagePlaceholderProps) {
  return (
    <div className="flex min-h-[50vh] flex-col">
      <PageHeader title={title} description={description} badge={badge} />
      <Container className="pb-24">
        <div className="rounded-xl border border-dashed border-border bg-surface/50 p-12 text-center">
          <Text variant="muted">
            This route is scaffolded. Build page content in the corresponding
            page module.
          </Text>
        </div>
      </Container>
    </div>
  );
}
