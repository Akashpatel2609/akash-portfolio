import { Download } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Contact() {
  const section = profile.sections.contact;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <Reveal>
        <BentoCard>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <p className="text-lg leading-8 text-[#94A3B8]">{section.body}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.contact.links.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded border border-[#273244] bg-[#0B0F14]/60 p-4 transition hover:border-[#38BDF8]/60"
                  >
                    <Icon className="mb-4 text-[#38BDF8]" size={22} />
                    <p className="text-sm font-semibold text-[#F8FAFC]">{link.label}</p>
                    <p className="mt-1 break-words text-sm text-[#94A3B8]">{link.value}</p>
                  </a>
                );
              })}
              <a
                href={profile.contact.resume}
                className="inline-flex min-h-24 items-center gap-3 rounded border border-[#38BDF8] bg-[#38BDF8] p-4 text-sm font-semibold text-[#0B0F14] shadow-[0_0_32px_rgba(56,189,248,0.24)] transition hover:bg-[#7DD3FC]"
              >
                <Download size={22} />
                {profile.hero.actions[1].label}
              </a>
            </div>
          </div>
        </BentoCard>
      </Reveal>
    </SectionShell>
  );
}
