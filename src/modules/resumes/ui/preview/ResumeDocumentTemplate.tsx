import type { ReactNode } from "react";

import type { CareerData, CareerSectionId } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../../model/resume.types";

import type { ResumeTemplateId } from "../../model/resume.templates";

import { formatResumePeriod } from "./formatResumeDate";

interface ResumeDocumentTemplateProps {
    data: CareerData;
    targetRole: string;
    sections: ResumeSectionSetting[];
    templateId: ResumeTemplateId;
}

interface SectionProps {
    title: string;
    children: ReactNode;
    templateId: ResumeTemplateId;
};

function ResumeSection({ title, children, templateId }: SectionProps) {
    const isModern = templateId === "modern";

    return (
        <section className="cv-section space-y-3">
            <h2
                className={
                    isModern
                        ? "cv-section-heading border-l-4 border-blue-600 pl-3 text-[12px] font-bold uppercase tracking-[0.12em] text-blue-800"
                        : "cv-section-heading border-b border-slate-300 pb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-800"
                }
            >
                {title}
            </h2>

            {children}
        </section>
    );
};

function Description({ children }: { children: string }) {
    if (!children.trim()) return null;

    return (
        <p className="whitespace-pre-line text-[12px] leading-[1.65] text-slate-600">{children}</p>
    );
};

function safeHttpUrl(value: string): string | null {
    try {
        const url = new URL(value);

        return ["http:", "https:"].includes(url.protocol) ? url.href : null;
    } catch {
        return null;
    };
};

