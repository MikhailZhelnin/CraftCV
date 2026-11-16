import type { ReactNode } from "react";

import type { CareerSectionId } from "@/modules/career-data";

import type { ResumeTemplateProps, ResumeTemplateContent } from "../template.types";
import { getRenderableCareerData, getResumeRole, getTemplateSectionNumber, getVisibleTemplateSections, hasPersonalContent, safeHttpUrl } from "../template.utils";

import { formatResumePeriod } from "../../preview/formatResumeDate";

const SECTION_TITLES: Record<CareerSectionId, string> = {
    personal: "Identity",
    summary: "Profile",
    experience: "Experience",
    education: "Education",
    skills: "Expertise",
    projects: "Projects",
    languages: "Languages",
};

const displayFont = {
    fontFamily: '"Bricolage Grotesque Variable", "Inter Variable", sans-serif',
};

const italicFont = {
    fontFamily: '"Instrument Serif", Georgia, serif',
};

const monoFont = {
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function StudioDescription({ value, }: { value: string; }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#4E514C]">{value}</p>
    );
};

function StudioSection({ title, number, compact = false, children }: { title: string; number: number; compact?: boolean; children: ReactNode; }) {
    return (
        <section className={`cv-section ${compact ? "cv-studio-compact" : ""}`}>
            <div className="cv-section-heading mb-4 flex min-w-0 items-end gap-3 border-b-2 border-[#242724] pb-2.5">
                <span style={monoFont} className="shrink-0 pb-0.5 text-[9px] text-[#666A60]">/{String(number).padStart(2, "0")}</span>
                <h2 style={displayFont} className="min-w-0 flex-1 wrap-break-word text-[21px] font-bold leading-[1.1] tracking-[-0.045em] text-[#242724]">{title}</h2>
                <span aria-hidden="true" className="mb-0.5 size-2 shrink-0 bg-[#DDEA83]" />
            </div>

            {children}
        </section>
    );
};

function StudioEntry({ title, subtitle, period, children }: { title: string; subtitle?: string; period?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry border-b border-[#DADCD5] py-3 first:pt-0 last:border-b-0 last:pb-0">
            <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <div className="min-w-0 flex-1">
                    {title.trim() && (
                        <h3 style={displayFont} className="wrap-break-word text-[14px] font-semibold leading-[1.35] tracking-tight text-[#242724]">{title} </h3>
                    )}
                </div>

                {period && (
                    <span style={monoFont} className="text-[9px] leading-normal text-[#6B6F66]">{period}</span>
                )}
            </div>

            {subtitle?.trim() && (
                <p className="mt-1 wrap-break-word text-[11px] font-medium text-[#4E5945]">{subtitle}</p>
            )}

            {children && (
                <div className="mt-2 space-y-2">{children}</div>
            )}
        </div>
    );
};

export function StudioTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [personal.location, personal.email, personal.phone,].map((value) => value.trim()).filter(Boolean);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry">
                <div style={monoFont} className="flex items-center justify-between gap-4 border-b border-[#242724] pb-2 text-[8px] uppercase tracking-widest text-[#6B6F66]" />

                <div className="mt-6 flex items-start justify-between gap-5">
                    <div className="min-w-0 flex-1">
                        {personal.fullName.trim() && (
                            <h1 style={displayFont} className="wrap-break-word text-[45px] font-extrabold leading-[0.98] tracking-[-0.065em] text-[#242724]">{personal.fullName}</h1>
                        )}

                        {role && (
                            <p style={{ ...italicFont, fontStyle: "italic" }} className="mt-3 wrap-break-word text-[24px] leading-[1.1] text-[#434A3F]">{role}</p>
                        )}
                    </div>

                    <div
                        aria-hidden="true"
                        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#DDEA83]"
                    >
                        <span style={displayFont} className="text-[17px] font-extrabold tracking-[-0.08em] text-[#242724]">CV.</span>
                    </div>
                </div>

                {contacts.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 border-y border-[#DADCD5] py-3">
                        {contacts.map((contact, index) => (
                            <span key={`${index}-${contact}`} style={monoFont} className="min-w-0 wrap-break-word text-[9px] leading-[1.55] text-[#51564E]">{contact}</span>
                        ))}
                    </div>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <div className="border-l-[3px] border-[#B7CB64] pl-4">
                <p className="whitespace-pre-line wrap-break-word text-[12px] leading-[1.7] text-[#3E433C]">{summary}</p>
            </div>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div>
                {visibleExperience.map((item) => (
                    <StudioEntry
                        key={item.id}
                        title={item.position}
                        subtitle={item.company}
                        period={formatResumePeriod(item)}
                    >
                        <StudioDescription value={item.description} />
                    </StudioEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div>
                {visibleEducation.map((item) => (
                    <StudioEntry
                        key={item.id}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy].filter(Boolean).join(" · ")}
                        period={formatResumePeriod(item)}
                    >
                        <StudioDescription value={item.description} />
                    </StudioEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div>
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry grid grid-cols-[130px_minmax(0,1fr)] gap-x-4 border-b border-[#DADCD5] py-3 first:pt-0 last:border-b-0 last:pb-0">
                        <h3 style={{ ...italicFont, fontStyle: "italic" }} className="min-w-0 wrap-break-word text-[16px] leading-[1.2] text-[#434A3F]">{group.name.trim() || "Skills"}</h3>
                        <p className="min-w-0 wrap-break-word text-[11px] leading-[1.65] text-[#4E514C]">{group.skills.join(" · ")}</p>
                    </div>
                ))}
            </div>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <div>
                {visibleProjects.map((item) => {
                    const website = safeHttpUrl(item.websiteUrl);
                    const repository = safeHttpUrl(item.repositoryUrl);
                    const technologies = item.technologies.map((value) => value.trim()).filter(Boolean);

                    return (
                        <StudioEntry
                            key={item.id}
                            title={item.name}
                            subtitle={item.role}
                            period={formatResumePeriod(item)}
                        >
                            <StudioDescription value={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#4E514C]">
                                    <span className="font-semibold text-[#242724]">Tools /{" "}</span>
                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-semibold text-[#3D5747]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </StudioEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex min-w-0 items-baseline justify-between gap-2 border-b border-[#DADCD5] pb-2">
                        <span className="min-w-0 wrap-break-word text-[11px] font-semibold text-[#242724]">{item.name}</span>

                        {item.level && (
                            <span style={monoFont} className="shrink-0 text-[9px] text-[#6B6F66]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = getVisibleTemplateSections(sections, content);

    return (
        <article className="cv-document cv-studio box-border min-h-280.75 w-full space-y-8 bg-white px-14 py-12 font-sans text-[#242724]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const compact = (section.id === "summary" && summary.length <= 300) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <StudioSection
                        key={section.id}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        title={SECTION_TITLES[section.id]}
                        compact={compact}
                    >
                        {content[section.id]}
                    </StudioSection>
                );
            })}
        </article>
    );
};