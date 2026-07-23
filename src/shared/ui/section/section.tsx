import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/container";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "section-padding py-12 md:py-16",
      default: "section-padding",
      lg: "section-padding py-24 md:py-32",
    },
    background: {
      default: "bg-background",
      muted: "bg-surface",
      elevated: "bg-surface-elevated",
      brand: "bg-brand-muted",
    },
  },
  defaultVariants: {
    spacing: "default",
    background: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  containerSize?: React.ComponentProps<typeof Container>["size"];
  containerClassName?: string;
  contained?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing,
      background,
      containerSize,
      containerClassName,
      contained = true,
      children,
      ...props
    },
    ref,
  ) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, background, className }))}
      {...props}
    >
      {contained ? (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  ),
);
Section.displayName = "Section";

export { Section, sectionVariants };
