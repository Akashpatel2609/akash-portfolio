import {
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Medal,
  Network,
  Sparkles,
  Users,
  Workflow
} from "lucide-react";

export const profile = {
  seo: {
    title: "Akash Patel | Data Analyst, BI Developer & Applied AI Portfolio",
    description:
      "Portfolio of Akash Patel, a Toronto-based Data Analyst specializing in Power BI, SQL, Python, ETL automation, Vena reporting, executive dashboards, and applied AI analytics systems.",
    canonical: "https://akashpatel.tech",
    image: "/images/akash-patel-profile.png"
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    eyebrow: "Toronto-based Data Analyst / BI Developer / Applied AI Builder",
    brandMark: "AP",
    profileImage: "/images/akash-patel-profile.png",
    profileImageAlt: "Akash Patel professional headshot",
    dashboardLabel: "Executive analytics system",
    name: "Akash Patel",
    title: "Data Analyst | BI Developer | Applied AI Builder",
    headline:
      "I turn fragmented business data into executive-ready dashboards, automated reporting pipelines, and AI-powered decision systems.",
    subheadline:
      "Currently building finance, operations, forecasting, margin, resource planning, and risk analytics workflows using Power BI, SQL, Power Query, SharePoint, Vena, and applied AI.",
    actions: [
      { label: "View Work", href: "#projects", variant: "primary" },
      { label: "Download Resume", href: "https://drive.google.com/file/d/1FANhCK1ZFiM6nL9dZgXHJmaNse3jFmW_/view?usp=sharing", variant: "secondary" },
      { label: "Contact Me", href: "#contact", variant: "ghost" }
    ]
  },
  impactMetrics: [
    { value: "10+", label: "Power BI dashboards launched" },
    { value: "6-8 hrs/week", label: "Manual reporting reduced" },
    { value: "34.7M", label: "Records processed" },
    { value: "70%", label: "Data prep time reduced" }
  ],
  sections: {
    impact: {
      id: "impact",
      label: "Impact Metrics",
      eyebrow: "Measured impact",
      title: "Proof points recruiters can scan in seconds."
    },
    about: {
      id: "about",
      label: "About",
      eyebrow: "About",
      title: "Business intelligence, data engineering, and applied AI with measurable outcomes.",
      body:
        "I combine business intelligence, data engineering, and applied AI to build reporting systems that help teams move from scattered data to clear action. My work spans executive dashboards, FP&A reporting, operational KPI tracking, ETL automation, and AI-powered analytics workflows across finance, operations, and construction analytics.",
      highlights: [
        "Executive dashboards and KPI storytelling",
        "ETL automation across SQL, Power Query, SharePoint, and Vena",
        "Applied AI workflows for analytics and operations"
      ]
    },
    experience: {
      id: "experience",
      label: "Featured Experience",
      eyebrow: "Featured experience",
      title: "Building reporting systems for finance, operations, and leadership."
    },
    projects: {
      id: "projects",
      label: "Featured Projects",
      eyebrow: "Selected work",
      title: "Projects with concrete data, systems, and business outcomes."
    },
    skills: {
      id: "skills",
      label: "Skills",
      eyebrow: "Technical stack",
      title: "A practical analytics toolkit for BI, engineering, AI, and business execution."
    },
    education: {
      id: "education",
      label: "Education",
      eyebrow: "Education",
      title: "Academic foundation across applied AI, engineering, and analytics."
    },
    community: {
      id: "community",
      label: "Community & Leadership",
      eyebrow: "Community & leadership",
      title: "Contributing to technical communities and analytics-driven growth."
    },
    achievements: {
      id: "achievements",
      label: "Achievements",
      eyebrow: "Recognition",
      title: "Hackathon results, academic recognition, and measurable model performance."
    },
    contact: {
      id: "contact",
      label: "Contact",
      eyebrow: "Contact",
      title: "Let's build analytics systems leadership can act on.",
      body:
        "Open to Data Analyst, BI Analyst, Data Engineer, and Applied AI roles."
    }
  },
  skills: [
    {
      group: "BI & Reporting",
      icon: BarChart3,
      items: ["Power BI", "DAX", "Tableau", "Vena", "Excel", "KPI Design", "Dashboard Storytelling"]
    },
    {
      group: "Data Engineering",
      icon: Database,
      items: ["SQL", "PySpark", "Databricks", "Snowflake", "SSIS", "ETL Pipelines", "Power Query", "Data Modeling"]
    },
    {
      group: "AI & Machine Learning",
      icon: BrainCircuit,
      items: ["Python", "Machine Learning", "Statistical Modeling", "A/B Experimentation", "NLP", "LLM Workflows"]
    },
    {
      group: "Cloud & Tools",
      icon: Cloud,
      items: ["AWS", "Azure", "GCP", "GitHub", "Docker", "Alteryx"]
    },
    {
      group: "Business Strengths",
      icon: Users,
      items: ["Cross-functional Collaboration", "Process Improvement", "Problem Solving", "Executive Storytelling"]
    }
  ],
  projects: [
    {
      slug: "prepwise-ai-mock-interview-platform",
      title: "PrepWise - AI-Powered Mock Interview Platform",
      icon: Bot,
      description:
        "Built a real-time AI interview platform using Whisper, MediaPipe, FastAPI, WebSockets, and Docker to analyze live interview performance and deliver instant multi-modal feedback.",
      impact:
        "Enabled instant feedback across speech, visual cues, and interview performance signals.",
      tools: ["Whisper", "MediaPipe", "FastAPI", "WebSockets", "Docker", "Python"],
      cta: "View PrepWise Case Study",
      caseStudy: {
        problem:
          "Interview preparation often lacks immediate, structured feedback across spoken answers, delivery, and non-verbal performance cues.",
        architecture:
          "A real-time web application streams interview sessions through WebSockets, routes speech through Whisper, extracts visual cues with MediaPipe, and serves feedback through FastAPI containers.",
        process: [
          "Designed the live feedback workflow for speech, visual, and performance signals.",
          "Integrated AI and computer vision services behind a FastAPI interface.",
          "Containerized the application with Docker for repeatable local and deployment environments."
        ],
        metrics: ["Real-time feedback loop", "Multi-modal analysis", "Containerized delivery"],
        businessImpact:
          "Created a practical applied-AI product that turns mock interviews into actionable coaching sessions.",
        repository: "https://github.com/Akashpatel2609/PrepWise",
        demo: "https://github.com/Akashpatel2609/PrepWise"
      }
    },
    {
      slug: "maple-reinders-executive-analytics",
      title: "Maple Reinders Executive Analytics",
      icon: BriefcaseBusiness,
      description:
        "Built Power BI dashboards and reporting workflows across finance, operations, forecasting, margin, resource planning, operational KPI, and risk use cases.",
      impact:
        "Launched 10+ dashboards and reduced recurring manual reporting from 6-8 hours/week to refresh-ready updates.",
      tools: ["Power BI", "DAX", "SQL", "Power Query", "SharePoint", "Vena"],
      cta: "View Executive Analytics Case Study",
      caseStudy: {
        problem:
          "Leadership reporting depended on scattered Excel files and recurring manual preparation across finance and operations workflows.",
        architecture:
          "Power BI dashboards connected to SQL, Power Query, SharePoint, scheduled refreshes, and Vena reporting pipelines.",
        process: [
          "Mapped executive reporting needs across forecasting, margin, resource planning, KPI, and risk workflows.",
          "Automated refresh-ready pipelines to reduce recurring manual reporting.",
          "Designed dashboards that made operational and financial variance easier to review."
        ],
        metrics: ["10+ dashboards launched", "6-8 hrs/week manual reporting reduced", "15-20 minute Vena loads"],
        businessImpact:
          "Improved executive visibility across financial and operational performance while reducing manual reporting effort.",
        repository: "Internal work - repository unavailable",
        demo: "Screenshots available on request"
      }
    },
    {
      slug: "amazon-reviews-etl-pipeline",
      title: "Amazon Reviews ETL Pipeline",
      icon: Workflow,
      description:
        "Processed 34.7M JSON review records using Pig, Hive, SSIS, SQL Server, and Power BI to create analysis-ready datasets for sentiment and product trend reporting.",
      impact: "Reduced stakeholder data preparation time by 70%.",
      tools: ["Pig", "Hive", "SSIS", "SQL Server", "Power BI", "Big Data ETL"],
      cta: "View Amazon ETL Case Study",
      caseStudy: {
        problem:
          "Large-scale JSON review data was too raw and noisy for fast stakeholder analysis or reporting.",
        architecture:
          "A big data ETL pipeline using Pig and Hive for processing, SSIS and SQL Server for structured loads, and Power BI for reporting.",
        process: [
          "Processed nested JSON review records into structured analytical tables.",
          "Built ETL transformations for sentiment and product trend reporting.",
          "Created Power BI outputs for stakeholder-ready exploration."
        ],
        metrics: ["34.7M records processed", "70% data prep time reduction", "Analysis-ready reporting dataset"],
        businessImpact:
          "Reduced preparation time and enabled faster review trend analysis from large-scale customer feedback.",
        repository: "",
        demo: "https://app.powerbi.com/groups/me/reports/ad3635ea-f1f3-47f5-a5c2-936a4073bfdd/38e0b2f42920542e9818?experience=power-bi"
      }
    },
    {
      slug: "uber-trip-analytics",
      title: "Uber Trip Analytics",
      icon: Network,
      description:
        "Developed an end-to-end Power BI analytics solution with star schema modeling and DAX to analyze raw trip logs, demand patterns, vehicle utilization, and revenue opportunities.",
      impact:
        "Identified opportunities to reallocate underutilized vehicles into peak demand windows.",
      tools: ["Power BI", "DAX", "Star Schema", "Power Query", "Data Visualization"],
      cta: "View Uber Analytics Case Study",
      caseStudy: {
        problem:
          "Raw trip logs made it difficult to understand demand timing, vehicle utilization, and revenue opportunities.",
        architecture:
          "A Power BI model built with star schema design, Power Query transformations, and DAX measures for utilization and demand analysis.",
        process: [
          "Modeled raw trip logs into fact and dimension tables.",
          "Built DAX measures for demand, utilization, and revenue exploration.",
          "Created visual workflows for peak window and vehicle allocation analysis."
        ],
        metrics: ["Star schema model", "Demand pattern analysis", "Vehicle utilization insights"],
        businessImpact:
          "Identified opportunities to shift underutilized vehicle capacity into higher-demand windows.",
        repository: "",
        demo: "https://app.powerbi.com/groups/me/reports/70948659-7e73-4758-80e2-a613f72bb106/8d5d9ba8102e05c81dcf?experience=power-bi"
      }
    },
    {
      slug: "hr-analytics-dashboard",
      title: "HR Analytics Dashboard",
      icon: BarChart3,
      description:
        "Created an optimized Tableau data model from an 8,000-row HR dataset generated with Python to analyze attrition patterns and leadership workforce insights.",
      impact:
        "Reduced manual reporting and accelerated root-cause analysis for employee attrition.",
      tools: ["Tableau", "Python", "Data Modeling", "HR Analytics"],
      cta: "View HR Analytics Case Study",
      caseStudy: {
        problem:
          "HR stakeholders needed a faster way to explore attrition drivers and workforce patterns without repetitive manual reporting.",
        architecture:
          "A Tableau dashboard backed by a Python-generated HR dataset and an optimized analytical data model.",
        process: [
          "Generated and shaped an 8,000-row HR dataset with Python.",
          "Designed an analytics model for attrition, department, role, and workforce segmentation.",
          "Built Tableau views for leadership exploration and root-cause analysis."
        ],
        metrics: ["8,000-row HR dataset", "Attrition analysis", "Leadership dashboard"],
        businessImpact:
          "Reduced manual reporting and helped leaders identify workforce attrition patterns faster.",
        repository: "",
        demo: "https://public.tableau.com/app/profile/akash.patel3574/viz/HR_Dashboard_17407938446160/HRSummary"
      }
    }
  ],
  experience: [
    {
      role: "Data Analyst",
      company: "Maple Reinders",
      location: "Toronto, ON",
      date: "2025 - Present",
      icon: BriefcaseBusiness,
      summary:
        "Building analytics and reporting systems across Finance, Operations, and Leadership to improve visibility into forecasting, margin, resource planning, operational KPIs, and risk workflows.",
      bullets: [
        "Launched 10+ Power BI dashboards across forecasting, margin, resource planning, operational KPI, and risk workflows, replacing Excel-based executive reporting.",
        "Automated SQL, Power Query, SharePoint, and scheduled Power BI refresh workflows, reducing recurring manual reporting from 6-8 hours/week to refresh-ready updates.",
        "Implemented a scheduled Vena ETL pipeline from MySQL to CSV loads, reducing FP&A reporting effort from 3-4 hours to 15-20 minutes.",
        "Identified a critical operational issue in a WWMS through sensor data interpretation, helping avert a potential 7-day project delay.",
        "Contributed to AI committee initiatives by evaluating AI agents and automation opportunities for contract review, scope identification, estimation, scraping, and operational workflows."
      ]
    }
  ],
  education: [
    {
      school: "George Brown College",
      location: "Toronto, ON",
      credential: "Post Graduate Diploma in Applied AI Solutions Development",
      year: "2025",
      result: "GPA: 3.86/4.0",
      icon: GraduationCap
    },
    {
      school: "University of Windsor",
      location: "Windsor, ON",
      credential: "Master's in Electrical and Computer Engineering",
      year: "2023",
      result: "GPA: 3.9/4.0",
      icon: GraduationCap
    },
    {
      school: "University of Mumbai",
      location: "Mumbai, India",
      credential: "Bachelor's in EXTC Engineering (Honours)",
      year: "2021",
      result: "CGPA: 8/10",
      icon: GraduationCap
    }
  ],
  community: [
    {
      organization: "Google Developer Group, GDG Ajax",
      role: "Sub-Committee Associate",
      date: "2025 - Present",
      icon: Users,
      bullets: [
        "Co-organized technical workshops with Google Developer Experts and 10+ speakers across AI and cloud infrastructure topics.",
        "Managed event logistics and communications for 100+ attendees."
      ]
    },
    {
      organization: "ComUnity Canada",
      role: "Social Media Analyst",
      date: "2025 - Present",
      icon: Sparkles,
      bullets: [
        "Analyzed social media engagement metrics to improve content strategy and community reach.",
        "Supported promotional campaigns to increase event visibility and attendee registration."
      ]
    }
  ],
  achievements: [
    {
      title: "3rd Place, HackTheBrain Hackathon",
      icon: Medal,
      metrics: ["3rd Place", "Toronto Techfest", "2025"],
      description:
        "Placed third in HackTheBrain Hackathon with ComUnity Canada at Toronto Techfest."
    },
    {
      title: "Two-Time Dean's List Recipient",
      icon: Medal,
      metrics: ["Dean's List", "Two-time recipient", "2025"],
      description:
        "Recognized twice for exceptional academic achievement."
    },
    {
      title: "CrowdStrike Data Science Hackathon Runner-Up",
      icon: Medal,
      metrics: ["Runner-Up", "Top 2%", "95% model accuracy"],
      description:
        "Runner-up in the CrowdStrike Data Science Hackathon hosted by TechGig in 2020."
    }
  ],
  contact: {
    location: "Toronto, ON",
    email: "26akashpatel99@gmail.com",
    linkedin: "http://www.linkedin.com/in/akp09",
    github: "https://github.com/Akashpatel2609",
    resume: "https://drive.google.com/file/d/1FANhCK1ZFiM6nL9dZgXHJmaNse3jFmW_/view?usp=sharing",
    links: [
      { label: "Location", value: "Toronto, ON", href: "#contact", icon: MapPin },
      { label: "Email", value: "26akashpatel99@gmail.com", href: "mailto:26akashpatel99@gmail.com", icon: Mail },
      { label: "LinkedIn", value: "linkedin.com/in/akp09", href: "http://www.linkedin.com/in/akp09", icon: Linkedin },
      { label: "GitHub", value: "github.com/Akashpatel2609", href: "https://github.com/Akashpatel2609", icon: Github }
    ]
  }
} as const;

export type Profile = typeof profile;
export type Project = (typeof profile.projects)[number];
