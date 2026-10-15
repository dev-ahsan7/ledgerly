"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/site";
import { money } from "@/lib/format";
import { ReceiptCard, ReceiptDivider } from "@/components/ui/ReceiptCard";
import { LineItem } from "@/components/ui/LineItem";
import { Stamp } from "@/components/ui/Stamp";
import { Photo } from "@/components/ui/Photo";

const potTone = ["bg-pot-1", "bg-pot-2", "bg-pot-3"];
const STAMP_DELAY = 0.7;
const CHIPS_DELAY = 1.25;

/** Hero visual: invoice card, PAID stamp, then the three split chips. */
export function HeroInvoice() {
  const inv = hero.invoice;
  const summary = `${inv.number} from ${inv.client} for ${money(inv.total, inv.currency)}, marked paid and split into ${inv.chips
    .map((c) => `${c.label} ${money(c.amount, inv.currency)}`)
    .join(", ")}.`;

  return (
    // Photo panel behind, invoice card floating on top of it.
    <div className="relative overflow-hidden rounded-lg px-5 py-10 sm:px-10 sm:py-14 lg:py-16">
      <Photo name="hero" decorative priority sizes="(min-width: 1100px) 45vw, 100vw" />
      <div aria-hidden className="absolute inset-0 bg-ink/10" />
    <figure className="relative mx-auto w-full max-w-[420px]" aria-label={summary}>
      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 28, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <ReceiptCard className="relative" aria-hidden>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{inv.number}</p>
              <p className="mt-1 text-lg font-semibold">{inv.client}</p>
            </div>
            <p className="text-right font-mono text-xs text-muted">
              {inv.issued}
              <br />
              {inv.due}
            </p>
          </div>

          <ReceiptDivider />

          <div className="space-y-3">
            {inv.lines.map((l) => (
              <LineItem key={l.label} label={l.label} value={money(l.amount, inv.currency)} />
            ))}
          </div>

          <ReceiptDivider />

          <LineItem strong label={`Total (${inv.currency})`} value={money(inv.total, inv.currency, true)} />
          <p className="mt-2 text-xs text-muted">{inv.paidNote}</p>

          <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 sm:left-[58%]">
            <Stamp delay={STAMP_DELAY}>{inv.stamp}</Stamp>
          </div>
        </ReceiptCard>
      </motion.div>

      <ul aria-hidden className="relative -mt-3 flex flex-wrap justify-center gap-2 px-2">
        {inv.chips.map((c, i) => (
          <motion.li
            key={c.label}
            data-reveal
            initial={{ opacity: 0, y: -18, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22, delay: CHIPS_DELAY + i * 0.15 }}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3 py-2 text-sm shadow-card"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${potTone[i]}`} />
            <span className="text-muted">{c.label}</span>
            <span className="font-mono font-medium tabular">{money(c.amount, inv.currency)}</span>
          </motion.li>
        ))}
      </ul>
    </figure>
    </div>
  );
}
