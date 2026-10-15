import { ButtonLink } from "./Button";
import { CheckIcon } from "./Icons";
import { priceFor, pricingCopy, type BillingPeriod, type Plan } from "@/lib/plans";
import { cn } from "@/lib/format";

type Props = { plan: Plan; period: BillingPeriod };

const fmt = (n: number) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);

/**
 * Plan card, top to bottom: name and audience, price, button (aligned across cards),
 * three key numbers as receipt rows, then what this tier adds.
 */
export function PlanCard({ plan, period }: Props) {
  const { perMonth, yearlyTotal } = priceFor(plan, period);
  const featured = plan.featured;
  const isFree = plan.monthly === 0;
  const yearly = period === "yearly" && !isFree;
  const billing = isFree ? pricingCopy.free : yearly ? pricingCopy.billedYearly(yearlyTotal) : pricingCopy.billedMonthly;
  const muted = featured ? "text-inverse-muted" : "text-muted";
  const rule = featured ? "border-inverse-ink/15" : "border-line";

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex h-full flex-col rounded-lg border",
        featured ? "border-inverse bg-inverse text-inverse-ink shadow-float" : "border-line bg-surface",
      )}
    >
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 id={`plan-${plan.id}`} className="text-lg font-semibold">
            {plan.name}
          </h3>
          {plan.badge && (
            <span className={cn("rounded-pill px-2.5 py-1 text-xs font-medium", featured ? "bg-inverse-ink text-inverse" : "bg-surface-2")}>
              {plan.badge}
            </span>
          )}
        </div>
        <p className={cn("mt-1.5 text-sm", muted)}>{plan.blurb}</p>

        <div className="mt-7 flex items-baseline gap-2">
          <span className="font-display text-5xl font-heading tracking-tight tabular">{fmt(perMonth)}</span>
          {yearly && <span className={cn("text-lg line-through decoration-1 tabular", muted)}>{fmt(plan.monthly)}</span>}
          <span className={cn("text-sm", muted)}>{pricingCopy.perMonth}</span>
        </div>
        <p className={cn("mt-1.5 flex h-6 flex-wrap items-center gap-2 text-sm", muted)}>
          {billing}
          {yearly && (
            <span className={cn("rounded-sm px-1.5 py-0.5 text-xs font-medium", featured ? "bg-inverse-ink/15 text-inverse-ink" : "bg-surface-2 text-ink")}>
              {pricingCopy.save(plan.monthly * 2)}
            </span>
          )}
        </p>

        <ButtonLink href={plan.cta.href} variant={featured ? "light" : "primary"} className="mt-6 w-full">
          {plan.cta.label}
          <span className="sr-only"> on the {plan.name} plan</span>
        </ButtonLink>
      </div>

      {/* Key numbers, receipt style. */}
      <dl className={cn("space-y-2.5 border-y border-dashed px-6 py-5 text-sm md:px-7", rule)}>
        {plan.keys.map((k) => (
          <div key={k.label} className="flex items-end">
            <dt className={muted}>{k.label}</dt>
            <span aria-hidden className={cn("leader", featured && "border-inverse-ink/20")} />
            <dd className="font-mono tabular">{k.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex-1 p-6 md:p-7">
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.12em]", muted)}>{plan.includesLabel}</p>
        <ul className="mt-4 space-y-3 text-sm">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3">
              <CheckIcon width={18} height={18} className="mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
