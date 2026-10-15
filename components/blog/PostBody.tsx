import type { Block } from "@/lib/posts";

/** Renders the structured post body from lib/posts.ts. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-[1.0625rem] leading-relaxed">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} className="pt-6 font-display text-2xl font-heading tracking-tight">
                {b.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-muted">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-mono marker:text-muted">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <figure key={i} className="border-l-2 border-ink py-1 pl-6">
                <blockquote className="font-display text-xl font-medium leading-snug md:text-2xl">
                  <p>&ldquo;{b.text}&rdquo;</p>
                </blockquote>
                {b.cite && <figcaption className="mt-3 text-sm text-muted">— {b.cite}</figcaption>}
              </figure>
            );
          case "callout":
            return (
              <aside key={i} className="rounded-lg border border-line bg-surface-2/70 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{b.title}</p>
                <p className="mt-2">{b.text}</p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="card overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-medium text-muted last:text-right">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map(([a, c]) => (
                      <tr key={a} className="border-t border-line first:border-t-0">
                        <td className="px-4 py-3">{a}</td>
                        <td className="px-4 py-3 text-right font-mono tabular">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
