"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { PlusIcon } from "./Icons";

type Props = { question: string; answer: string; defaultOpen?: boolean };

/** Disclosure-pattern accordion item. Works with Enter/Space via the native button. */
export function FAQItem({ question, answer, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const buttonId = `${id}-q`;
  const regionId = `${id}-a`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={regionId}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium md:text-lg"
        >
          <span>{question}</span>
          <span
            aria-hidden
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <PlusIcon width={16} height={16} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={regionId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-12 text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