export function ResumeDocumentTemplate({ data, targetRole, sections, templateId }: ResumeDocumentTemplateProps) {
    const { personal, summary, experience, education, skills, projects, languages } = data;

    const contactItems = [personal.location, personal.phone, personal.email].filter(Boolean);

    const role = targetRole || personal.jobTitle;

    const hasPersonalContent = Boolean(personal.fullName.trim() || role.trim() || contactItems.length);

    const experiences = experience.filter((item) => item.position.trim() || item.company.trim() || item.description.trim());
    const educations = education.filter((item) => item.institution.trim() || item.degree.trim() || item.fieldOfStudy.trim());
    const visibleProjects = projects.filter((item) => item.name.trim() || item.role.trim() || item.description.trim());
    const visibleLanguages = languages.filter((item) => item.name.trim());
    const visibleSkills = skills.filter((skill) => skill.trim());

    const content: Record<CareerSectionId, ReactNode> = {
        personal: hasPersonalContent ? (
            <header className={templateId === "modern" ? "space-y-2 rounded-lg bg-slate-900 px-6 py-6" : "space-y-2 border-b-2 border-slate-800 pb-5"}>
                {personal.fullName && (
                    <h1 className={templateId === "modern" ? "wrap-break-word text-[30px] font-bold tracking-tight text-white" : "wrap-break-word text-[30px] font-bold tracking-tight text-slate-950"}>
                        {personal.fullName}
                    </h1>
                )}

                {role && (
                    <p className={templateId === "modern" ? "text-[15px] font-medium text-blue-200" : "text-[15px] font-medium text-slate-600"}>
                        {role}
                    </p>
                )}

                {contactItems.length > 0 && (
                    <p className={templateId === "modern" ? "wrap-break-word text-[11px] leading-relaxed text-slate-300" : "wrap-break-word text-[11px] leading-relaxed text-slate-500"}>
                        {contactItems.join("  ·  ")}
                    </p>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <ResumeSection title="Professional Summary" templateId={templateId}>
                <Description>{summary}</Description>
            </ResumeSection>
        ) : null,

        experience: experiences.length > 0 ? (
            <ResumeSection title="Work Experience" templateId={templateId}>
                <div className="space-y-4">
                    {experiences.map((item) => {
                        const period = formatResumePeriod(item);

                        return (
                            <div key={item.id} className="cv-entry space-y-1.5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        {item.position && (
                                            <h3 className="text-[13px] font-semibold text-slate-900">{item.position}</h3>
                                        )}

                                        {item.company && (
                                            <p className="text-[12px] text-slate-600">{item.company}</p>
                                        )}
                                    </div>

                                    {period && (
                                        <span className="shrink-0 text-[11px] text-slate-500">{period}</span>
                                    )}
                                </div>

                                <Description>{item.description}</Description>
                            </div>
                        );
                    })}
                </div>
            </ResumeSection>
        ) : null,

        education: educations.length > 0 ? (
            <ResumeSection title="Education" templateId={templateId}>
                <div className="space-y-4">
                    {educations.map((item) => {
                        const period = formatResumePeriod(item);

                        const details = [item.degree, item.fieldOfStudy].filter(Boolean).join(" · ");

                        return (
                            <div key={item.id} className="cv-entry space-y-1.5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        {item.institution && (
                                            <h3 className="text-[13px] font-semibold text-slate-900">{item.institution}</h3>
                                        )}

                                        {details && (
                                            <p className="text-[12px] text-slate-600">{details}</p>
                                        )}
                                    </div>

                                    {period && (
                                        <span className="shrink-0 text-[11px] text-slate-500">{period}</span>
                                    )}
                                </div>

                                <Description>{item.description}</Description>
                            </div>
                        );
                    })}
                </div>
            </ResumeSection>
        ) : null,

        skills: visibleSkills.length > 0 ? (
            <ResumeSection title="Skills" templateId={templateId}>
                <p className="text-[12px] leading-relaxed text-slate-700">{visibleSkills.join("  ·  ")}</p>
            </ResumeSection>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <ResumeSection title="Projects" templateId={templateId}>
                <div className="space-y-4">
                    {visibleProjects.map((item) => {
                        const period = formatResumePeriod(item);
                        const website = safeHttpUrl(item.websiteUrl);
                        const repository = safeHttpUrl(item.repositoryUrl);

                        return (
                            <div key={item.id} className="cv-entry space-y-1.5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        {item.name && (
                                            <h3 className="text-[13px] font-semibold text-slate-900">{item.name}</h3>
                                        )}

                                        {item.role && (
                                            <p className="text-[12px] text-slate-600">{item.role}</p>
                                        )}
                                    </div>

                                    {period && (
                                        <span className="shrink-0 text-[11px] text-slate-500">{period}</span>
                                    )}
                                </div>

                                <Description>
                                    {item.description}
                                </Description>

                                {item.technologies.length > 0 && (
                                    <p className="text-[11px] text-slate-600">
                                        <span className="font-semibold">Technologies:{" "}</span>
                                        {item.technologies.join(", ")}
                                    </p>
                                )}

                                {(website || repository) && (
                                    <div className="flex flex-wrap gap-3 text-[11px]">
                                        {website && (
                                            <a
                                                href={website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline underline-offset-2"
                                            >
                                                Website
                                            </a>
                                        )}

                                        {repository && (
                                            <a
                                                href={repository}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline underline-offset-2"
                                            >
                                                Repository
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </ResumeSection>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <ResumeSection title="Languages" templateId={templateId}>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {visibleLanguages.map((item) => (
                        <div key={item.id} className="cv-entry flex justify-between gap-2 text-[12px]">
                            <span className="font-medium text-slate-800">{item.name}</span>

                            {item.level && (
                                <span className="text-slate-500">{item.level}</span>
                            )}
                        </div>
                    ))}
                </div>
            </ResumeSection>
        ) : null,
    };

    const visibleSections = sections.filter((section) => section.visible);

    return (
        <article
            className={
                templateId === "modern"
                    ? "cv-document box-border min-h-280.75 w-full space-y-7 bg-white px-13.5 py-12 font-sans text-slate-900"
                    : "cv-document box-border min-h-280.75 w-full space-y-6 bg-white px-16 py-14.5 font-sans text-slate-900"
            }
        >
            {visibleSections.map((section) => (
                <div key={section.id}>
                    {content[section.id]}
                </div>
            ))}
        </article>
    );
};