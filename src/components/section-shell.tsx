import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, eyebrow, title, children, className }: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-12 sm:py-16", className)}>
      <Reveal className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-[#F8FAFC] sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
