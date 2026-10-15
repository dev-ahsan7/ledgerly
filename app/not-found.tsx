import type { Metadata } from "next";
import { notFoundCopy as c } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { NotFoundReceipt } from "@/components/sections/NotFoundReceipt";

export const metadata: Metadata = {
  title: "Page not found",
  description: c.sub,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="container-x flex flex-col items-center pb-24 pt-12 text-center md:pt-20">
      <NotFoundReceipt />
      <h1 id="nf-title" className="mt-14 font-display text-4xl font-heading tracking-tight md:text-5xl">
        {c.title}
      </h1>
      <p className="lead mt-4">{c.sub}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={c.primary.href} size="lg">
          {c.primary.label}
        </ButtonLink>
        <ButtonLink href={c.secondary.href} size="lg" variant="secondary">
          {c.secondary.label}
        </ButtonLink>
      </div>
    </section>
  );
}
