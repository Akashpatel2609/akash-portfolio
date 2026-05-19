"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0B0F14]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-22rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.38, 0.58, 0.38] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-18rem] right-[-12rem] h-[36rem] w-[36rem] rounded-full bg-[#A3E635]/8 blur-3xl"
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.28, 0.44, 0.28] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0,rgba(11,15,20,0.45)_42%,#0B0F14_100%)]" />
    </div>
  );
}
