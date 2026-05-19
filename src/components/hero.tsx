"use client";

import { ArrowDownRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const iconMap = {
  "View Projects": ArrowDownRight,
  "Download Resume": Download,
  "Contact Me": Mail
};

export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="mb-5 w-fit rounded border border-[#273244] bg-[#111827]/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
            {profile.hero.eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] text-[#F8FAFC] sm:text-6xl lg:text-7xl">
            {profile.hero.name}
          </h1>
          <p className="mt-6 max-w-4xl text-2xl font-medium leading-tight text-[#F8FAFC] sm:text-3xl">
            {profile.hero.headline}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#94A3B8] sm:text-lg">
            {profile.hero.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {profile.hero.actions.map((action) => {
              const Icon = iconMap[action.label as keyof typeof iconMap];

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={cn(
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded border px-5 text-sm font-semibold transition",
                    action.variant === "primary" &&
                      "border-[#38BDF8] bg-[#38BDF8] text-[#0B0F14] shadow-[0_0_32px_rgba(56,189,248,0.3)] hover:bg-[#7DD3FC]",
                    action.variant === "secondary" &&
                      "border-[#273244] bg-[#111827] text-[#F8FAFC] hover:border-[#38BDF8]/60",
                    action.variant === "ghost" &&
                      "border-transparent text-[#94A3B8] hover:border-[#273244] hover:text-[#F8FAFC]"
                  )}
                >
                  <Icon size={17} />
                  {action.label}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[25rem] rounded-lg border border-[#273244] bg-[#111827]/70 p-4 shadow-2xl shadow-black/30 backdrop-blur"
        >
          <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(163,230,53,0.12),transparent_32%)]" />
          <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4">
            <div className="flex items-center justify-between border-b border-[#273244] pb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
                {profile.hero.dashboardLabel}
              </span>
              <span className="size-2 rounded-full bg-[#A3E635] shadow-[0_0_18px_rgba(163,230,53,0.9)]" />
            </div>
            <div className="grid grid-cols-6 grid-rows-6 gap-3">
              <div className="col-span-4 row-span-3 rounded border border-[#273244] bg-[#0B0F14]/60 p-4">
                <div className="mb-4 h-2 w-20 rounded bg-[#38BDF8]/70" />
                <div className="flex h-28 items-end gap-2">
                  {[38, 54, 42, 76, 64, 88, 70].map((height) => (
                    <motion.span
                      key={height}
                      className="flex-1 rounded-t bg-[#38BDF8]/75"
                      initial={{ height: 8 }}
                      animate={{ height }}
                      transition={{ duration: 1, delay: height / 180 }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-2 row-span-3 rounded border border-[#273244] bg-[#0B0F14]/60 p-4">
                <div className="mx-auto mt-4 grid size-24 place-items-center rounded-full border border-[#38BDF8]/50 bg-[#38BDF8]/10 text-xl font-semibold text-[#F8FAFC]">
                  {profile.hero.stats[0].value}
                </div>
              </div>
              <div className="col-span-3 row-span-3 rounded border border-[#273244] bg-[#0B0F14]/60 p-4">
                <div className="grid h-full grid-cols-3 gap-2">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "rounded border border-[#273244] bg-[#111827]",
                        index % 4 === 0 && "bg-[#A3E635]/20",
                        index % 5 === 0 && "bg-[#38BDF8]/20"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-3 row-span-3 rounded border border-[#273244] bg-[#0B0F14]/60 p-4">
                <div className="space-y-3">
                  {[profile.hero.headline, profile.hero.subheadline].map((text, index) => (
                    <div key={text} className="space-y-2">
                      <div className="h-2 rounded bg-[#273244]" />
                      <div
                        className={cn(
                          "h-2 rounded bg-[#273244]",
                          index === 0 ? "w-10/12" : "w-8/12"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {profile.hero.stats.map((stat) => (
                <div key={stat.label} className="rounded border border-[#273244] bg-[#0B0F14]/60 p-4">
                  <p className="text-2xl font-semibold text-[#F8FAFC]">{stat.value}</p>
                  <p className="mt-1 text-xs text-[#94A3B8]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
