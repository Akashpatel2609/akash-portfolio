"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-[#273244]/60 bg-[#0B0F14]/78 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-sm font-semibold text-[#F8FAFC]">
          <span className="grid size-8 place-items-center rounded border border-[#38BDF8]/45 bg-[#38BDF8]/10 text-[#38BDF8]">
            {profile.hero.brandMark}
          </span>
          {profile.hero.name}
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {profile.nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace("featured ", "")}`}
              className="text-sm text-[#94A3B8] transition hover:text-[#F8FAFC]"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
