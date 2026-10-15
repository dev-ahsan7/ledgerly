import { problem } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { StatCounter } from "@/components/ui/StatCounter";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="container-x section-y">
      <Reveal>
        <SectionHeader index={1} label={problem.label} title={problem.title} sub={problem.sub} titleId="problem-title" />
      </Reveal>
      {/* Stats sit in columns divided by hairlines, no cards. */}
      <ul className="mt-10 grid divide-y divide-line border-y border-line md:mt-14 md:grid-cols-3 md:divide-x md:divide-y-0">
        {problem.stats.map((s, i) => (
          <li key={s.text} className="md:px-8 md:first:pl-0 md:last:pr-0">
            <Reveal delay={i * 0.08} className="flex h-full flex-col justify-between py-8 md:py-10">
              <StatCounter
                value={s.value}
                from={"from" in s ? s.from : 0}
                prefix={"prefix" in s ? s.prefix : ""}
                suffix={"suffix" in s ? s.suffix : ""}
                className="font-display text-6xl font-light tracking-[-0.04em] md:text-7xl"
              />
              <p className="mt-10 max-w-[15rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-muted">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
