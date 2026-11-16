import type { CareerData, CareerSectionId, PersonalDetails } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../../model/resume.types";

import type { ResumeTemplateContent } from "./template.types";

export function safeHttpUrl(value: string): string | null {
    try {
        const url = new URL(value.trim());

        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return null;
        };

        return url.href;
    } catch {
        return null;
    };
};

export function getResumeRole(targetRole: string, jobTitle: string): string {
    return targetRole.trim() || jobTitle.trim();
};

export function hasPersonalContent(personal: PersonalDetails, role: string): boolean {
    return Boolean(personal.fullName.trim() || role || personal.email.trim() || personal.phone.trim() || personal.location.trim());
};

export function getRenderableCareerData(data: CareerData) {
    const visibleExperience = data.experience.filter((item) => item.position.trim() || item.company.trim() || item.description.trim());

    const visibleEducation = data.education.filter((item) => item.institution.trim() || item.degree.trim() || item.fieldOfStudy.trim() || item.description.trim());

    const visibleProjects = data.projects
        .map((item) => ({
            ...item,
            technologies: item.technologies.map((technology) => technology.trim()).filter(Boolean),
        }))
        .filter((item) => item.name.trim() || item.role.trim() || item.description.trim() || item.websiteUrl.trim() || item.repositoryUrl.trim() || item.technologies.length > 0);

    const visibleSkillGroups = data.skills
        .map((group) => ({
            ...group,
            name: group.name.trim(),
            skills: group.skills.map((skill) => skill.trim()).filter(Boolean),
        }))
        .filter((group) => group.name.length > 0);

    const visibleLanguages = data.languages.filter((item) => item.name.trim());

    return {
        visibleExperience,
        visibleEducation,
        visibleProjects,
        visibleSkillGroups,
        visibleLanguages,
    };
};

export function getVisibleTemplateSections(sections: readonly ResumeSectionSetting[], content: ResumeTemplateContent): ResumeSectionSetting[] {
    return sections.filter((section) => section.visible && content[section.id] !== null);
};

export function getTemplateSectionNumber(visibleSections: readonly ResumeSectionSetting[], sectionId: CareerSectionId): number {
    const numberedSections = visibleSections.filter((section) => section.id !== "personal");

    return (
        numberedSections.findIndex((section) => section.id === sectionId) + 1
    );
};