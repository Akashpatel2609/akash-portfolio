import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BentoCard } from "@/components/bento-card";
import { profile } from "@/data/profile";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getProject(slug: string) {
  return profile.projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return profile.projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: profile.seo.title
    };
  }

  return {
    title: `${project.title} | Akash Patel`,
    description: project.description,
    alternates: {
      canonical: `${profile.seo.canonical}/projects/${project.slug}`
    },
    openGraph: {
      title: `${project.title} | Akash Patel`,
      description: project.description,
      url: `${profile.seo.canonical}/projects/${project.slug}`,
      images: [profile.seo.image]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const Icon = project.icon;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/25 hover:text-white"
        aria-label="Back to featured projects"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <BentoCard className="min-h-96">
          <div className="mb-8 grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.075] text-white">
            <Icon size={28} />
          </div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
            Case study
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">{project.description}</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm font-semibold text-white">Business Impact</p>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{project.impact}</p>
          </div>
        </BentoCard>

        <BentoCard>
          <p className="text-sm font-semibold text-white">Tools</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {project.caseStudy.metrics.map((metric) => (
              <div key={metric} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm font-semibold text-white">{metric}</p>
              </div>
            ))}
          </div>
        </BentoCard>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <CaseBlock title="Problem" body={project.caseStudy.problem} />
        <CaseBlock title="Data / Architecture" body={project.caseStudy.architecture} />
        <BentoCard>
          <h2 className="text-2xl font-semibold text-white">Process</h2>
          <div className="mt-5 space-y-3">
            {project.caseStudy.process.map((step) => (
              <p key={step} className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-7 text-zinc-400">
                {step}
              </p>
            ))}
          </div>
        </BentoCard>
        <CaseBlock title="Business Impact" body={project.caseStudy.businessImpact} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <BentoCard>
          <h2 className="text-2xl font-semibold text-white">Screenshots</h2>
          <div className="mt-5 grid min-h-56 place-items-center rounded-2xl border border-dashed border-white/15 bg-black/30 p-6 text-center text-sm text-zinc-500">
            Screenshots placeholder
          </div>
        </BentoCard>
        <BentoCard>
          <h2 className="text-2xl font-semibold text-white">GitHub / Demo</h2>
          <div className="mt-5 space-y-3">
            <PlaceholderLink label="GitHub" value={project.caseStudy.repository} />
            <PlaceholderLink label="Demo" value={project.caseStudy.demo} />
          </div>
        </BentoCard>
      </section>
    </main>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <BentoCard>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-5 text-sm leading-7 text-zinc-400">{body}</p>
    </BentoCard>
  );
}

function PlaceholderLink({ label, value }: { label: string; value: string }) {
  const hasUrl = value.startsWith("http");
  const content = (
    <>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 break-all text-sm text-zinc-400">
          {value || "Not publicly available"}
        </p>
      </div>
      <ExternalLink className="shrink-0 text-zinc-500" size={18} />
    </>
  );

  if (!hasUrl) {
    return (
      <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
        {content}
      </div>
    );
  }

  return (
    <a
      href={value}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${label} for ${value}`}
      className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/25 hover:bg-white/[0.055]"
    >
      {content}
    </a>
  );
}
