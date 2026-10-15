import Link from 'next/link';
import { footer, site } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div className="container-x pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <h2 className="mt-6 text-base font-semibold">
              {footer.newsletter.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{footer.newsletter.body}</p>
            <NewsletterForm className="mt-4" />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="transition-colors hover:text-muted"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {footer.copyright}.
          </p>
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Social links"
          >
            {footer.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="-mb-[0.22em] whitespace-nowrap text-center font-display text-[21vw] font-heading leading-[0.85] tracking-[-0.05em] text-ink/[0.08] xl:text-[300px]">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
