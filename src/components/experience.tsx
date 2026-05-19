import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Experience() {
  const section = profile.sections.experience;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="space-y-4">
        {profile.experience.map((item) => {
          const Icon = item.icon;

          return (
            <Reveal key={`${item.company}-${item.role}`}>
              <BentoCard>
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                  <div>
                    <div className="mb-5 grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.075] text-white">
                      <Icon size={24} />
                    </div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
                      {item.company}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      {item.location} / {item.date}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-zinc-400">{item.summary}</p>
                  </div>
                  <div className="grid gap-3">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="rounded-xl border border-white/10 bg-black/30 p-4">
                        <p className="text-sm leading-7 text-zinc-400">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
