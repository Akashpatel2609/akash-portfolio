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
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-24", className)}>
      <Reveal className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="mb-4 w-fit rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
            {eyebrow}
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-white/60 to-transparent" />
        </div>
        <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
