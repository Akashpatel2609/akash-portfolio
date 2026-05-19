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
            <p className="text-lg leading-8 text-zinc-400">{section.body}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.contact.links.map((link) => {
                const Icon = link.icon;

                return link.href === "#contact" ? (
                  <div
                    key={link.label}
                    className="rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <Icon className="mb-4 text-white" size={22} />
                    <p className="text-sm font-semibold text-white">{link.label}</p>
                    <p className="mt-1 break-words text-sm text-zinc-400">{link.value}</p>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/25 hover:bg-white/[0.055]"
                  >
                    <Icon className="mb-4 text-white" size={22} />
                    <p className="text-sm font-semibold text-white">{link.label}</p>
                    <p className="mt-1 break-words text-sm text-zinc-400">{link.value}</p>
                  </a>
                );
              })}
              <a
                href={profile.contact.resume}
                className="inline-flex min-h-24 items-center gap-3 rounded-xl border border-white bg-white p-4 text-sm font-semibold text-black shadow-[0_0_36px_rgba(255,255,255,0.18)] transition hover:bg-zinc-200"
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
