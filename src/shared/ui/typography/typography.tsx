import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const headingVariants = cva("font-display font-bold tracking-tight text-balance", {
  variants: {
    level: {
      h1: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]",
      h2: "text-3xl sm:text-4xl lg:text-5xl leading-[1.15]",
      h3: "text-2xl sm:text-3xl lg:text-4xl leading-[1.2]",
      h4: "text-xl sm:text-2xl leading-[1.25]",
      h5: "text-lg sm:text-xl leading-[1.3]",
      h6: "text-base sm:text-lg leading-[1.35]",
    },
    gradient: {
      none: "",
      default: "gradient-text",
      brand: "gradient-text-brand",
    },
  },
  defaultVariants: {
    level: "h2",
    gradient: "none",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", gradient, as, ...props }, ref) => {
    const Tag = as ?? level ?? "h2";
    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level, gradient, className }))}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

const textVariants = cva("", {
  variants: {
    variant: {
      body: "text-base leading-relaxed text-foreground",
      lead: "text-lg sm:text-xl leading-relaxed text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      small: "text-xs text-muted-foreground",
      label: "text-sm font-medium leading-none",
      code: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label";
}

function Text({
  className,
  variant,
  as: Component = "p",
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, className }))}
      {...props}
    />
  );
}
Text.displayName = "Text";

export { Heading, Text, headingVariants, textVariants };
