"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="pointer-events-auto h-14 w-[112px] rounded-full bg-foreground opacity-50" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="pointer-events-auto relative flex h-14 w-[112px] items-center rounded-full bg-foreground p-1 hover:scale-105 transition-transform"
      aria-label="Toggle theme"
    >
      <span className="absolute left-4 font-mono text-[10px] font-bold uppercase tracking-widest text-background opacity-50">
        LGT
      </span>
      <span className="absolute right-4 font-mono text-[10px] font-bold uppercase tracking-widest text-background opacity-50">
        DRK
      </span>

      <motion.div
        layout
        initial={false}
        animate={{
          x: isDark ? 56 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md"
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
          {isDark ? "DRK" : "LGT"}
        </span>
      </motion.div>
    </button>
  );
}
