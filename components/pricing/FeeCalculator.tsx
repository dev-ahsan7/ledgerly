"use client";

import { useId, useMemo, useState } from "react";
import { calculator, plans } from "@/lib/plans";
import { cn, money } from "@/lib/format";
import { ReceiptCard, ReceiptDivider } from "@/components/ui/ReceiptCard";
import { LineItem } from "@/components/ui/LineItem";

export function FeeCalculator() {
  const id = useId();
  const [raw, setRaw] = useState(String(calculator.defaultAmount));
  const [currency, setCurrency] = useState(calculator.currencies[0]);

  const amount = Math.max(0, Number(raw.replace(/[^0-9.]/g, "")) || 0);

  const rows = useMemo(
    () =>
      plans.map((p) => {
        const fx = Math.round(amount * p.fxFee) / 100;
        return { plan: p, fx, total: p.monthly + fx };
      }),
    [amount],
  );
  const cheapest = rows.reduce((best, r) => (r.total < best.total ? r : best), rows[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <div className="card p-6 md:p-8">
        <label htmlFor={`${id}-amount`} className="text-sm font-medium">
          {calculator.amountLabel}
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id={`${id}-amount`}
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="input font-mono tabular"
            aria-describedby={`${id}-note`}
          />
          <label htmlFor={`${id}-currency`} className="sr-only">
            {calculator.currencyLabel}
          </label>
          <select
            id={`${id}-currency`}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="input w-auto font-mono"
          >
            {calculator.currencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <p id={`${id}-note`} className="mt-4 text-xs text-muted">
          {calculator.note}
        </p>
      </div>

      <ul className="grid gap-4 md:grid-cols-3" aria-live="polite">
        {rows.map((r) => {
          const best = r.plan.id === cheapest.plan.id && amount > 0;
          return (
            <li key={r.plan.id}>
              <ReceiptCard innerClassName={cn("p-5 md:p-6", best && "ring-2 ring-inset ring-ink")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{r.plan.name}</h3>
                  {best && <span className="rounded-pill bg-accent px-2 py-0.5 text-xs text-accent-ink">{calculator.best}</span>}
                </div>
                <ReceiptDivider className="my-4" />
                <div className="space-y-2">
                  <LineItem label={calculator.rows.plan} value={money(r.plan.monthly, currency, true)} className="!text-sm" />
                  <LineItem
                    label={`${calculator.rows.fx} (${r.plan.fxFee}%)`}
                    value={money(r.fx, currency, true)}
                    className="!text-sm"
                  />
                </div>
                <ReceiptDivider className="my-4" />
                <LineItem strong label={calculator.rows.total} value={money(r.total, currency, true)} className="!text-base" />
              </ReceiptCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
