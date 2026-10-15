import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLegalDoc, legalDocs } from "@/lib/legal";
import { formatDate } from "@/lib/posts";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${doc.slug}` },
    openGraph: { title: `${doc.title} · Ledgerly`, description: doc.description, url: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="container-x pb-24 pt-12 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="Legal documents">
            <ul className="flex gap-2 lg:flex-col">
              {legalDocs.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/legal/${d.slug}`}
                    aria-current={d.slug === doc.slug ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm lg:rounded",
                      d.slug === doc.slug ? "bg-accent text-accent-ink" : "text-muted hover:bg-ink/5 hover:text-ink",
                    )}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="On this page" className="mt-8 hidden lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">On this page</p>
            <ul className="mt-3 space-y-2 text-sm">
              {doc.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="text-muted hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-2xl">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-heading tracking-tight md:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-muted">
            Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
          </p>
          <p className="mt-6 rounded-lg border border-line bg-surface-2/70 p-4 text-sm">{doc.description}</p>
          <div className="mt-10 space-y-10">
            {doc.sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={anchor(s.heading)}>
                <h2 id={anchor(s.heading)} className="text-xl font-semibold">
                  <span className="mr-3 font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-ink/85">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
