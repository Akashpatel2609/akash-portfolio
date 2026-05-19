"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_34%)]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-26rem] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-white/[0.075] blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.84, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-20rem] right-[-12rem] h-[42rem] w-[42rem] rounded-full bg-[#7C3AED]/18 blur-3xl"
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.38, 0.56, 0.38] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[8rem] left-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[#2563EB]/12 blur-3xl"
        animate={{ x: [0, 28, 0], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0,rgba(5,5,5,0.26)_38%,#050505_100%)]" />
    </div>
  );
}
