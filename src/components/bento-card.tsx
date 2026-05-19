import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
};

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl",
        "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%),linear-gradient(135deg,rgba(124,58,237,0.12),transparent_42%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "after:absolute after:inset-0 after:-z-10 after:rounded-xl after:border after:border-white/0 after:transition-colors after:duration-500 hover:after:border-white/25",
        className
      )}
    >
      {children}
    </div>
  );
}
