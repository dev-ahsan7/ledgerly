import Link from "next/link";
import { cn } from "@/lib/format";

/** Placeholder logo mark: a folded-receipt glyph plus the wordmark. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={cn("inline-flex items-center gap-2 font-display text-lg font-heading tracking-tight", className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="shrink-0">
        <path d="M5 3h14v16l-2.33-1.5L14.33 19 12 17.5 9.67 19l-2.34-1.5L5 19V3z" fill="currentColor" />
        <path d="M8.5 8h7M8.5 11.5h4.5" stroke="rgb(var(--color-bg))" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span>Ledgerly</span>
      <span className="sr-only">, home</span>
    </Link>
  );
}
