import type { ReactNode } from "react";

import type { CareerSectionId } from "@/modules/career-data";

import type { ResumeTemplateProps, ResumeTemplateContent } from "../template.types";
import { getRenderableCareerData, getResumeRole, hasPersonalContent, safeHttpUrl } from "../template.utils";

import { formatResumePeriod } from "../../preview/formatResumeDate";

const SECTION_TITLES: Record<CareerSectionId, string> = {
    personal: "Personal Details",
    summary: "About Me",
    experience: "Experience",
    education: "Education",
    skills: "Skills & Expertise",
    projects: "Projects",
    languages: "Languages",
};

function NordicDescription({ text }: { text: string }) {
    if (!text.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#52615A]">{text}</p>
    );
};

function NordicSection({ title, compact = false, children, }: { title: string; compact?: boolean; children: ReactNode; }) {
    return (
        <section className={`cv-section ${compact ? "cv-nordic-compact" : ""}`}>
            <div className="cv-section-heading mb-4 flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-6 shrink-0 rounded-full bg-[#789486]" />
                <h2 className="min-w-0 wrap-break-word text-[15px] font-semibold leading-tight tracking-tight text-[#293A32]">{title}</h2>
                <span aria-hidden="true" className="h-px min-w-0 flex-1 bg-[#DCE5DF]" />
            </div>

            {children}
        </section>
    );
};

function NordicEntry({ title, subtitle, period, children }: { title: string; subtitle?: string; period: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry relative border-l border-[#D6E0D9] pl-5">
            <span aria-hidden="true" className="absolute -left-1 top-1.5 size-2 rounded-full bg-[#789486]" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="min-w-0 flex-1">
                    {title.trim() && (
                        <h3 className="wrap-break-word text-[13px] font-semibold leading-[1.35] text-[#293A32]">{title}</h3>
                    )}
                </div>

                {period && (
                    <span className="text-[9px] leading-normal text-[#718179]">{period}</span>
                )}
            </div>

            {subtitle?.trim() && (
                <p className="mt-1 wrap-break-word text-[11px] font-medium text-[#5C7A6C]">{subtitle}</p>
            )}

            {children && (
                <div className="mt-2 space-y-2">{children}</div>
            )}
        </div>
    );
};

export function NordicTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [personal.location, personal.email, personal.phone,].map((value) => value.trim()).filter(Boolean);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry">
                {personal.fullName.trim() && (
                    <h1 className="wrap-break-word text-[42px] font-medium leading-[1.05] tracking-[-0.055em] text-[#293A32]">{personal.fullName}</h1>
                )}

                {role && (
                    <p className="mt-3 wrap-break-word text-[13px] font-medium leading-[1.4] text-[#5C7A6C]">{role}</p>
                )}

                {contacts.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#DCE5DF] pt-3">
                        {contacts.map((contact, index) => (
                            <span key={`${index}-${contact}`} className="flex min-w-0 items-center gap-3">
                                {index > 0 && (
                                    <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-[#789486]" />
                                )}

                                <span className="wrap-break-word text-[10px] leading-normal text-[#596960]">{contact}</span>
                            </span>
                        ))}
                    </div>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <p className="whitespace-pre-line wrap-break-word text-[12px] leading-[1.75] text-[#44534B]">{summary}</p>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div className="space-y-5">
                {visibleExperience.map((item) => (
                    <NordicEntry
                        key={item.id}
                        title={item.position}
                        subtitle={item.company}
                        period={formatResumePeriod(item)}
                    >
                        <NordicDescription text={item.description} />
                    </NordicEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div className="space-y-5">
                {visibleEducation.map((item) => (
                    <NordicEntry
                        key={item.id}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy].filter(Boolean).join(" · ")}
                        period={formatResumePeriod(item)}
                    >
                        <NordicDescription text={item.description} />
                    </NordicEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-3">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry space-y-1.5">
                        <h3 className="wrap-break-word text-[11px] font-semibold text-[#5C7A6C]">{group.name.trim() || "Skills"}</h3>

                        {group.skills.length > 0 && (
                            <p className="wrap-break-word text-[11px] leading-[1.65] text-[#44534B]">{group.skills.join(" · ")}</p>
                        )}
                    </div>
                ))}
            </div>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <div className="space-y-5">
                {visibleProjects.map((item) => {
                    const website = safeHttpUrl(item.websiteUrl);
                    const repository = safeHttpUrl(item.repositoryUrl);
                    const technologies = item.technologies.map((technology) => technology.trim()).filter(Boolean);

                    return (
                        <NordicEntry
                            key={item.id}
                            title={item.name}
                            subtitle={item.role}
                            period={formatResumePeriod(item)}
                        >
                            <NordicDescription text={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#607168]">
                                    <span className="font-semibold text-[#293A32]">Technologies:{" "}</span>

                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-medium text-[#4F7562]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </NordicEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex min-w-0 items-baseline justify-between gap-2 border-b border-[#E4EAE5] pb-2">
                        <span className="wrap-break-word text-[11px] font-medium text-[#293A32]">{item.name}</span>

                        {item.level && (
                            <span className="shrink-0 text-[10px] text-[#5C7A6C]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = sections.filter((section) => section.visible && content[section.id] !== null);

    return (
        <article className="cv-document cv-nordic box-border min-h-280.75 w-full space-y-7 bg-white px-14 py-13 font-sans text-[#293A32]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const compact = (section.id === "summary" && summary.length <= 300) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <NordicSection
                        key={section.id}
                        title={SECTION_TITLES[section.id]}
                        compact={compact}
                    >
                        {content[section.id]}
                    </NordicSection>
                );
            })}
        </article>
    );
};