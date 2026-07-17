"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export function Contact() {
  const section = profile.sections.contact;

  return (
    <section id="contact" className="py-32 bg-card border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Massive Footer Typographic Impact */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter text-foreground uppercase leading-[0.8] mb-12"
          >
            LET&apos;S<br />TALK.
          </motion.h2>
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl text-muted font-medium leading-relaxed mb-12">
              {section.body}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 border-t border-border pt-16">
          <div className="flex flex-col gap-8">
            {profile.contact.links.map((link, i) => {
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex flex-col items-start"
                >
                  <span className="font-mono text-sm uppercase tracking-widest text-muted mb-2">{link.label}</span>
                  <span className="font-display text-3xl font-bold tracking-tight text-foreground transition-all group-hover:italic">
                    {link.value}
                  </span>
                </motion.a>
              );
            })}
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <motion.a
              href={profile.contact.resume}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-foreground text-background font-display font-bold text-2xl uppercase tracking-widest px-12 py-8 transition-transform hover:scale-105"
            >
              DOWNLOAD RESUME
            </motion.a>

            <div className="mt-20 md:mt-0 font-mono text-xs uppercase tracking-widest text-muted text-left md:text-right">
              <p>&copy; {new Date().getFullYear()} Akash Patel.</p>
              <p>Designed for the Spatial Web.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
