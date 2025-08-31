"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconCheck,
  IconBox,
  IconShoppingCart,
  IconBug,
  IconArrowUpRight,
  IconX,
} from "@tabler/icons-react";

type Stats = {
  available: number;
  sold: number;
  damaged: number;
  returned: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  stats: Stats;
  className?: string;
};

export default function StatsPopupBar({ open, onClose, stats, className = "" }: Props) {
  const total = Math.max(1, stats.available + stats.sold + stats.damaged + stats.returned);

  const pill = (label: string, value: number, Icon: any, tone: string) => (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 shadow-sm">
      <div className={`p-2 rounded-md ${tone} bg-opacity-10`}>
        <Icon className={`h-5 w-5 ${tone.replace("bg-", "text-")?.replace("bg-opacity-10","")}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{label}</span>
        <span className="text-lg font-semibold text-neutral-900 dark:text-white">{value}</span>
      </div>
    </div>
  );

  const progress = (value: number) => Math.round((value / total) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`fixed bottom-6 left-1/2 z-50 w-[min(96%,1000px)] -translate-x-1/2 rounded-2xl ${className}`}
          role="dialog"
          aria-modal="true"
          aria-label="POS quick stats"
        >
          <div className="rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800/60 border border-neutral-200 dark:border-neutral-700 shadow-lg p-4 md:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-br from-black to-neutral-600 p-2 text-white">
                  <IconCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Quick POS Stats</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-300">Snapshot of inventory & transactions</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Close stats"
                  className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                >
                  <IconX className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex md:gap-4">
              <div className="flex-1">{pill("Items Available", stats.available, IconBox, "text-green-600")}</div>
              <div className="flex-1">{pill("Items Sold", stats.sold, IconShoppingCart, "text-blue-600")}</div>
              <div className="flex-1">{pill("Damaged Items", stats.damaged, IconBug, "text-red-600")}</div>
              <div className="flex-1">{pill("Returned Items", stats.returned, IconArrowUpRight, "text-yellow-600")}</div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-300">
                <span>Summary</span>
                <span className="font-medium text-neutral-700 dark:text-neutral-100">Total: {total}</span>
              </div>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                <StatBar label="Available" value={progress(stats.available)} tone="bg-green-500" />
                <StatBar label="Sold" value={progress(stats.sold)} tone="bg-blue-500" />
                <StatBar label="Damaged" value={progress(stats.damaged)} tone="bg-red-500" />
                <StatBar label="Returned" value={progress(stats.returned)} tone="bg-yellow-500" />
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function StatBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-300">
        <span>{label}</span>
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-200/60 dark:bg-neutral-700/40 overflow-hidden">
        <div
          className={`h-full rounded-full ${tone}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, transition: "width 400ms ease" }}
        />
      </div>
    </div>
  );
}
