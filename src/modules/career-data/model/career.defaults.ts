import type { CareerData, Education, Experience, Project, SpokenLanguage, SkillGroup } from "./career.types";

export function createEmptyExperience(): Experience {
    return {
        id: crypto.randomUUID(),
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
    };
};

export const createEmptyEducation = (): Education => ({
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
});

export const createEmptyProject = (): Project => ({
    id: crypto.randomUUID(),
    name: "",
    role: "",
    websiteUrl: "",
    repositoryUrl: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    technologies: [],
});

export const createEmptyLanguage = (): SpokenLanguage => ({
    id: crypto.randomUUID(),
    name: "",
    level: "",
});

export function createEmptySkillGroup(name = ""): SkillGroup {
    return {
        id: crypto.randomUUID(),
        name,
        skills: [],
    };
};

export function createEmptyCareerData(): CareerData {
    return {
        personal: {
            fullName: "",
            jobTitle: "",
            email: "",
            phone: "",
            location: "",
        },
        summary: "",
        experience: [],
        education: [],
        skills: [createEmptySkillGroup("Professional Skills")],
        projects: [],
        languages: [],
    };
};