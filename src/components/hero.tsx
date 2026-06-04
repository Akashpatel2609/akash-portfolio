"use client";

import { ArrowDownRight, Download, Mail, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const iconMap = {
  "View Work": ArrowDownRight,
  "Download Resume": Download,
  "Contact Me": Mail
};

const pipelineSteps = ["source", "transform", "model", "dashboard", "decision"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[calc(100vh-7rem)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45 shadow-xl shadow-black/40 backdrop-blur-md sm:rounded-[2rem]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_85%_25%,rgba(124,58,237,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_36%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />

          <div className="relative grid min-h-[calc(100vh-7rem)] lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <div className="mb-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-300">
                    <span className="size-2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.95)]" />
                    Open to roles
                  </span>
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-violet-200">
                    Toronto / Analytics Systems
                  </span>
                </div>

                <div className="max-w-4xl">
                  <p className="mb-4 font-mono text-sm uppercase tracking-[0.26em] text-zinc-500">
                    ./akash-patel --portfolio
                  </p>
                  <h1 className="text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
                    {profile.hero.name}
                  </h1>
                  <p className="mt-5 text-xl font-medium text-zinc-300 sm:text-2xl">
                    {profile.hero.title}
                  </p>
                  <p className="mt-8 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                    {profile.hero.headline}
                  </p>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                    {profile.hero.subheadline}
                  </p>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  {profile.hero.actions.map((action) => {
                    const Icon = iconMap[action.label as keyof typeof iconMap];

                    return (
                      <a
                        key={action.label}
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                        aria-label={action.label}
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
              </div>

              <div className="mt-12 grid gap-3 rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-xs text-zinc-400">
                <p>
                  <span className="text-white">system</span> boot: recruiter_profile loaded
                </p>
                <p>
                  mode: <span className="text-white">BI + data engineering + applied AI</span>
                </p>
                <p>
                  output: <span className="text-white">dashboards / pipelines / decision systems</span>
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:p-8 lg:p-10">
              <div className="grid gap-4 sm:grid-cols-[0.78fr_1fr]">
                <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04]">
                  <Image
                    src={profile.hero.profileImage}
                    alt={profile.hero.profileImageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-sm font-semibold text-white">Akash Patel</p>
                    <p className="text-xs text-zinc-400">Toronto, ON</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {profile.impactMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-black/45 p-4 shadow-xl shadow-black/20"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.03em] text-white">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-zinc-400">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/50 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                      data product lifecycle
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Fragmented data to executive action
                    </p>
                  </div>
                  <RadioTower className="text-violet-200" size={22} />
                </div>

                <div className="grid gap-3">
                  {pipelineSteps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + index * 0.045 }}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-white text-xs font-semibold text-black">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                          {step}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {index === 0 && "Excel / SQL / JSON / SharePoint / Vena"}
                          {index === 1 && "Power Query / SSIS / ETL / Python"}
                          {index === 2 && "DAX / star schema / semantic models"}
                          {index === 3 && "Power BI / Tableau / executive reporting"}
                          {index === 4 && "forecasting / margin / risk / operations"}
                        </p>
                      </div>
                      <span className="h-px w-10 bg-gradient-to-r from-white to-violet-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
