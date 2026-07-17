"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const repeatedStack = [...profile.techMarquee, ...profile.techMarquee, ...profile.techMarquee];

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
    <section aria-label="Technical stack marquee" className="border-y border-border bg-foreground py-8">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max gap-8 px-4 motion-reduce:flex-wrap max-md:flex-wrap max-md:justify-center items-center"
          animate={shouldAnimate ? { x: ["0%", "-33.333333%"] } : undefined}
          transition={shouldAnimate ? { duration: 30, ease: "linear", repeat: Infinity } : undefined}
        >
          {(shouldAnimate ? repeatedStack : profile.techMarquee).map((tool, index) => (
            <span
              key={`${tool}-${index}`}
              className="flex items-center font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-background opacity-50 transition-opacity hover:opacity-100"
            >
              {tool}
              <span className="mx-8 text-background opacity-30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
