"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { features } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TabList, panelId, tabId } from "@/components/ui/Tabs";
import { CheckIcon, PlusIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/format";
import { FeatureMock } from "./FeatureMock";

const ID = "features";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <CheckIcon width={18} height={18} className="mt-1 shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function FeatureTabs() {
  const tabs = features.tabs;
  const [active, setActive] = useState(tabs[0].id);
  const [mobileOpen, setMobileOpen] = useState<string | null>(tabs[0].id);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Auto-advance is driven by the progress bar's CSS animation ending.
  const autoplay = mounted && !reduced;
  const running = autoplay && inView && !hovered && !focused;
  const current = tabs.find((t) => t.id === active)!;

  function next() {
    const i = tabs.findIndex((t) => t.id === active);
    setActive(tabs[(i + 1) % tabs.length].id);
  }

  return (
    <section id="features" aria-labelledby="features-title" className="container-x section-y">
      <Reveal>
        <SectionHeader index={4} label={features.label} title={features.title} titleId="features-title" />
      </Reveal>

      {/* Tablet / desktop: tabs */}
      <div
        ref={sectionRef}
        className="mt-12 hidden md:block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
      >
        <TabList
          items={tabs}
          value={active}
          onChange={setActive}
          idBase={ID}
          label="Product features"
          className="grid grid-cols-5 gap-2"
          tabClassName={(selected) =>
            cn(
              "overflow-hidden rounded border px-4 pb-4 pt-3 text-left text-sm font-medium",
              selected ? "border-ink/30 bg-surface text-ink shadow-card" : "border-line text-muted hover:text-ink",
            )
          }
          renderTab={(item, selected) => (
            <>
              <span>{item.label}</span>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-line/60">
                {selected && (
                  <span
                    key={active}
                    className="block h-full origin-left bg-ink"
                    onAnimationEnd={next}
                    style={
                      autoplay
                        ? {
                            animation: `progress ${features.autoAdvanceMs}ms linear forwards`,
                            animationPlayState: running ? "running" : "paused",
                          }
                        : { transform: "scaleX(1)" }
                    }
                  />
                )}
              </span>
            </>
          )}
        />

        <div
          role="tabpanel"
          id={panelId(ID, current.id)}
          aria-labelledby={tabId(ID, current.id)}
          tabIndex={0}
          className="mt-6 rounded-lg border border-line bg-surface/60 p-8 lg:p-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div>
                <h3 className="font-display text-2xl font-heading tracking-tight lg:text-3xl">{current.title}</h3>
                <div className="mt-6 text-base">
                  <Bullets items={current.bullets} />
                </div>
              </div>
              <FeatureMock kind={current.mock} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Phones: accordion */}
      <div className="mt-10 border-t border-line md:hidden">
        {tabs.map((t) => {
          const open = mobileOpen === t.id;
          return (
            <div key={t.id} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  id={`${ID}-acc-${t.id}`}
                  aria-expanded={open}
                  aria-controls={`${ID}-acc-panel-${t.id}`}
                  onClick={() => setMobileOpen(open ? null : t.id)}
                  className="flex w-full items-center justify-between py-5 text-left text-lg font-medium"
                >
                  {t.label}
                  <span aria-hidden className={cn("grid h-8 w-8 place-items-center rounded-full border border-line transition-transform", open && "rotate-45")}>
                    <PlusIcon width={16} height={16} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`${ID}-acc-panel-${t.id}`}
                    role="region"
                    aria-labelledby={`${ID}-acc-${t.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 pb-6">
                      <p className="font-semibold">{t.title}</p>
                      <Bullets items={t.bullets} />
                      <FeatureMock kind={t.mock} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
