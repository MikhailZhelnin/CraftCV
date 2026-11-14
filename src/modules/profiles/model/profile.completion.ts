import { CAREER_SECTION_LABELS, type CareerData, type CareerSectionId } from "@/modules/career-data";

export interface ProfileCompletionSection {
    id: CareerSectionId;
    label: string;
    weight: number;
    earned: number;
    completed: boolean;
};

export interface ProfileCompletionResult {
    percentage: number;
    completedSections: number;
    totalSections: number;
    sections: ProfileCompletionSection[];
};

const isFilled = (value: string) => value.trim().length > 0;

export function calculateProfileCompleteness(data: CareerData): ProfileCompletionResult {
    const { personal } = data;

    const personalChecks = [isFilled(personal.fullName), isFilled(personal.jobTitle), isFilled(personal.email) || isFilled(personal.phone), isFilled(personal.location)];

    // 4 checks × 5 points = 20%
    const personalPoints = personalChecks.filter(Boolean).length * 5;

    const sectionScores: { id: CareerSectionId; weight: number; earned: number; }[] = [
        {
            id: "personal",
            weight: 20,
            earned: personalPoints,
        },
        {
            id: "summary",
            weight: 10,
            earned: isFilled(data.summary) ? 10 : 0,
        },
        {
            id: "experience",
            weight: 25,
            earned: data.experience.some((item) => isFilled(item.position) && isFilled(item.company)) ? 25 : 0,
        },
        {
            id: "education",
            weight: 10,
            earned: data.education.some((item) => isFilled(item.institution)) ? 10 : 0,
        },
        {
            id: "skills",
            weight: 15,
            earned: data.skills.some(isFilled) ? 15 : 0,
        },
        {
            id: "projects",
            weight: 10,
            earned: data.projects.some((item) => isFilled(item.name)) ? 10 : 0,
        },
        {
            id: "languages",
            weight: 10,
            earned: data.languages.some((item) => isFilled(item.name) && isFilled(item.level)) ? 10 : 0,
        },
    ];

    const sections: ProfileCompletionSection[] = sectionScores.map(({ id, weight, earned }) => ({ id, label: CAREER_SECTION_LABELS[id], weight, earned, completed: earned === weight }));

    const percentage = sections.reduce((total, section) => total + section.earned, 0);

    return {
        percentage,
        completedSections: sections.filter((section) => section.completed).length,
        totalSections: sections.length,
        sections,
    };
};