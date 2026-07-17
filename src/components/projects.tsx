"use client";

import { ArrowUpRight, X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { profile, Project } from "@/data/profile";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Modal Component
function ProjectModal({ project, onClose }: { project: Project, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const contentStagger = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full md:h-[90vh] md:w-[90vw] md:max-w-7xl md:rounded-3xl bg-card border border-border shadow-2xl flex flex-col md:flex-row overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.slug}`}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 flex size-12 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Left Side: Image */}
        <div className="relative w-full h-[40vh] md:h-full md:w-1/2 bg-muted overflow-hidden">
          {project.caseStudy.screenshot && (
            <Image
              src={project.caseStudy.screenshot}
              alt={project.caseStudy.screenshotAlt}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20">
          <div className="max-w-2xl mx-auto space-y-12">
            
            <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-6">
              <h2 id={`modal-title-${project.slug}`} className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-[1.1]">
                {project.title}
              </h2>
              <p className="text-xl md:text-2xl font-medium text-muted leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <motion.div custom={2} variants={contentStagger} initial="hidden" animate="visible" className="grid gap-px bg-border grid-cols-1 sm:grid-cols-3">
              {project.caseStudy.metrics.map((metric, i) => (
                <div key={i} className="bg-card p-6 flex items-center justify-center text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground">{metric}</p>
                </div>
              ))}
            </motion.div>

            <motion.div custom={3} variants={contentStagger} initial="hidden" animate="visible" className="space-y-8">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4 border-b border-border pb-2">Problem</h3>
                <p className="text-lg leading-relaxed text-foreground">{project.caseStudy.problem}</p>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4 border-b border-border pb-2">Architecture</h3>
                <p className="text-lg leading-relaxed text-foreground">{project.caseStudy.architecture}</p>
              </div>
            </motion.div>

            <motion.div custom={4} variants={contentStagger} initial="hidden" animate="visible" className="space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4 border-b border-border pb-2">Execution</h3>
              <ul className="space-y-4">
                {project.caseStudy.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg leading-relaxed text-foreground">
                    <span className="font-mono text-xs text-muted pt-2">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div custom={5} variants={contentStagger} initial="hidden" animate="visible" className="space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4 border-b border-border pb-2">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="border border-border bg-background px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div custom={6} variants={contentStagger} initial="hidden" animate="visible" className="flex flex-wrap gap-4 pt-12">
              {project.caseStudy.demo && project.caseStudy.demo.startsWith("http") && (
                <a href={project.caseStudy.demo} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center gap-3 bg-foreground px-8 font-bold uppercase tracking-widest text-background transition-transform hover:scale-105">
                  Live Demo
                  <ExternalLink size={18} />
                </a>
              )}
              {project.caseStudy.repository && project.caseStudy.repository.startsWith("http") && (
                <a href={project.caseStudy.repository} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center gap-3 border border-border bg-card px-8 font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-border">
                  <Github size={18} />
                  View Source
                </a>
              )}
            </motion.div>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const section = profile.sections.projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id={section.id} className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted">02.</span>
            <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.9]">
              Selected<br />Work
            </h2>
          </div>
          <p className="max-w-sm text-lg text-muted md:text-right font-medium">
            {section.eyebrow}
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid gap-12 md:gap-x-8 md:gap-y-32 md:grid-cols-2">
          {profile.projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative cursor-pointer flex flex-col gap-6",
                  !isEven && "md:mt-32" // Stagger the second column down
                )}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container with Reveal Effect */}
                <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-card z-10 origin-bottom transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-0" />
                  
                  {project.caseStudy.screenshot && (
                    <Image
                      src={project.caseStudy.screenshot}
                      alt={project.caseStudy.screenshotAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-110"
                    />
                  )}
                  
                  <div className="absolute top-0 left-0 z-20 bg-foreground px-6 py-4">
                    <span className="font-display text-4xl font-bold text-background leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase group-hover:italic transition-all">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>

                  <p className="text-lg text-muted font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {project.tools.slice(0, 3).map((tool) => (
                      <span key={tool} className="font-mono text-sm uppercase tracking-widest text-foreground">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
