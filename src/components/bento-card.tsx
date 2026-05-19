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
        "group relative overflow-hidden rounded-lg border border-[#273244] bg-[#111827]/78 p-6 shadow-2xl shadow-black/20 backdrop-blur",
        "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(163,230,53,0.16),transparent_30%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "after:absolute after:inset-0 after:-z-10 after:rounded-lg after:border after:border-[#38BDF8]/0 after:transition-colors after:duration-500 hover:after:border-[#38BDF8]/45",
        className
      )}
    >
      {children}
    </div>
  );
}
