"use client";

import { useId, useMemo, useRef, useState } from "react";
import { split as defaults } from "@/lib/site";
import { money, cn } from "@/lib/format";
import { ReceiptCard, ReceiptDivider } from "@/components/ui/ReceiptCard";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

export type SplitRule = { label: string; percent: number; hint?: string };

type Props = {
  defaultAmount?: number;
  splits?: SplitRule[];
  currencies?: string[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const potTone = ["bg-pot-1", "bg-pot-2", "bg-pot-3", "bg-ink/40", "bg-ink/20"];
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Force a list of percentages to whole numbers that add up to exactly 100. */
function normalise(values: number[]): number[] {
  if (values.length === 0) return [];
  const sum = values.reduce((a, b) => a + b, 0);
  const scaled = sum === 0 ? values.map(() => 100 / values.length) : values.map((v) => (v / sum) * 100);
  const floored = scaled.map(Math.floor);
  let rest = 100 - floored.reduce((a, b) => a + b, 0);
  // Hand out the remainder to the largest fractional parts.
  const order = scaled.map((v, i) => ({ i, frac: v - Math.floor(v) })).sort((a, b) => b.frac - a.frac);
  for (const { i } of order) {
    if (rest <= 0) break;
    floored[i] += 1;
    rest -= 1;
  }
  return floored;
}

/**
 * Set one percentage and rebalance the others proportionally so the total stays 100.
 * `base` is the state before the edit began, so typing "45" doesn't compound rounding.
 */
function rebalance(base: number[], index: number, next: number): number[] {
  if (base.length === 1) return [100];
  const v = clamp(Math.round(next), 0, 100);
  const remaining = 100 - v;
  const others = base.map((x, i) => (i === index ? 0 : x));
  const othersSum = others.reduce((a, b) => a + b, 0);
  const raw = base.map((x, i) => {
    if (i === index) return 0;
    return othersSum === 0 ? remaining / (base.length - 1) : (x / othersSum) * remaining;
  });
  const floored = raw.map(Math.floor);
  let rest = remaining - floored.reduce((a, b) => a + b, 0);
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .filter(({ i }) => i !== index)
    .sort((a, b) => b.frac - a.frac);
  for (const { i } of order) {
    if (rest <= 0) break;
    floored[i] += 1;
    rest -= 1;
  }
  floored[index] = v;
  return floored;
}

/** Split an amount by percentages in cents, so the parts always add up to the whole. */
function allocate(amount: number, percents: number[]): number[] {
  const cents = Math.round(amount * 100);
  const parts = percents.map((p) => Math.floor((cents * p) / 100));
  let rest = cents - parts.reduce((a, b) => a + b, 0);
  for (let i = 0; rest > 0 && i < parts.length; i++) {
    if (percents[i] > 0) {
      parts[i] += 1;
      rest -= 1;
    }
  }
  return parts.map((c) => c / 100);
}

export function PaymentSplit({
  defaultAmount = defaults.defaultAmount,
  splits = defaults.splits,
  currencies = defaults.currencies,
  min = defaults.min,
  max = defaults.max,
  step = defaults.step,
  className,
}: Props) {
  const id = useId();
  const [amount, setAmount] = useState(clamp(defaultAmount, min, max));
  const [currency, setCurrency] = useState(currencies[0] ?? "USD");
  const [percents, setPercents] = useState(() => normalise(splits.map((s) => s.percent)));
  const [drafts, setDrafts] = useState<(string | null)[]>(() => splits.map(() => null));
  const baseRef = useRef<number[] | null>(null);

  const amounts = useMemo(() => allocate(amount, percents), [amount, percents]);
  const total = percents.reduce((a, b) => a + b, 0);

  function setPercent(index: number, value: number, base = percents) {
    setPercents(rebalance(base, index, value));
  }

  function onType(index: number, raw: string) {
    setDrafts((d) => d.map((x, i) => (i === index ? raw : x)));
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) setPercent(index, n, baseRef.current ?? percents);
  }

  function endEdit(index: number) {
    baseRef.current = null;
    setDrafts((d) => d.map((x, i) => (i === index ? null : x)));
  }

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10", className)}>
      {/* Controls */}
      <div className="card flex flex-col gap-8 p-6 md:p-8">
        <div>
          <div className="flex items-end justify-between gap-4">
            <label htmlFor={`${id}-amount`} className="text-sm text-muted">
              {defaults.amountLabel}
            </label>
            <div>
              <label htmlFor={`${id}-currency`} className="sr-only">
                {defaults.currencyLabel}
              </label>
              <select
                id={`${id}-currency`}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-pill border border-line bg-surface px-3 py-1.5 font-mono text-sm"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <output
            htmlFor={`${id}-amount`}
            aria-live="polite"
            className="mt-3 block font-display text-5xl font-heading tracking-tight tabular md:text-6xl"
          >
            {money(amount, currency)}
          </output>
          <input
            id={`${id}-amount`}
            type="range"
            min={min}
            max={max}
            step={step}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-valuetext={money(amount, currency)}
            className="mt-6 w-full cursor-pointer [accent-color:rgb(var(--color-ink))]"
          />
          <div className="mt-2 flex justify-between font-mono text-xs text-muted">
            <span>{money(min, currency)}</span>
            <span>{money(max, currency)}</span>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm text-muted">Split rules</legend>
          <ul className="mt-3 space-y-3">
            {splits.map((s, i) => (
              <li key={s.label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${potTone[i % potTone.length]}`} />
                  <label htmlFor={`${id}-pct-${i}`}>{s.label}</label>
                </span>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Decrease ${s.label} by 5%`}
                    onClick={() => setPercent(i, percents[i] - 5)}
                    disabled={percents[i] <= 0}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink/40 disabled:opacity-40"
                  >
                    <MinusIcon width={14} height={14} />
                  </button>
                  <span className="relative">
                    <input
                      id={`${id}-pct-${i}`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={100}
                      value={drafts[i] ?? String(percents[i])}
                      onFocus={() => {
                        baseRef.current = percents;
                      }}
                      onChange={(e) => onType(i, e.target.value)}
                      onBlur={() => endEdit(i)}
                      className="h-9 w-[4.5rem] rounded-pill border border-line bg-surface pl-3 pr-7 text-right font-mono text-sm tabular [appearance:textfield] focus:border-ink focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted">
                      %
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${s.label} by 5%`}
                    onClick={() => setPercent(i, percents[i] + 5)}
                    disabled={percents[i] >= 100}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink/40 disabled:opacity-40"
                  >
                    <PlusIcon width={14} height={14} />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">{defaults.note}</p>
        </fieldset>
      </div>

      {/* Receipt output */}
      <ReceiptCard>
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span>Payment received</span>
          <span>{currency}</span>
        </div>

        {/* Proportion bar */}
        <div aria-hidden className="mt-5 flex h-3 overflow-hidden rounded-pill bg-surface-2">
          {percents.map((p, i) => (
            <span
              key={splits[i].label}
              className={`h-full transition-[width] duration-300 ease-out ${potTone[i % potTone.length]}`}
              style={{ width: `${p}%` }}
            />
          ))}
        </div>

        <ReceiptDivider />

        <ul className="space-y-5" aria-live="polite">
          {splits.map((s, i) => (
            <li key={s.label} className="flex items-end">
              <span className="min-w-0 shrink">
                <span className="flex items-center gap-2 text-base font-medium">
                  <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${potTone[i % potTone.length]}`} />
                  {s.label}
                  <span className="font-mono text-xs font-normal text-muted tabular">{percents[i]}%</span>
                </span>
                {s.hint && <span className="mt-0.5 block pl-[18px] text-xs text-muted">{s.hint}</span>}
              </span>
              <span aria-hidden className="leader" />
              <span className="shrink-0 font-mono text-lg tabular md:text-xl">{money(amounts[i], currency, true)}</span>
            </li>
          ))}
        </ul>

        <ReceiptDivider />

        <div className="flex items-end text-base font-semibold md:text-lg">
          <span>
            {defaults.totalLabel} <span className="font-mono text-xs font-normal text-muted">{total}%</span>
          </span>
          <span aria-hidden className="leader" />
          <span className="font-mono tabular">{money(amount, currency, true)}</span>
        </div>
      </ReceiptCard>
    </div>
  );
}
