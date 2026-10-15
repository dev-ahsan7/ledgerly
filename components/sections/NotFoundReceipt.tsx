"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { notFoundCopy as c } from "@/lib/site";
import { ReceiptCard, ReceiptDivider } from "@/components/ui/ReceiptCard";
import { LineItem } from "@/components/ui/LineItem";
import { Stamp } from "@/components/ui/Stamp";

export function NotFoundReceipt() {
  const pathname = usePathname() || "/";

  return (
    <div className="mx-auto w-full max-w-md" style={{ transform: "rotate(-2.5deg)" }}>
      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ReceiptCard className="relative">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <span>{c.receipt}</span>
            <span>Ledgerly</span>
          </div>
          <ReceiptDivider />
          <div className="space-y-3 font-mono">
            <LineItem label={c.lines.page} value={<span className="inline-block max-w-[9rem] truncate align-bottom sm:max-w-[12rem]">{pathname}</span>} />
            <LineItem label={c.lines.amount} value={c.amount} />
          </div>
          <ReceiptDivider />
          <LineItem strong label={c.lines.status} value={c.status} />
          <div className="mt-6 flex justify-center pb-2">
            <Stamp delay={0.6} rotate={-8}>
              {c.stamp}
            </Stamp>
          </div>
        </ReceiptCard>
      </motion.div>
    </div>
  );
}
