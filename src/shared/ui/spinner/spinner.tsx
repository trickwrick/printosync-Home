import { cn } from "@/shared/lib/cn";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  label?: string;
}

const sizeMap = {
  sm: "size-4",
  default: "size-6",
  lg: "size-10",
} as const;

function Spinner({ className, size = "default", label = "Loading" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <Loader2
        className={cn("animate-spin text-brand", sizeMap[size])}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner };
