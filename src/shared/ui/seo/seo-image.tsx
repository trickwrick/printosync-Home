import Image, { type ImageProps } from "next/image";
import { cn } from "@/shared/lib/cn";

interface SeoImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  /** Required for SEO — describe the image content */
  title?: string;
  priority?: boolean;
}

/**
 * SEO-optimized image wrapper with required alt text and next/image defaults.
 */
export function SeoImage({
  alt,
  title,
  className,
  priority = false,
  loading,
  ...props
}: SeoImageProps) {
  return (
    <Image
      alt={alt}
      title={title ?? alt}
      className={cn(className)}
      priority={priority}
      loading={priority ? undefined : (loading ?? "lazy")}
      {...props}
    />
  );
}
