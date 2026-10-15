import Link from "next/link";
import { pricingPreview } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { PricingPlans } from "@/components/pricing/PricingPlans";

export function PricingPreview() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="container-x section-y">
      <PricingPlans
        header={
          <Reveal>
            <SectionHeader index={8} label={pricingPreview.label} title={pricingPreview.title} sub={pricingPreview.sub} titleId="pricing-title" />
          </Reveal>
        }
        footer={
          <Link
            href={pricingPreview.link.href}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-pill border border-line bg-surface px-4 py-2.5 text-sm font-medium hover:border-ink/40 lg:self-auto"
          >
            {pricingPreview.link.label}
            <ArrowRightIcon width={16} height={16} />
          </Link>
        }
      />
    </section>
  );
}
