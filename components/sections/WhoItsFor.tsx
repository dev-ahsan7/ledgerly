"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { audiences } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TabList, panelId, tabId } from "@/components/ui/Tabs";
import { Avatar } from "@/components/ui/Avatar";
import { Photo } from "@/components/ui/Photo";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";

const ID = "audience";

export function WhoItsFor() {
  const [active, setActive] = useState(audiences.tabs[0].id);
  const index = audiences.tabs.findIndex((t) => t.id === active);
  const current = audiences.tabs[index];
  const initials = current.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section aria-labelledby="audience-title" className="section-y">
      <div className="container-x">
        {/* Header and tabs share one row on desktop. */}
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <Reveal>
            <SectionHeader index={5} label={audiences.label} title={audiences.title} titleId="audience-title" />
          </Reveal>
          <Reveal delay={0.05}>
            <TabList
              items={audiences.tabs}
              value={active}
              onChange={setActive}
              idBase={ID}
              label="Audiences"
              className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:w-fit sm:rounded sm:border sm:border-line sm:bg-surface sm:p-1 sm:px-1"
              tabClassName={(selected) =>
                cn(
                  "shrink-0 rounded-sm px-4 py-2 text-sm font-medium",
                  selected ? "bg-ink text-bg" : "text-muted hover:text-ink",
                )
              }
            />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <div
            role="tabpanel"
            id={panelId(ID, current.id)}
            aria-labelledby={tabId(ID, current.id)}
            tabIndex={0}
            className="overflow-hidden rounded-lg border border-line bg-surface"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid md:grid-cols-[1.05fr_1fr]"
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
                  <Photo name={current.image} sizes="(min-width: 810px) 50vw, 100vw" />
                  {/* Metric sits on the photo, like a caption card. */}
                  <div className="absolute bottom-4 left-4 right-4 rounded bg-surface/95 p-4 backdrop-blur sm:right-auto sm:max-w-[320px] md:bottom-6 md:left-6 md:p-5">
                    <p className="font-display text-3xl font-heading tracking-tight md:text-4xl">{current.metric}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{current.metricNote}</p>
                  </div>
                </div>

                <div className="flex flex-col p-6 md:p-10 lg:p-12">
                  <figure>
                    <blockquote className="font-display text-xl leading-snug tracking-tight md:text-2xl" style={{ textWrap: "pretty" }}>
                      <p>&ldquo;{current.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 text-sm">
                      <Avatar initials={initials} photo={current.avatar} index={index} size="lg" />
                      <span>
                        <span className="block font-medium">{current.name}</span>
                        <span className="block text-muted">{current.role}</span>
                      </span>
                    </figcaption>
                  </figure>

                  <div className="mt-10 border-t border-line pt-6 md:mt-auto">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{audiences.usesLabel}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {current.uses.map((u) => (
                        <li key={u} className="inline-flex items-center gap-1.5 rounded-pill border border-line px-2.5 py-1 text-sm">
                          <CheckIcon width={14} height={14} />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
