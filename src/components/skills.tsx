import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Skills() {
  const section = profile.sections.skills;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {profile.skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <Reveal key={skill.group} delay={index * 0.05}>
              <BentoCard className="h-full">
                <Icon className="mb-6 text-white" size={26} />
                <h3 className="text-lg font-semibold text-white">{skill.group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-400"
                    >
                      {item}
                    </span>
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
