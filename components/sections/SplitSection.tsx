import { split } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PaymentSplit } from "./PaymentSplit";

export function SplitSection() {
  return (
    <section id="split" aria-labelledby="split-title" className="section-y">
      <div className="container-x">
        <Reveal>
          <SectionHeader index={2} label={split.label} title={split.title} sub={split.sub} titleId="split-title" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <PaymentSplit defaultAmount={split.defaultAmount} splits={split.splits} />
        </Reveal>
      </div>
    </section>
  );
}
