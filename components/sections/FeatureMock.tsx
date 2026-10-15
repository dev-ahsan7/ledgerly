import { features, type FeatureMock as MockKind } from "@/lib/site";
import { cn } from "@/lib/format";

const m = features.mocks;

function Shell({ title, children, meta }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <div className="card overflow-hidden" aria-hidden>
      <div className="flex items-center justify-between border-b border-line bg-surface-2/60 px-5 py-3">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </span>
        <span className="font-mono text-xs text-muted">{title}</span>
        <span className="font-mono text-xs text-muted">{meta}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

const statusTone: Record<string, string> = {
  Paid: "bg-ink text-bg",
  Viewed: "bg-surface-2 text-ink",
  Sent: "border border-line text-muted",
};

/** Small built-UI preview for each feature tab. Decorative; the bullets carry the content. */
export function FeatureMock({ kind }: { kind: MockKind }) {
  switch (kind) {
    case "invoices":
      return (
        <Shell title="Invoices" meta="Oct">
          <ul className="divide-y divide-line">
            {m.invoices.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3 text-sm">
                <span className="w-12 font-mono text-xs text-muted">{r.id}</span>
                <span className="min-w-0 flex-1 truncate">{r.client}</span>
                <span className="font-mono tabular">{r.amount}</span>
                <span className={cn("w-16 rounded-pill px-2 py-0.5 text-center text-xs", statusTone[r.status])}>{r.status}</span>
              </li>
            ))}
          </ul>
        </Shell>
      );
    case "currency":
      return (
        <Shell title="Balances" meta="4 of 10">
          <ul className="grid gap-3 sm:grid-cols-2">
            {m.currency.map((c) => (
              <li key={c.code} className="rounded border border-line p-4">
                <span className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 font-mono text-[10px] font-semibold">{c.code}</span>
                  <span className="text-xs text-muted">{c.name}</span>
                </span>
                <span className="mt-3 block font-mono text-lg tabular">{c.balance}</span>
              </li>
            ))}
          </ul>
        </Shell>
      );
    case "pots":
      return (
        <Shell title="Pots" meta="Auto-split on">
          <ul className="space-y-5">
            {m.pots.map((p, i) => (
              <li key={p.name}>
                <span className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="font-mono text-xs text-muted tabular">
                    {p.saved} / {p.goal}
                  </span>
                </span>
                <span className="mt-2 block h-2 overflow-hidden rounded-pill bg-surface-2">
                  <span className={cn("block h-full rounded-pill", ["bg-pot-1", "bg-pot-2", "bg-pot-3"][i % 3])} style={{ width: `${p.pct}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </Shell>
      );
    case "expenses":
      return (
        <Shell title="Expenses" meta="This week">
          <ul className="divide-y divide-line">
            {m.expenses.map((e) => (
              <li key={e.merchant} className="flex items-center gap-3 py-3 text-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-surface-2 font-mono text-[10px]">RCP</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{e.merchant}</span>
                  <span className="block text-xs text-muted">{e.category}</span>
                </span>
                <span className="font-mono tabular">{e.amount}</span>
              </li>
            ))}
          </ul>
        </Shell>
      );
    case "reports":
      return (
        <Shell title="Reports" meta="2026">
          <p className="text-xs text-muted">{m.reports.caption}</p>
          <p className="mt-1 font-mono text-2xl tabular">{m.reports.total}</p>
          <div className="mt-5 flex h-36 items-end gap-3">
            {m.reports.bars.map((b) => (
              <div key={b.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="block w-full rounded-t bg-pot-2" style={{ height: `${b.value}%` }} />
                <span className="font-mono text-[10px] text-muted">{b.month}</span>
              </div>
            ))}
          </div>
        </Shell>
      );
  }
}
