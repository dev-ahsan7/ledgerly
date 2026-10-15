"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/format";

export type TabItem = { id: string; label: string };

export const tabId = (base: string, id: string) => `${base}-tab-${id}`;
export const panelId = (base: string, id: string) => `${base}-panel-${id}`;

type Props = {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  idBase: string;
  label: string;
  className?: string;
  tabClassName?: (selected: boolean) => string;
  renderTab?: (item: TabItem, selected: boolean) => ReactNode;
};

/**
 * Accessible tab list (WAI-ARIA tabs pattern, automatic activation).
 * Arrow keys move between tabs, Home/End jump to the ends.
 */
export function TabList({ items, value, onChange, idBase, label, className, tabClassName, renderTab }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusAt(index: number) {
    const i = (index + items.length) % items.length;
    refs.current[i]?.focus();
    onChange(items[i].id);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusAt(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusAt(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(items.length - 1);
        break;
    }
  }

  return (
    <div role="tablist" aria-label={label} className={className}>
      {items.map((item, i) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabId(idBase, item.id)}
            aria-selected={selected}
            aria-controls={panelId(idBase, item.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn("relative transition-colors", tabClassName?.(selected))}
          >
            {renderTab ? renderTab(item, selected) : item.label}
          </button>
        );
      })}
    </div>
  );
}
