import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowRightIcon, BookIcon, ClockIcon, MailIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Ledgerly team about fees, payments or studio accounts. Replies in under 4 hours on weekdays.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Ledgerly", description: "Replies in under 4 hours on weekdays.", url: "/contact" },
};

const icons = [MailIcon, BookIcon, ClockIcon];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="container-x pb-24 pt-12 md:pt-20">
      <Reveal className="max-w-2xl">
        <SectionLabel index={1}>Contact</SectionLabel>
        <h1 id="contact-title" className="mt-4 font-display text-4xl font-heading tracking-tight sm:text-5xl md:text-6xl">
          {contact.title}
        </h1>
        <p className="lead mt-5">{contact.sub}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>

        <ul className="space-y-4" aria-label="Other ways to get help">
          {contact.cards.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={c.title}>
                <Reveal delay={0.1 + i * 0.06} className="card p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2">
                    <Icon />
                  </span>
                  <h2 className="mt-4 font-semibold">{c.title}</h2>
                  <p className="mt-1 text-sm text-muted">{c.text}</p>
                  <Link href={c.href} className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
                    {c.cta}
                    <ArrowRightIcon width={16} height={16} />
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
