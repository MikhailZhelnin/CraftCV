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
    fontFamily: '"Syne Variable", "Unbounded Variable", "Inter Variable", sans-serif',
};

const bodyFont = {
    fontFamily: '"Space Grotesk Variable", "Inter Variable", sans-serif',
};

const monoFont = {
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function KineticDescription({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#4D4858]">{value}</p>
    );
};

function KineticSection({ title, number, compact = false, children }: { title: string; number: number; compact?: boolean; children: ReactNode; }) {
    return (
        <section className={`cv-section ${compact ? "cv-kinetic-compact" : ""}`}>
            <div className="cv-section-heading mb-4 border-b-[3px] border-[#5C2ABF] pb-2.5">
                <div className="flex min-w-0 items-end justify-between gap-4">
                    <h2 style={displayFont} className="min-w-0 flex-1 wrap-break-word text-[26px] font-extrabold leading-[1.1] tracking-tighter text-[#292033]">{title}</h2>
                    <span style={monoFont} className="shrink-0 text-[20px] font-semibold leading-none text-[#5C2ABF]">/{String(number).padStart(2, "0")}</span>
                </div>

                <div aria-hidden="true" className="mt-2 h-1.5 w-17 bg-[#C8F5D2]" />
            </div>

            {children}
        </section>
    );
};

function KineticEntry({ title, subtitle, period, children }: { title: string; subtitle?: string; period: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry cv-kinetic-entry border-b border-[#D9D4E2] border-l-[3px] border-l-[#C8F5D2] py-4 pl-4 first:pt-0 last:border-b-0 last:pb-0">
            <div className="cv-kinetic-entry-head flex min-w-0 flex-wrap items-start justify-between gap-x-5 gap-y-1.5">
                <div className="min-w-0 flex-1">
                    {title.trim() && (
                        <h3 style={displayFont} className="wrap-break-word text-[14px] font-bold leading-[1.3] tracking-tight text-[#292033]">{title}</h3>
                    )}

                    {subtitle?.trim() && (
                        <p className="mt-1 wrap-break-word text-[11px] font-semibold text-[#5C2ABF]">{subtitle}</p>
                    )}
                </div>

                {period && (
                    <span style={monoFont} className="shrink-0 pt-0.5 text-[9px] leading-normal text-[#61566F]">{period}</span>
                )}
            </div>

            {children && (
                <div className="mt-2 space-y-2">{children}</div>
            )}
        </div>
    );
};

export function KineticTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [
        { label: "Location", value: personal.location.trim() },
        { label: "Email", value: personal.email.trim() },
        { label: "Phone", value: personal.phone.trim() },
    ].filter((item) => item.value.length > 0);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry cv-kinetic-hero">
                {personal.fullName.trim() && (
                    <div className="border-t-[6px] border-[#5C2ABF] pt-5">
                        <p style={monoFont} className="mb-3 text-[9px] uppercase tracking-[0.16em] text-[#6A5B7C]">Name</p>
                        <h1 style={displayFont} className="wrap-break-word text-[49px] font-extrabold leading-[0.98] tracking-[-0.065em] text-[#5C2ABF]">{personal.fullName}</h1>
                    </div>
                )}

                {role && (
                    <div className="mt-5 ml-12 min-w-0 bg-[#C8F5D2] px-5 py-3">
                        <p style={monoFont} className="mb-1 text-[8px] uppercase tracking-widest text-[#4B3278]">Positio</p>
                        <p style={displayFont} className="wrap-break-word text-[18px] font-bold leading-[1.3] tracking-[-0.035em] text-[#292033]">{role}</p>
                    </div>
                )}

                {contacts.length > 0 && (
                    <div className="mt-4 mr-12 flex flex-wrap gap-x-7 gap-y-2.5 bg-[#5C2ABF] px-4 py-3">
                        {contacts.map((contact) => (
                            <div key={contact.label} className="min-w-0">
                                <span style={monoFont} className="block text-[8px] uppercase tracking-[0.08em] text-[#C8F5D2]">{contact.label}</span>
                                <span className="mt-0.5 block wrap-break-word text-[10px] font-medium leading-[1.4] text-white">{contact.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <div className="border-l-[5px] border-[#5C2ABF] py-1 pl-5">
                <p className="whitespace-pre-line wrap-break-word text-[13px] font-medium leading-[1.65] text-[#393142]">{summary}</p>
            </div>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div>
                {visibleExperience.map((item) => (
                    <KineticEntry
                        key={item.id}
                        title={item.position}
                        subtitle={item.company}
                        period={formatResumePeriod(item)}
                    >
                        <KineticDescription value={item.description} />
                    </KineticEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div>
                {visibleEducation.map((item) => (
                    <KineticEntry
                        key={item.id}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy,].filter(Boolean).join(" · ")}
                        period={formatResumePeriod(item)}
                    >
                        <KineticDescription value={item.description} />
                    </KineticEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-4">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry border-b border-[#E0DAE8] pb-3 last:border-b-0 last:pb-0">
                        <h3 style={displayFont} className="wrap-break-word text-[12px] font-bold leading-[1.4] text-[#5C2ABF]">{group.name.trim() || "Skills"}</h3>

                        {group.skills.length > 0 && (
                            <p className="mt-1.5 ml-8 wrap-break-word text-[11px] leading-[1.7] text-[#393142]">{group.skills.join(" / ")}</p>
                        )}
                    </div>
                ))}
            </div>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <div>
                {visibleProjects.map((item) => {
                    const website = safeHttpUrl(item.websiteUrl);
                    const repository = safeHttpUrl(item.repositoryUrl);
                    const technologies = item.technologies.map((technology) => technology.trim()).filter(Boolean);

                    return (
                        <KineticEntry
                            key={item.id}
                            title={item.name}
                            subtitle={item.role}
                            period={formatResumePeriod(item)}
                        >
                            <KineticDescription value={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#61566F]">
                                    <span className="font-semibold text-[#292033]">Tools:{" "}</span>

                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-semibold text-[#5C2ABF]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </KineticEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-7 gap-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex min-w-0 items-baseline justify-between gap-3 border-b border-[#D9D4E2] pb-2">
                        <span className="min-w-0 wrap-break-word text-[11px] font-semibold text-[#292033]">{item.name}</span>

                        {item.level && (
                            <span style={monoFont} className="shrink-0 text-[9px] text-[#5C2ABF]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = getVisibleTemplateSections(sections, content);

    return (
        <article
            className="cv-document cv-kinetic box-border min-h-280.75 w-full space-y-8 bg-white px-14 py-14 text-[#292033]"
            style={{ ...bodyFont, colorScheme: "light" }}
        >
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const compact = (section.id === "summary" && summary.length <= 260) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <KineticSection
                        key={section.id}
                        title={SECTION_TITLES[section.id]}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        compact={compact}
                    >
                        {content[section.id]}
                    </KineticSection>
                );
            })}
        </article>
    );
};