import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Community } from "@/components/community";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { TechMarquee } from "@/components/tech-marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Community />
      <Achievements />
      <Contact />
    </main>
  );
}
