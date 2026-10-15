import Link from "next/link";
import { faqs } from "@/lib/faqs";
import { faqSection } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQItem } from "@/components/ui/FAQItem";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ({ index = 9 }: { index?: number }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x section-y">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <Reveal>
          <SectionLabel index={index}>{faqSection.label}</SectionLabel>
          <h2 id="faq-title" className="h2 mt-5">
            {faqSection.title}
          </h2>
          <p className="mt-4 text-muted">
            {faqSection.sub}{" "}
            <Link href={faqSection.link.href} className="font-medium text-ink underline underline-offset-4">
              {faqSection.link.label}
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="border-t border-line">
          {faqs.map((f, i) => (
            <FAQItem key={f.q} question={f.q} answer={f.a} defaultOpen={i === 0} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
