import { hero } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { Title } from "@/components/ui/Title";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { HeroInvoice } from "./HeroInvoice";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 md:pb-32 md:pt-24">
      <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="max-w-xl">
          <Reveal>
            <p className="chip text-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink" />
              <span className="text-ink">{hero.eyebrow.tag}</span>
              <span aria-hidden>·</span>
              <span>{hero.eyebrow.text}</span>
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              id="hero-title"
              className="mt-8 font-display text-[2.75rem] font-heading leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.5rem]"
              style={{ textWrap: "balance" }}
            >
              <Title text={hero.title} />
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6 max-w-md">{hero.sub}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={hero.primary.href} size="lg">
                {hero.primary.label}
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} size="lg" variant="secondary">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 flex items-center gap-4 border-t border-line pt-6">
              <div className="flex -space-x-2.5">
                {hero.avatars.map((a, i) => (
                  <Avatar key={a.initials} initials={a.initials} photo={a.photo} index={i} size="md" />
                ))}
              </div>
              <p className="text-sm text-muted">{hero.trust}</p>
            </div>
          </Reveal>
        </div>

        <HeroInvoice />
      </div>
    </section>
  );
}
