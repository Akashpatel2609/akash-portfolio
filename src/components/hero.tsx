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
    <section id="top" className="relative min-h-[94vh] overflow-hidden pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="mb-5 w-fit rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-zinc-300 shadow-2xl shadow-white/5">
            {profile.hero.eyebrow}
          </p>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.94] text-white sm:text-7xl lg:text-8xl">
            {profile.hero.name}
          </h1>
          <p className="mt-6 max-w-4xl text-2xl font-medium leading-tight text-white sm:text-4xl">
            {profile.hero.headline}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
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
                    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition",
                    action.variant === "primary" &&
                      "border-white bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.22)] hover:bg-zinc-200",
                    action.variant === "secondary" &&
                      "border-white/12 bg-white/[0.07] text-white hover:border-white/30 hover:bg-white/[0.1]",
                    action.variant === "ghost" &&
                      "border-transparent text-zinc-400 hover:border-white/10 hover:text-white"
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
          className="relative min-h-[25rem] rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl"
        >
          <div className="absolute inset-0 rounded-[1.35rem] bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.17),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(124,58,237,0.18),transparent_34%)]" />
          <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
                {profile.hero.dashboardLabel}
              </span>
              <span className="size-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
            </div>
            <div className="grid grid-cols-6 grid-rows-6 gap-3">
              <div className="col-span-4 row-span-3 rounded-xl border border-white/10 bg-black/35 p-4">
                <div className="mb-4 h-2 w-20 rounded-full bg-white/70" />
                <div className="flex h-28 items-end gap-2">
                  {[38, 54, 42, 76, 64, 88, 70].map((height) => (
                    <motion.span
                      key={height}
                      className="flex-1 rounded-t bg-gradient-to-t from-white/35 to-white"
                      initial={{ height: 8 }}
                      animate={{ height }}
                      transition={{ duration: 1, delay: height / 180 }}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-2 row-span-3 rounded-xl border border-white/10 bg-black/35 p-4">
                <div className="mx-auto mt-4 grid size-24 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-xl font-semibold text-white shadow-[inset_0_0_40px_rgba(255,255,255,0.06)]">
                  {profile.hero.stats[0].value}
                </div>
              </div>
              <div className="col-span-3 row-span-3 rounded-xl border border-white/10 bg-black/35 p-4">
                <div className="grid h-full grid-cols-3 gap-2">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "rounded border border-white/10 bg-white/[0.04]",
                        index % 4 === 0 && "bg-[#7C3AED]/25",
                        index % 5 === 0 && "bg-white/15"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-3 row-span-3 rounded-xl border border-white/10 bg-black/35 p-4">
                <div className="space-y-3">
                  {[profile.hero.headline, profile.hero.subheadline].map((text, index) => (
                    <div key={text} className="space-y-2">
                      <div className="h-2 rounded-full bg-white/12" />
                      <div
                        className={cn(
                          "h-2 rounded-full bg-white/12",
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
                <div key={stat.label} className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
