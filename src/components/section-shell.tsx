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
    <section id={id} className={cn("scroll-mt-24 py-14 sm:py-20", className)}>
      <Reveal className="mb-9 max-w-3xl">
        <p className="mb-3 w-fit rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-zinc-300">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
