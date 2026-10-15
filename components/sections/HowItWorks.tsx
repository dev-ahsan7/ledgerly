import { howItWorks } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { cn, pad2 } from "@/lib/format";

const v = howItWorks.visuals;
const potTone = ["bg-pot-1", "bg-pot-2", "bg-pot-3"];

/** Step 1: a compact invoice composer with a Send button and a "sent" toast. */
function SendVisual() {
  return (
    <div className="w-full max-w-[290px] space-y-2">
      <div className="rounded border border-line bg-surface p-4 shadow-float">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">New invoice</p>
        <div className="mt-3 space-y-2 text-[13px]">
          <div className="flex items-center justify-between rounded-sm border border-line px-2.5 py-2">
            <span className="text-muted">To</span>
            <span className="truncate pl-3 font-medium">{v.send.to}</span>
          </div>
          <div className="flex items-center justify-between rounded-sm border border-line px-2.5 py-2">
            <span className="text-muted">Amount</span>
            <span className="font-mono tabular">
              {v.send.amount} <span className="text-muted">{v.send.currency}</span>
            </span>
          </div>
        </div>
        <span className="mt-3 flex h-9 items-center justify-center gap-2 rounded-sm bg-ink text-[13px] font-medium text-bg">
          {v.send.button}
          <ArrowRightIcon width={14} height={14} />
        </span>
      </div>
      <p className="ml-auto flex w-fit items-center gap-2 rounded-sm border border-line bg-surface px-2.5 py-1.5 text-[12px] shadow-float">
        <CheckIcon width={14} height={14} />
        {v.send.toast}
      </p>
    </div>
  );
}

/** Step 2: payment method picker plus a "payment received" notification. */
function PaidVisual() {
  return (
    <div className="w-full max-w-[290px] space-y-2">
      <ul className="divide-y divide-line rounded border border-line bg-surface shadow-float">
        {v.paid.methods.map((m) => (
          <li key={m.label} className="flex items-center gap-3 px-3.5 py-2.5 text-[13px]">
            <span
              className={cn(
                "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                m.selected ? "border-ink" : "border-line",
              )}
            >
              {m.selected && <span className="h-2 w-2 rounded-full bg-ink" />}
            </span>
            <span className="min-w-0">
              <span className={cn("block", m.selected && "font-medium")}>{m.label}</span>
              <span className="block truncate text-[11px] text-muted">{m.note}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="flex items-center justify-between gap-3 rounded border border-line bg-surface px-3.5 py-2.5 text-[13px] shadow-float">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ink" />
          {v.paid.received}
        </span>
        <span className="font-mono tabular">{v.paid.amount}</span>
      </p>
    </div>
  );
}

/** Step 3: the three pots filling up. */
function SplitVisual() {
  return (
    <div className="w-full max-w-[290px] rounded border border-line bg-surface p-4 shadow-float">
      <div className="flex h-2 overflow-hidden rounded-pill bg-surface-2">
        {v.split.map((p, i) => (
          <span key={p.label} className={potTone[i]} style={{ width: `${p.pct}%` }} />
        ))}
      </div>
      <ul className="mt-4 space-y-3 text-[13px]">
        {v.split.map((p, i) => (
          <li key={p.label} className="flex items-end">
            <span className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", potTone[i])} />
              {p.label}
              <span className="font-mono text-[11px] text-muted">{p.pct}%</span>
            </span>
            <span aria-hidden className="leader" />
            <span className="font-mono tabular">{p.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const visuals = [SendVisual, PaidVisual, SplitVisual];

export function HowItWorks() {
  const steps = howItWorks.steps;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="container-x section-y">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <SectionHeader index={3} label={howItWorks.label} title={howItWorks.title} titleId="how-title" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="lead max-w-sm lg:pb-1 lg:text-right">{howItWorks.sub}</p>
        </Reveal>
      </div>

      <ol className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
        {steps.map((s, i) => {
          const Visual = visuals[i];
          return (
            <li key={s.title} className="relative">
              <Reveal delay={0.1 + i * 0.1} className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface">
                {/* Visual panel: decorative, the text below carries the meaning. */}
                <div
                  aria-hidden
                  className="relative grid h-64 place-items-center border-b border-line bg-surface-2/70 px-6"
                  style={{
                    backgroundImage: "radial-gradient(rgb(var(--color-line)) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <Visual />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    <span>
                      <span className="text-ink">{pad2(i + 1)}</span> / {pad2(steps.length)}
                    </span>
                    <span>{s.time}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-heading tracking-tight">{s.title}</h3>
                  <p className="mt-2 font-medium">{s.text}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
                </div>
              </Reveal>

              {/* Arrow between cards (tablet/desktop). */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-[26px] top-32 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg text-muted md:grid"
                >
                  <ArrowRightIcon width={14} height={14} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
