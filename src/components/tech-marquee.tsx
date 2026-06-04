"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const repeatedStack = [...profile.techMarquee, ...profile.techMarquee];

export function TechMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const [isCompact, setIsCompact] = useState(false);
  const shouldAnimate = !shouldReduceMotion && !isCompact;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsCompact(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section aria-label="Technical stack marquee" className="border-y border-white/10 bg-black/65 py-5">
      <div className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-black after:to-transparent">
        <motion.div
          className="flex w-max gap-3 px-3 motion-reduce:flex-wrap max-md:flex-wrap max-md:justify-center"
          animate={shouldAnimate ? { x: ["0%", "-50%"] } : undefined}
          transition={shouldAnimate ? { duration: 32, ease: "linear", repeat: Infinity } : undefined}
        >
          {(shouldAnimate ? repeatedStack : profile.techMarquee).map((tool, index) => (
            <span
              key={`${tool}-${index}`}
              className="rounded-full border border-white/10 bg-white/[0.055] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-zinc-300 shadow-xl shadow-black/20"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
