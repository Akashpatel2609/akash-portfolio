import {
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Database,
  Github,
  Linkedin,
  Mail,
  Medal,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

export const profile = {
  seo: {
    title: "Akash Patel | AI Analytics Portfolio",
    description:
      "Portfolio for Akash Patel, a Data Analyst building AI-powered analytics systems, business intelligence dashboards, and automation workflows."
  },
  nav: ["About", "Skills", "Projects", "Experience", "Achievements", "Contact"],
  hero: {
    eyebrow: "AI Analytics Portfolio",
    brandMark: "AP",
    profileImage: "/images/akash-patel-profile.png",
    dashboardLabel: "Live analytics layer",
    name: "Akash Patel",
    headline:
      "Building AI-powered analytics systems that turn business data into decisions.",
    subheadline:
      "Data Analyst specializing in Power BI, SQL, Python, AI workflows, and business intelligence across finance, operations, and construction analytics.",
    stats: [
      { value: "95%", label: "Model accuracy" },
      { value: "Top 2%", label: "Hackathon finish" },
      { value: "5", label: "Featured systems" }
    ],
    actions: [
      { label: "View Projects", href: "#projects", variant: "primary" },
      { label: "Download Resume", href: "/resume", variant: "secondary" },
      { label: "Contact Me", href: "#contact", variant: "ghost" }
    ]
  },
  sections: {
    about: {
      id: "about",
      label: "About",
      eyebrow: "Decision systems",
      title: "AI, analytics, and business intelligence in one operating layer.",
      body:
        "Akash combines AI, analytics, and business intelligence to build dashboards, automation workflows, and decision-support systems that help teams move from raw data to clear action. His work connects business context with technical execution across finance, operations, and construction analytics.",
      highlights: [
        "Executive-ready reporting systems",
        "Automated analytics workflows",
        "Clear narratives from complex datasets"
      ]
    },
    skills: {
      id: "skills",
      label: "Skills",
      eyebrow: "Technical stack",
      title: "A focused toolkit for modern analytics delivery."
    },
    projects: {
      id: "projects",
      label: "Featured Projects",
      eyebrow: "Selected work",
      title: "Premium analytics systems built for clarity, speed, and impact."
    },
    experience: {
      id: "experience",
      label: "Experience",
      eyebrow: "Applied impact",
      title: "Analytics work shaped around executive decisions."
    },
    achievements: {
      id: "achievements",
      label: "Achievements",
      eyebrow: "Recognition",
      title: "Competitive data science results with measurable performance."
    },
    contact: {
      id: "contact",
      label: "Contact",
      eyebrow: "Work together",
      title: "Let's build analytics that leadership can act on.",
      body:
        "Reach out for AI analytics systems, Power BI dashboards, ETL pipelines, or business intelligence workflows."
    }
  },
  skills: [
    {
      group: "AI & Machine Learning",
      icon: BrainCircuit,
      items: ["AI workflows", "Machine learning", "Model evaluation", "Research automation"]
    },
    {
      group: "Analytics & BI",
      icon: BarChart3,
      items: ["Power BI", "DAX", "Executive dashboards", "Vena reporting"]
    },
    {
      group: "Data Engineering",
      icon: Database,
      items: ["SQL", "Python", "ETL pipelines", "Data modeling"]
    },
    {
      group: "Cloud & Modern Data Stack",
      icon: Cloud,
      items: ["Cloud analytics", "Modern BI workflows", "Automation", "Versioned delivery"]
    }
  ],
  projects: [
    {
      title: "AI Research Assistant",
      icon: Bot,
      description:
        "A guided research workflow that summarizes sources, extracts insights, and turns exploratory questions into structured decision briefs.",
      tools: ["Python", "LLMs", "Automation", "Prompt systems"],
      impact: "Reduced manual research cycles and improved insight consistency.",
      cta: "View Case Study"
    },
    {
      title: "Construction Resource Planning Dashboard",
      icon: Network,
      description:
        "A Power BI planning layer for construction operations, resource visibility, and project-level performance monitoring.",
      tools: ["Power BI", "DAX", "Operations analytics", "Forecasting"],
      impact: "Gave teams a clearer view of capacity, utilization, and project needs.",
      cta: "View Case Study"
    },
    {
      title: "Amazon Reviews ETL Pipeline",
      icon: Workflow,
      description:
        "A repeatable ETL system for cleaning, transforming, and preparing product review data for sentiment and trend analysis.",
      tools: ["Python", "SQL", "ETL", "Data quality"],
      impact: "Created analysis-ready datasets from noisy customer feedback.",
      cta: "View Case Study"
    },
    {
      title: "Banking Risk Analysis Dashboard",
      icon: ShieldCheck,
      description:
        "A risk-focused dashboard that surfaces portfolio patterns, exposure signals, and banking decision metrics.",
      tools: ["Power BI", "SQL", "Risk analytics", "KPI design"],
      impact: "Improved visibility into high-priority risk indicators.",
      cta: "View Case Study"
    },
    {
      title: "Smart News Analyzer",
      icon: Sparkles,
      description:
        "An AI-assisted news intelligence tool that filters stories, identifies themes, and supports faster market awareness.",
      tools: ["Python", "NLP", "AI workflows", "Dashboards"],
      impact: "Turned scattered news inputs into concise, decision-ready signals.",
      cta: "View Case Study"
    }
  ],
  experience: [
    {
      role: "Data Analyst Co-op",
      company: "Maple Reinders",
      icon: BriefcaseBusiness,
      summary:
        "Built finance and operations analytics for leaders using Power BI dashboards, Vena reporting, and executive reporting workflows.",
      bullets: [
        "Designed Power BI dashboards for operational and financial performance tracking.",
        "Supported Vena reporting and improved finance-operation reporting workflows.",
        "Contributed to AI committee work by evaluating practical analytics and automation opportunities.",
        "Produced executive analytics that translated business data into clearer decisions."
      ]
    }
  ],
  achievements: [
    {
      title: "CrowdStrike Data Science Hackathon Runner-Up",
      icon: Medal,
      metrics: ["Runner-Up", "Top 2%", "95% model accuracy"],
      description:
        "Recognized for a high-performing data science solution with strong model accuracy and competitive placement."
    }
  ],
  contact: {
    email: "26akashpatel99@gmail.com",
    linkedin: "http://www.linkedin.com/in/akp09",
    github: "https://github.com/Akashpatel2609",
    resume: "/resume",
    links: [
      { label: "Email", value: "26akashpatel99@gmail.com", href: "mailto:26akashpatel99@gmail.com", icon: Mail },
      { label: "LinkedIn", value: "linkedin.com/in/akp09", href: "http://www.linkedin.com/in/akp09", icon: Linkedin },
      { label: "GitHub", value: "github.com/Akashpatel2609", href: "https://github.com/Akashpatel2609", icon: Github }
    ]
  }
} as const;

export type Profile = typeof profile;
