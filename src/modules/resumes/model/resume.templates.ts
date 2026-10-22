export const RESUME_TEMPLATE_IDS = ["classic", "modern"] as const;

export type ResumeTemplateId = (typeof RESUME_TEMPLATE_IDS)[number];

export interface ResumeTemplateInfo {
    id: ResumeTemplateId;
    name: string;
    description: string;
};

export const RESUME_TEMPLATES: ResumeTemplateInfo[] = [
    {
        id: "classic",
        name: "Classic",
        description: "Clean, traditional and professional.",
    },
    {
        id: "modern",
        name: "Modern",
        description: "Contemporary design with blue accents.",
    },
];

export const DEFAULT_RESUME_TEMPLATE: ResumeTemplateId = "classic";