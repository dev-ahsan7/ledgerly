"use client";

import { useState, type ReactNode } from "react";
import { everyPlan, plans, type BillingPeriod } from "@/lib/plans";
import { PlanCard } from "@/components/ui/PlanCard";
import { PricingToggle } from "@/components/ui/PricingToggle";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

type Props = {
  className?: string;
  /** With a header, the toggle sits to its right; without, the toggle is centered. */
  header?: ReactNode;
  /** Extra content at the end of the "every plan" strip, e.g. a compare link. */
  footer?: ReactNode;
};

/** Billing toggle, the three plan cards and the "every plan includes" strip. Used on / and /pricing. */
export function PricingPlans({ className, header, footer }: Props) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  return (
    <div className={className}>
      <div className={cn("flex", header ? "flex-col gap-6 md:flex-row md:items-end md:justify-between" : "justify-center")}>
        {header}
        <Reveal delay={0.05} className="shrink-0">
          <PricingToggle value={period} onChange={setPeriod} />
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {plans.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 0.08} className="h-full">
              <PlanCard plan={p} period={period} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="mt-5 flex flex-col gap-4 rounded-lg border border-line px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{everyPlan.label}</p>
            <ul className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-5">
              {everyPlan.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <CheckIcon width={16} height={16} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          {footer}
        </div>
      </Reveal>
    </div>
  );
}
