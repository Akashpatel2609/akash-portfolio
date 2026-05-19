import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Achievements() {
  const section = profile.sections.achievements;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4">
        {profile.achievements.map((achievement) => {
          const Icon = achievement.icon;

          return (
            <Reveal key={achievement.title}>
              <BentoCard>
                <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                  <div className="grid size-14 place-items-center rounded-xl border border-white/10 bg-white/[0.075] text-white">
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{achievement.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    {achievement.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-white"
                      >
                        {metric}
                      </span>
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
