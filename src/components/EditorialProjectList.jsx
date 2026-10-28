// Adapted from ibrandify's Editorial service list, retrieved from 21st.dev (demo37530).
// Preserves editorial rows, linked detail disclosure and hover offset; uses shadcn/Radix primitives.
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
export function EditorialProjectList({ projects }) {
  const [open, setOpen] = useState("");
  useEffect(() => {
    const syncHash = () => {
      const id = location.hash.slice(1);
      setOpen(projects.some((project) => project.id === id) ? id : "");
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [projects]);
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 320);
    return () => clearTimeout(timer);
  }, [open]);
  return (
    <Accordion
      type="single"
      collapsible
      value={open}
      onValueChange={(value) => {
        setOpen(value);
        history.replaceState(null, "", value ? `#${value}` : "#work");
      }}
      aria-label="Selected project case studies"
    >
      {projects.map((project) => (
        <AccordionItem
          className="project-row"
          key={project.id}
          value={project.id}
          id={project.id}
        >
          <AccordionTrigger
            aria-label={`${open === project.id ? "Close" : "Read"} ${project.name} case study`}
          >
            <span className="project-name">{project.name}</span>
            <span className="project-discipline">{project.discipline}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="project-details">
              <p className="project-tools">{project.tools.join(" · ")}</p>
              <div className="case-grid">
                {[
                  ["The challenge", project.challenge],
                  ["The build", project.build],
                  ["The outcome", project.result],
                ].map(([label, copy]) => (
                  <div key={label}>
                    <h3>{label}</h3>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
              <div className="case-bottom">
                <a
                  className="text-link"
                  href={project.link}
                  target={
                    project.link.startsWith("https:") ? "_blank" : undefined
                  }
                  rel={
                    project.link.startsWith("https:") ? "noreferrer" : undefined
                  }
                >
                  {project.linkText}
                  <ArrowUpRightIcon />
                </a>
                {project.note && <p>{project.note}</p>}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
