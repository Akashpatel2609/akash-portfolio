import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Community } from "@/components/community";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { PipelineLayers } from "@/components/pipeline-layers";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TechMarquee } from "@/components/tech-marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PipelineLayers />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Community />
        <Achievements />
        <Contact />
      </div>
    </main>
  );
}
