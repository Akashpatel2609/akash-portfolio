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
        "group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/45 p-6 shadow-xl shadow-black/25 backdrop-blur-md",
        "before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.18),transparent_35%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "after:absolute after:inset-0 after:-z-10 after:rounded-[1.35rem] after:border after:border-white/0 after:transition-colors after:duration-500 hover:after:border-white/25",
        className
      )}
    >
      {children}
    </div>
  );
}
