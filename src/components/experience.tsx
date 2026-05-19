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
                    <div className="mb-5 grid size-12 place-items-center rounded border border-[#38BDF8]/45 bg-[#38BDF8]/10 text-[#38BDF8]">
                      <Icon size={24} />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A3E635]">
                      {item.company}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#F8FAFC]">{item.role}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{item.summary}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="rounded border border-[#273244] bg-[#0B0F14]/60 p-4">
                        <p className="text-sm leading-7 text-[#94A3B8]">{bullet}</p>
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
