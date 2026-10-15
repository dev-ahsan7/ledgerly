import { comparison, plans, pricingPage, type Cell } from "@/lib/plans";
import { CheckIcon, DashIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

function CellValue({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <CheckIcon className="mx-auto" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <DashIcon className="mx-auto text-muted" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-sm">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="card overflow-hidden">
      <p className="border-b border-line px-4 py-2 text-xs text-muted md:hidden">{pricingPage.scrollHint} →</p>
      {/* The card scrolls sideways on small screens, never the page. */}
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={pricingPage.compareTitle}>
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">{pricingPage.compareTitle}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[40%] px-6 py-5 text-sm font-medium text-muted">
                Features
              </th>
              {plans.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn("w-[20%] px-4 py-5 text-center text-base font-semibold", p.featured && "bg-surface-2/70")}
                >
                  {p.name}
                  <span className="block text-sm font-normal text-muted">${p.monthly}/mo</span>
                </th>
              ))}
            </tr>
          </thead>
          {comparison.map((g) => (
            <tbody key={g.group}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="bg-surface-2/40 px-6 pb-3 pt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted"
                >
                  {g.group}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="px-6 py-4 text-sm font-normal">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className={cn("px-4 py-4 text-center", plans[i]?.featured && "bg-surface-2/70")}>
                      <CellValue value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
