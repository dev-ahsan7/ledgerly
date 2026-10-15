import { marquee, type LogoMark } from "@/lib/site";

/** Simple geometric placeholder marks, so the row reads like real logos rather than plain text. */
function Mark({ kind }: { kind: LogoMark }) {
  const common = { width: 20, height: 20, viewBox: "0 0 20 20", "aria-hidden": true, className: "shrink-0" } as const;
  switch (kind) {
    case "circle":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="8" fill="currentColor" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="7.5" cy="10" r="5.5" />
          <circle cx="12.5" cy="10" r="5.5" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <path d="M10 2.5 18 17H2z" fill="currentColor" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M10 1.5 18.5 10 10 18.5 1.5 10z" fill="currentColor" />
        </svg>
      );
    case "half":
      return (
        <svg {...common}>
          <path d="M2 12a8 8 0 0 1 16 0z" fill="currentColor" />
          <rect x="2" y="14" width="16" height="3" rx="1" fill="currentColor" />
        </svg>
      );
    case "bars":
      return (
        <svg {...common} fill="currentColor">
          <rect x="2" y="9" width="4" height="9" rx="1" />
          <rect x="8" y="5" width="4" height="13" rx="1" />
          <rect x="14" y="2" width="4" height="16" rx="1" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="10" cy="10" r="6.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} fill="currentColor">
          <path d="M10 1 12 8 19 10 12 12 10 19 8 12 1 10 8 8z" />
        </svg>
      );
  }
}

function Logo({ name, mark }: { name: string; mark: LogoMark }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[17px] font-semibold tracking-[-0.02em]">
      <Mark kind={mark} />
      {name}
    </span>
  );
}

/** One copy of the logos, doubled so a single copy is always wider than a 1440–1920px screen. */
function LogoRun({ duplicate = false }: { duplicate?: boolean }) {
  const run = [...marquee.logos, ...marquee.logos];
  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {run.map((l, i) => (
        <li key={`${l.name}-${i}`} aria-hidden={i >= marquee.logos.length || undefined}>
          <Logo {...l} />
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section aria-labelledby="logos-caption" className="container-x">
      <div className="flex flex-col gap-6 border-y border-line py-8 md:flex-row md:items-center md:gap-0 md:py-6">
        <p
          id="logos-caption"
          className="shrink-0 text-sm leading-snug text-muted md:w-44 md:border-r md:border-line md:pr-8"
        >
          {marquee.caption}
        </p>

        {/* Moving row (default). */}
        <div className="motion-only marquee-mask min-w-0 flex-1 overflow-hidden text-ink/45 md:pl-8">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            <LogoRun />
            <LogoRun duplicate />
          </div>
        </div>

        {/* Static grid for people who prefer reduced motion. */}
        <ul className="reduced-only flex-1 grid-cols-2 gap-x-8 gap-y-5 text-ink/45 sm:grid-cols-4 md:pl-8">
          {marquee.logos.map((l) => (
            <li key={l.name}>
              <Logo {...l} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
