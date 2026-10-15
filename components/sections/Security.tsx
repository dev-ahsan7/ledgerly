import { security } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { BankIcon, KeyIcon, LockIcon, ShieldIcon } from "@/components/ui/Icons";

const icons = [LockIcon, KeyIcon, BankIcon, ShieldIcon];

export function Security() {
  return (
    <section id="security" aria-labelledby="security-title" className="bg-inverse text-inverse-ink section-y">
      <div className="container-x">
        <Reveal>
          <SectionLabel index={7} tone="inverse">
            {security.label}
          </SectionLabel>
        </Reveal>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-10">
          <Reveal>
            <h2 id="security-title" className="h2 max-w-xl">
              {security.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-snug text-inverse-muted md:text-xl lg:ml-auto">{security.line}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-inverse-ink/15 bg-inverse-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {security.badges.map((b, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={b.title} className="bg-inverse">
                <Reveal delay={i * 0.06} className="flex h-full flex-col gap-6 p-6 md:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-inverse-ink/20">
                    <Icon />
                  </span>
                  <span>
                    <span className="block font-semibold">{b.title}</span>
                    <span className="mt-2 block text-sm text-inverse-muted">{b.text}</span>
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
