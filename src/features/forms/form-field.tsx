import { cn } from "@/shared/lib/cn";

const inputClassName =
  "h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-brand/40 focus:ring-2 focus:ring-brand/20 disabled:opacity-50";

const labelClassName = "mb-1.5 block text-sm font-medium text-foreground";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-0", className)}>
      <label htmlFor={id} className={labelClassName}>
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function formInputClassName(className?: string) {
  return cn(inputClassName, className);
}

export const formSelectClassName = inputClassName;

export const formTextareaClassName = cn(
  inputClassName,
  "min-h-[120px] resize-y py-3",
);
