export const RESUME_TEMPLATE_IDS = ["classic", "modern", "editorial", "swiss", "olive", "outline", "bauhaus", "ledger", "nordic", "studio", "modular", "kinetic", "gridline"] as const;

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
    {
        id: "editorial",
        name: "Editorial",
        description: "Expressive typography, warm tones and refined layouts.",
    },
    {
        id: "swiss",
        name: "Swiss Grid",
        description: "Bold typography, asymmetric grid and cobalt accents."
    },
    {
        id: "olive",
        name: "Olive Sidebar",
        description: "Forest green panels, elegant typography and a structured layout.",
    },
    {
        id: "outline",
        name: "Outline",
        description: "Elegant outlined sections, refined typography and soft violet accents.",
    },
    {
        id: "bauhaus",
        name: "Bauhaus",
        description: "Geometric layout, warm paper tone and bold terracotta accents.",
    },
    {
        id: "ledger",
        name: "Ledger",
        description: "Refined typography, structured rows and elegant warm-gray details.",
    },
    {
        id: "nordic",
        name: "Nordic",
        description: "Scandinavian minimalism, gentle sage accents and airy typography.",
    },
    {
        id: "studio",
        name: "Studio",
        description: "Expressive typography, sharp contrasts and a print-ready layout.",
    },
    {
        id: "modular",
        name: "Modular",
        description: "Color-block composition, geometric typography and modular A4 sections.",
    },
    {
        id: "kinetic",
        name: "Kinetic",
        description: "Expressive asymmetric typography, vivid violet and mint highlights.",
    },
    {
        id: "gridline",
        name: "Gridline",
        description: "Architectural grids, visible rules and bold typographic structure.",
    },
];

export const DEFAULT_RESUME_TEMPLATE: ResumeTemplateId = "classic";