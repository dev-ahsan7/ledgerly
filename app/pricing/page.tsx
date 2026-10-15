import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Metadata } from "next";
import { pricingPage } from "@/lib/plans";
import { SectionHeader, SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FeeCalculator } from "@/components/pricing/FeeCalculator";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Solo is free, Pro is $12 a month, Studio is $29 a month. Compare plans and calculate your fees in any currency.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Ledgerly pricing: simple pricing, no surprise fees",
    description: "Solo is free, Pro is $12 a month, Studio is $29 a month. Compare plans and calculate your fees.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <section aria-labelledby="pricing-hero" className="container-x pb-16 pt-12 md:pb-24 md:pt-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel index={1}>Pricing</SectionLabel>
          <h1 id="pricing-hero" className="mt-4 font-display text-4xl font-heading tracking-tight sm:text-5xl md:text-6xl" style={{ textWrap: "balance" }}>
            {pricingPage.title}
          </h1>
          <p className="lead mx-auto mt-5 max-w-xl">{pricingPage.sub}</p>
        </Reveal>
        <div id="plans">
          <PricingPlans
            className="mt-12"
            footer={
              <Link
                href="#calculator"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-pill border border-line bg-surface px-4 py-2.5 text-sm font-medium hover:border-ink/40 lg:self-auto"
              >
                Calculate your fees
                <ArrowRightIcon width={16} height={16} />
              </Link>
            }
          />
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-title" className="container-x pb-20 md:pb-28">
        <Reveal>
          <SectionHeader index={2} label="Compare" title={pricingPage.compareTitle} sub={pricingPage.compareSub} titleId="compare-title" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <ComparisonTable />
        </Reveal>
      </section>

      <section id="calculator" aria-labelledby="calc-title" className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeader index={3} label="Fee calculator" title={pricingPage.calculatorTitle} sub={pricingPage.calculatorSub} titleId="calc-title" />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <FeeCalculator />
          </Reveal>
        </div>
      </section>

      <FAQ index={4} />
      <FinalCTA index={5} />
    </>
  );
}
