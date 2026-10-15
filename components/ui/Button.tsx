import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent/85 border border-transparent",
  secondary: "bg-surface text-ink border border-line hover:border-ink/40",
  ghost: "text-ink hover:bg-ink/5 border border-transparent",
  light: "bg-surface text-ink border border-transparent hover:bg-surface/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm md:text-base",
  lg: "h-12 px-6 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-200 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClass({ variant = "primary", size = "md", className }: Omit<CommonProps, "children">) {
  return cn(baseClass, variants[variant], sizes[size], className);
}

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

export function ButtonLink({ variant, size, className, children, href, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

type NativeButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className">;

export function Button({ variant, size, className, children, type = "button", ...rest }: NativeButtonProps) {
  return (
    <button type={type} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
