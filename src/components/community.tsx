import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Community() {
  const section = profile.sections.community;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 lg:grid-cols-2">
        {profile.community.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.organization} delay={index * 0.05}>
              <BentoCard className="h-full">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.075] text-white">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
                    {item.date}
                  </span>
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
                  {item.organization}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.role}</h3>
                <div className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <p key={bullet} className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-7 text-zinc-400">
                      {bullet}
                    </p>
                  ))}
                </div>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
