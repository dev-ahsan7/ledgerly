import { featuredTestimonial as f, testimonialsCopy } from "@/lib/testimonials";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="container-x section-y">
      <Reveal>
        <SectionHeader index={6} label={testimonialsCopy.label} title={testimonialsCopy.title} titleId="testimonials-title" />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 md:mt-12">
        {/* Featured story: portrait left, quote right, results in a row underneath. */}
        <figure className="grid overflow-hidden rounded-lg border border-line bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
            <Photo name={f.photo} decorative sizes="(min-width: 810px) 40vw, 100vw" className="object-[50%_25%]" />
          </div>

          <div className="flex flex-col">
            <div className="flex-1 p-6 md:p-10 lg:p-12">
              <blockquote className="font-display text-xl leading-snug tracking-tight md:text-2xl lg:text-[1.75rem]" style={{ textWrap: "pretty" }}>
                <p>&ldquo;{f.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="block font-medium">{f.name}</span>
                <span className="block text-muted">{f.role}</span>
              </figcaption>
            </div>

            <dl className="grid grid-cols-3 divide-x divide-line border-t border-line">
              {f.stats.map((st) => (
                <div key={st.label} className="flex flex-col px-4 py-5 md:px-8 md:py-6 lg:px-10">
                  <dt className="font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-muted md:text-[11px]">{st.label}</dt>
                  <dd className="order-first mb-2 font-display text-2xl font-heading tracking-tight tabular md:text-3xl">{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </figure>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <TestimonialCarousel />
      </Reveal>
    </section>
  );
}
