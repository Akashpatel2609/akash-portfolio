import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { Contact } from "@/components/contact";
import { Community } from "@/components/community";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
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
