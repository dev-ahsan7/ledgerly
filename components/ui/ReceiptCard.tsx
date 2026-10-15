import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Zigzag bottom edge, like a torn till receipt. */
  perforated?: boolean;
  as?: "div" | "article" | "section";
} & React.HTMLAttributes<HTMLElement>;

/**
 * Receipt-style card. The outer element carries the drop shadow (so it follows
 * the zigzag mask), the inner element is masked.
 */
export function ReceiptCard({ children, className, innerClassName, perforated = true, as: Tag = "div", ...rest }: Props) {
  return (
    <Tag className={cn("[filter:drop-shadow(0_1px_1px_rgb(0_0_0/0.06))_drop-shadow(0_14px_24px_rgb(0_0_0/0.10))]", className)} {...rest}>
      <div className={cn("relative rounded-t-lg bg-surface p-6 md:p-8", perforated ? "zigzag-bottom" : "rounded-b-lg", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

/** Dashed tear line with side notches, used inside receipts. */
export function ReceiptDivider({ className }: { className?: string }) {
  return <div role="presentation" className={cn("my-5 border-t-2 border-dashed border-line", className)} />;
}
