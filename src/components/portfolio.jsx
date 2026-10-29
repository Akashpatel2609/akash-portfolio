"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { PauseIcon } from "@phosphor-icons/react/dist/csr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/csr/Play";
import { CopyIcon } from "@phosphor-icons/react/dist/csr/Copy";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EditorialProjectList } from "@/components/EditorialProjectList";
import { projects, resume } from "@/data/portfolio";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function App() {
  const root = useRef(null),
    hero = useRef(null);
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);
  const [motion, setMotion] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const emailField = useRef(null);
  useEffect(() => {
    if (copyStatus.startsWith("Copy unavailable")) {
      emailField.current?.focus();
      emailField.current?.select();
    }
  }, [copyStatus]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("26akashpatel99@gmail.com");
      setCopyStatus("Email copied. Paste it into your preferred email service.");
    } catch {
      setCopyStatus("Copy unavailable. Select the address below and copy it manually.");
    }
  }
  const moving = motion && !reduced;
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ap-porcelain-theme");
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {}
    setReady(true);
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const sync = () => setReduced(query.matches);
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.querySelector('meta[name="theme-color"]').content =
      theme === "light" ? "#faf8f5" : "#171315";
    try {
      localStorage.setItem("ap-porcelain-theme", theme);
    } catch {}
  }, [theme, ready]);
  useEffect(() => {
    document.documentElement.dataset.motion = moving ? "on" : "off";
  }, [moving]);
  useGSAP(
    () => {
      if (!moving || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".headline-line", {
          yPercent: 28,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
        })
        .from(
          ".hero-copy > *",
          { y: 16, opacity: 0, duration: 0.65, stagger: 0.08 },
          0.18,
        )
        .from(
          ".sculpture",
          { y: 24, opacity: 0, scale: 0.985, duration: 1.15 },
          0.15,
        )
        .from(
          ".project-row",
          { y: 16, opacity: 0, duration: 0.65, stagger: 0.07 },
          0.4,
        );
      const mm = gsap.matchMedia();
      mm.add("(min-width: 801px)", () => {
        gsap.to(".sculpture-motion", {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
      gsap.utils.toArray(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        }),
      );
      return () => mm.revert();
    },
    { scope: root, dependencies: [moving], revertOnUpdate: true },
  );
  const { contextSafe } = useGSAP({ scope: root });
  const hoverLink = contextSafe((event) => {
    if (!moving || event.pointerType !== "mouse") return;
    gsap.to(event.currentTarget.querySelector("svg"), {
      x: 4,
      y: -4,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
  const leaveLink = contextSafe((event) => {
    if (!moving) return;
    gsap.to(event.currentTarget.querySelector("svg"), {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
  return (
    <div ref={root} id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header frame">
        <a href="#top" className="identity" aria-label="Akash Patel home">
          <Avatar>
            <AvatarImage src="/assets/akash.webp" alt="" />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <span>Akash Patel</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <ToggleGroup
          type="single"
          value={theme}
          onValueChange={(value) => {
            if (value) setTheme(value);
          }}
          aria-label="Color theme"
        >
          <ToggleGroupItem value="light" aria-label="Use light theme">
            <SunIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Use dark theme">
            <MoonIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero" ref={hero} aria-labelledby="hero-title">
          <div className="hero-heading frame">
            <h1 id="hero-title">
              <span className="headline-line">Systems with</span>
              <span className="headline-line">a purpose.</span>
            </h1>
            <div className="hero-copy">
              <p>
                I’m Akash, a data analyst and AI builder in Toronto. I turn
                complex information into useful systems.
              </p>
              <Button asChild>
                <a href="#work">
                  Explore my work
                  <ArrowRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>
          <div className="sculpture-motion">
            <figure className="sculpture">
              <Image
                src={
                  theme === "light"
                    ? "/assets/hero-light.webp"
                    : "/assets/hero-dark.webp"
                }
                width="1440"
                height="430"
                alt="A sculpture transforming unstructured metal into a precise waveform and ordered stone columns."
                priority
                unoptimized
                decoding="async"
              />
            </figure>
          </div>
          <div className="frame project-index" id="work">
            <span id="projects" />
            <h2 className="sr-only">Selected work</h2>
            <EditorialProjectList projects={projects} />
          </div>
        </section>
        <section className="impact frame" aria-labelledby="impact-title">
          <div className="section-top">
            <h2 className="reveal" id="impact-title">
              Work that holds up.
            </h2>
            <p className="reveal">
              Useful isn’t just how something looks.
              <br />
              It’s what people can do with it.
            </p>
          </div>
          <div className="impact-grid">
            <article className="reveal">
              <strong>
                10<span>+</span>
              </strong>
              <h3>Dashboards shipped</h3>
              <p>
                Finance, operations and leadership reporting at Maple Reinders.
              </p>
            </article>
            <article className="reveal">
              <strong>
                34.7<span>M</span>
              </strong>
              <h3>Reviews processed</h3>
              <p>
                Raw Amazon review data, transformed into analysis-ready
                reporting.
              </p>
            </article>
            <article className="reveal">
              <strong>
                70<span>%</span>
              </strong>
              <h3>Less data preparation</h3>
              <p>
                Time saved for stakeholders through the Amazon Reviews ETL
                pipeline.
              </p>
            </article>
          </div>
          <div className="reporting-result reveal">
            <p>
              Less time preparing.
              <br />
              More time understanding.
            </p>
            <div>
              <strong>
                3–4 hours <ArrowRightIcon /> 15–20 minutes
              </strong>
              <p>
                Vena reporting preparation, streamlined through a repeatable ETL
                workflow at Maple Reinders.
              </p>
            </div>
          </div>
        </section>
        <section className="approach" aria-labelledby="approach-title">
          <div className="frame">
            <div className="section-top">
              <h2 className="reveal" id="approach-title">
                Clarity comes first.
              </h2>
              <p className="reveal">
                The work starts with a question.
                <br />
                The technology follows.
              </p>
            </div>
            <div className="approach-grid">
              {[
                [
                  "Understand the decision",
                  "Find the question behind the request. Align on the people, the information and the outcome.",
                ],
                [
                  "Build the right system",
                  "Connect the data, simplify the workflow and make the result repeatable.",
                ],
                [
                  "Make it useful",
                  "Turn the output into something people can understand, trust and act on.",
                ],
              ].map(([title, body]) => (
                <article className="reveal" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          className="about frame"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-intro">
            <h2 className="reveal" id="about-title">
              An engineer’s curiosity.
            </h2>
            <p className="about-lead reveal">
              I like the moment a complicated problem becomes a clear next step.
            </p>
            <p className="reveal">
              My foundation is engineering. My day-to-day work is helping people
              understand their business through better data.
            </p>
            <a
              className="text-link reveal"
              href={resume}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={hoverLink}
              onPointerLeave={leaveLink}
            >
              View my résumé
              <ArrowUpRightIcon />
            </a>
            <div className="toolkit reveal" id="skills">
              <h3>In the toolkit</h3>
              <p>
                Power BI · SQL · Python · DAX · Power Query · Vena · Tableau ·
                FastAPI · Docker
              </p>
            </div>
          </div>
          <div className="background">
            <article className="experience reveal" id="experience">
              <h3>Data Analyst · Maple Reinders</h3>
              <p className="secondary">2025–Present · Toronto, Ontario</p>
              <p>
                Executive dashboards, forecasting, margin reporting, resource
                planning, Vena ETL and applied AI evaluation.
              </p>
            </article>
            <div className="education reveal" id="education">
              <h3>Engineering & AI</h3>
              <ul>
                <li>
                  <strong>Applied AI Solutions Development</strong>
                  <span>
                    George Brown College · Post Graduate Diploma · 2025
                  </span>
                </li>
                <li>
                  <strong>Electrical & Computer Engineering</strong>
                  <span>University of Windsor · Master’s · 2023</span>
                </li>
                <li>
                  <strong>EXTC Engineering (Honours)</strong>
                  <span>University of Mumbai · Bachelor’s · 2021</span>
                </li>
              </ul>
            </div>
            <div className="community reveal" id="community">
              <h3>Beyond the desk</h3>
              <p>
                I contribute to GDG Ajax and ComUnity Canada, helping bring
                people together around technology and shared ideas.
              </p>
            </div>
          </div>
        </section>
        <section className="more-work frame" aria-labelledby="more-title">
          <h2 className="reveal" id="more-title">
            More to explore.
          </h2>
          <div>
            <a
              className="reveal"
              href="https://public.tableau.com/app/profile/akash.patel3574/viz/HR_Dashboard_17407938446160/HRSummary"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <strong>HR analytics</strong>
                <small>Tableau · 8,000 synthetic records</small>
              </span>
              <ArrowUpRightIcon />
            </a>
            <a
              className="reveal"
              href="https://app.powerbi.com/groups/me/reports/70948659-7e73-4758-80e2-a613f72bb106/8d5d9ba8102e05c81dcf?experience=power-bi"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <strong>Uber trip analytics</strong>
                <small>Power BI · Microsoft access may be required</small>
              </span>
              <ArrowUpRightIcon />
            </a>
          </div>
        </section>
      </main>
      <footer className="contact" id="contact">
        <div className="frame">
          <div className="contact-top">
            <h2 className="reveal">
              Let’s make
              <br />
              it useful.
            </h2>
            <div className="reveal">
              <p>
                Have a data challenge, an interesting role,
                <br />
                or an idea worth building?
              </p>
              <Button asChild>
                <a href="https://www.linkedin.com/in/akp09" target="_blank" rel="noreferrer">
                  Connect on LinkedIn
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>
          <div className="contact-email-row reveal">
            <div className="contact-address">
              <span className="contact-label">PREFER EMAIL?</span>
              <div className="contact-email-inline">
                <p className="contact-email">26akashpatel99@gmail.com</p>
                <button type="button" className="contact-copy" onClick={copyEmail} aria-label="Copy email address" title="Copy email address">
                  <CopyIcon aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="contact-copy-feedback">
            <p role="status" aria-live="polite">{copyStatus || "\u00a0"}</p>
            {copyStatus.startsWith("Copy unavailable") && <input ref={emailField} aria-label="Email address for manual copying" readOnly value="26akashpatel99@gmail.com" onFocus={(event) => event.target.select()} />}
          </div>
          <div className="footer-meta">
            <span>© {new Date().getFullYear()} Akash Patel · Toronto</span>
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/akp09"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <ArrowUpRightIcon />
              </a>
              <a
                href="https://github.com/Akashpatel2609"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <ArrowUpRightIcon />
              </a>
              <a href={resume} target="_blank" rel="noreferrer">
                Résumé
                <ArrowUpRightIcon />
              </a>
            </div>
            <Button
              variant="ghost"
              className="motion-control"
              onClick={() => setMotion(!motion)}
              disabled={reduced}
              aria-pressed={!moving}
              aria-label={
                reduced
                  ? "Reduced motion enabled by system"
                  : moving
                    ? "Pause motion"
                    : "Enable motion"
              }
            >
              {moving ? <PauseIcon /> : <PlayIcon />}
              {reduced ? "Reduced motion" : moving ? "Motion on" : "Motion off"}
            </Button>
            <a href="#top" className="back-top">
              Back to top
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
