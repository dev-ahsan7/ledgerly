import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Props = {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  strong?: boolean;
  className?: string;
  mono?: boolean;
};

/** Receipt row: label · dotted leader · right-aligned amount. */
export function LineItem({ label, value, hint, strong, className, mono = true }: Props) {
  return (
    <div className={cn("flex items-end", strong ? "text-base font-semibold md:text-lg" : "text-sm md:text-base", className)}>
      <span className="min-w-0 shrink">
        <span className="block">{label}</span>
        {hint && <span className="block text-xs font-normal text-muted">{hint}</span>}
      </span>
      <span aria-hidden className="leader" />
      <span className={cn("shrink-0 text-right tabular", mono && "font-mono")}>{value}</span>
    </div>
  );
}
