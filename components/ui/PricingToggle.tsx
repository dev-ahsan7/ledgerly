"use client";

import type { BillingPeriod } from "@/lib/plans";
import { pricingCopy } from "@/lib/plans";
import { cn } from "@/lib/format";

type Props = { value: BillingPeriod; onChange: (v: BillingPeriod) => void; className?: string };

export function PricingToggle({ value, onChange, className }: Props) {
  const options: { id: BillingPeriod; label: string; note?: string }[] = [
    { id: "monthly", label: pricingCopy.monthly },
    { id: "yearly", label: pricingCopy.yearly, note: pricingCopy.yearlyNote },
  ];

  return (
    <div role="group" aria-label={pricingCopy.toggleLabel} className={cn("inline-flex rounded-pill border border-line bg-surface p-1", className)}>
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-pill px-4 text-sm font-medium transition-colors md:px-5",
              active ? "bg-accent text-accent-ink" : "text-muted hover:text-ink",
            )}
          >
            {o.label}
            {o.note && (
              <span className={cn("rounded-pill px-2 py-0.5 text-xs", active ? "bg-accent-ink/15" : "bg-surface-2 text-ink")}>
                {o.note}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
