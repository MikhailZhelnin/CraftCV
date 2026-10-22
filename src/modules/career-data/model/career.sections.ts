export const CAREER_SECTION_IDS = [
    "personal",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "languages",
] as const;

export type CareerSectionId = (typeof CAREER_SECTION_IDS)[number];

export const CAREER_SECTION_LABELS: Record<CareerSectionId, string> = {
    personal: "Personal Details",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    languages: "Languages",
};