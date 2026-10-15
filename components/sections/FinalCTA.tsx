import { finalCta } from "@/lib/site";
import { ReceiptCard, ReceiptDivider } from "@/components/ui/ReceiptCard";
import { LineItem } from "@/components/ui/LineItem";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Stamp } from "@/components/ui/Stamp";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";

export function FinalCTA({ index = 10 }: { index?: number }) {
  return (
    <section aria-labelledby="cta-title" className="container-x section-y">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl bg-inverse text-inverse-ink">
          {/* Faint ruled lines, like ledger paper, behind the content. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "linear-gradient(rgb(var(--color-inverse-ink)) 1px, transparent 1px)", backgroundSize: "100% 36px" }}
          />

          <div className="relative grid items-center gap-12 p-8 md:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-16">
            <div>
              <SectionLabel index={index} tone="inverse">
                Get started
              </SectionLabel>
              <h2 id="cta-title" className="mt-6 font-display text-4xl font-heading leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl" style={{ textWrap: "balance" }}>
                {finalCta.title}
              </h2>
              <p className="mt-5 max-w-md text-lg text-inverse-muted">{finalCta.sub}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={finalCta.button.href} size="lg" variant="light">
                  {finalCta.button.label}
                  <ArrowRightIcon width={16} height={16} />
                </ButtonLink>
                <ButtonLink
                  href={finalCta.secondary.href}
                  size="lg"
                  variant="ghost"
                  className="!border-inverse-ink/25 !text-inverse-ink hover:!bg-inverse-ink/10"
                >
                  {finalCta.secondary.label}
                </ButtonLink>
              </div>

              <ul className="mt-10 flex flex-col gap-3 text-sm text-inverse-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
                {finalCta.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <CheckIcon width={16} height={16} className="text-inverse-ink" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Receipt: the same "you owe nothing" message, shown as the product's own UI. */}
            <div className="mx-auto w-full max-w-[400px] lg:rotate-[2deg]">
              <ReceiptCard className="relative text-ink" innerClassName="p-6 md:p-8" aria-hidden>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span>{finalCta.header}</span>
                  <span>No. 0001</span>
                </div>
                <ReceiptDivider />
                <div className="space-y-3">
                  {finalCta.lines.map((l) => (
                    <LineItem key={l.label} label={l.label} value={l.value} className="!text-sm" />
                  ))}
                </div>
                <ReceiptDivider />
                <LineItem strong label={finalCta.total.label} value={finalCta.total.value} />
                <div className="mt-6 flex justify-end">
                  <Stamp delay={0.4} rotate={-8}>
                    {finalCta.stamp}
                  </Stamp>
                </div>
              </ReceiptCard>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
