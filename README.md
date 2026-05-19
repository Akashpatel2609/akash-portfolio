# Akash Patel Portfolio

A production-ready portfolio website for Akash Patel built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. The site uses a dark premium AI/data visual system with bento sections, geometric dashboard-inspired UI, animated grid background, glowing card borders, and fully responsive layouts.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Static profile data from `src/data/profile.ts`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Useful Commands

```bash
npm run typecheck
npm run lint
npm run build
```

## Content Updates

All portfolio copy lives in:

```text
src/data/profile.ts
```

Update the profile data there to change hero copy, skills, projects, experience, achievements, contact links, SEO metadata, and resume download content.

## Deployment

This project is ready for Vercel:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js framework settings.
4. Deploy.

The resume button uses the `/resume` route to generate a downloadable text resume from the same static profile data.
