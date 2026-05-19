"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050505]/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href={profile.seo.canonical} className="flex items-center gap-3 text-sm font-semibold text-white">
          <span className="relative size-9 overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.12)]">
            <Image
              src={profile.hero.profileImage}
              alt={profile.hero.profileImageAlt}
              fill
              priority
              sizes="36px"
              className="object-cover"
            />
          </span>
          {profile.hero.name}
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {profile.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
