import { profile } from "@/data/profile";

export function GET() {
  const lines = [
    profile.hero.name,
    profile.hero.title,
    "",
    profile.hero.headline,
    "",
    profile.hero.subheadline,
    "",
    profile.sections.skills.label,
    ...profile.skills.flatMap((skill) => [
      `${skill.group}: ${skill.items.join(", ")}`
    ]),
    "",
    profile.sections.experience.label,
    ...profile.experience.flatMap((item) => [
      `${item.role}, ${item.company} - ${item.location} - ${item.date}`,
      item.summary,
      ...item.bullets.map((bullet) => `- ${bullet}`)
    ]),
    "",
    profile.sections.education.label,
    ...profile.education.map(
      (item) => `${item.school}, ${item.location}: ${item.credential}, ${item.year}. ${item.result}`
    ),
    "",
    profile.sections.community.label,
    ...profile.community.flatMap((item) => [
      `${item.role}, ${item.organization} - ${item.date}`,
      ...item.bullets.map((bullet) => `- ${bullet}`)
    ]),
    "",
    profile.sections.achievements.label,
    ...profile.achievements.map(
      (achievement) =>
        `${achievement.title}: ${achievement.metrics.join(", ")}. ${achievement.description}`
    ),
    "",
    profile.sections.projects.label,
    ...profile.projects.map(
      (project) =>
        `${project.title}: ${project.description} Tools: ${project.tools.join(", ")} Impact: ${project.impact}`
    ),
    "",
    profile.sections.contact.label,
    profile.contact.email,
    profile.contact.linkedin,
    profile.contact.github
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Akash-Patel-Resume.txt"'
    }
  });
}
