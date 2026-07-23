import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const containerVariants = cva("mx-auto w-full container-padding", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-[1400px]",
      full: "max-w-full",
      prose: "max-w-prose",
    },
  },
  defaultVariants: {
    size: "2xl",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  ),
);
Container.displayName = "Container";

export { Container, containerVariants };
