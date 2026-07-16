"use client";

import { ArrowDownRight, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { PipelineTerminal } from "@/components/pipeline-terminal";

const iconMap = {
  "View Work": ArrowDownRight,
  "Download Resume": Download,
  "Contact Me": Mail
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 140,
    },
  },
};

const imageContainerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      delay: 0.3,
    },
  },
};


export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative min-h-[calc(100vh-7rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/40 shadow-2xl backdrop-blur-md"
        >
          {/* Futuristic background lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(124,58,237,0.12),transparent_26%),radial-gradient(circle_at_85%_25%,rgba(236,72,153,0.12),transparent_28%),linear-gradient(135deg,rgba(124,58,237,0.05),transparent_36%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />

          <div className="relative grid min-h-[calc(100vh-7rem)] lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left Content (Text & Call-to-actions) */}
            <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-12 h-full">
              <motion.div variants={containerVariants} className="space-y-6">
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                    Open to roles
                  </span>
                  <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">
                    Toronto / Analytics Systems
                  </span>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-4xl space-y-4">
                  <p className="font-mono text-sm uppercase tracking-[0.26em] text-violet-400">
                    ./akash-patel --portfolio
                  </p>
                  <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                    {profile.hero.name}
                  </h1>
                  <p className="text-xl font-medium text-zinc-300 sm:text-2xl">
                    {profile.hero.title}
                  </p>
                  <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    {profile.hero.headline}
                  </p>
                  <p className="text-base leading-8 text-zinc-400 sm:text-lg">
                    {profile.hero.subheadline}
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row pt-4">
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
                          "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-all duration-300 transform hover:scale-[1.03]",
                          action.variant === "primary" &&
                            "border-white bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:bg-zinc-200",
                          action.variant === "secondary" &&
                            "border-white/10 bg-zinc-900 text-white hover:border-white/30 hover:bg-white/[0.05]",
                          action.variant === "ghost" &&
                            "border-transparent text-zinc-400 hover:border-white/10 hover:text-white"
                        )}
                      >
                        <Icon size={16} />
                        {action.label}
                      </a>
                    );
                  })}
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="mt-12 grid gap-3 rounded-2xl border border-white/5 bg-zinc-950/50 p-4 font-mono text-xs text-zinc-500"
              >
                <p><span className="text-violet-400">system</span> boot: recruiter_profile loaded</p>
                <p>mode: <span className="text-white">BI + data engineering + applied AI</span></p>
                <p>output: <span className="text-white">dashboards / pipelines / decision systems</span></p>
              </motion.div>
            </div>

            {/* Right Content (Picture & Terminal Simulator) */}
            <div className="grid gap-6 p-6 sm:p-8 lg:p-12">
              <motion.div 
                variants={imageContainerVariants}
                className="grid gap-4 sm:grid-cols-[0.7fr_1fr]"
              >
                {/* Profile Image card */}
                <div className="relative min-h-60 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 group shadow-lg">
                  <Image
                    src={profile.hero.profileImage}
                    alt={profile.hero.profileImageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 240px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <p className="text-sm font-semibold text-white">Akash Patel</p>
                    <p className="text-xs text-zinc-400">Toronto, ON</p>
                  </div>
                </div>

                {/* Grid metrics */}
                <div className="grid gap-3">
                  {profile.impactMetrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      variants={itemVariants}
                      custom={i}
                      className="rounded-2xl border border-white/5 bg-zinc-900/40 p-4 shadow-md hover:border-violet-500/20 hover:bg-zinc-900/60 transition duration-300"
                    >
                      <p className="text-2xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-4 text-zinc-400">{metric.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Pipeline Terminal Simulator */}
              <motion.div variants={itemVariants} className="w-full">
                <PipelineTerminal />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
