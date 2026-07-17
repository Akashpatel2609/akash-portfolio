"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Header Pill */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-8 z-[60] px-4 sm:px-6 lg:px-8 pointer-events-none"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href={profile.seo.canonical} className="pointer-events-auto group relative">
            <span className="font-display text-2xl font-bold tracking-tighter text-foreground uppercase mix-blend-difference">
              A.P.
            </span>
          </a>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="pointer-events-auto flex h-14 items-center gap-4 bg-foreground px-6 rounded-full hover:scale-105 transition-transform"
              aria-label="Toggle Menu"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-background font-bold">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="flex flex-col gap-1.5 justify-center items-center w-6 h-4">
                <span className={`block w-full h-[2px] bg-background transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
                <span className={`block w-full h-[2px] bg-background transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
          >
            {/* Background Marquee Effect */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-5 pointer-events-none overflow-hidden">
              <h2 className="text-[15vw] font-display font-bold leading-none tracking-tighter whitespace-nowrap text-foreground">
                NAVIGATION NAVIGATION
              </h2>
            </div>

            <nav className="relative z-10 flex flex-col items-center gap-8">
              {profile.nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <span className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase group-hover:italic transition-all inline-block">
                    {item.label}
                  </span>
                  {/* Strikethrough effect on hover */}
                  <span className="absolute left-0 right-0 top-1/2 h-[4px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-10 font-mono text-xs uppercase tracking-widest text-muted"
            >
              <p>Toronto, ON</p>
              <p>Lat 43.6532° N / Long 79.3832° W</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
