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
    fontFamily: '"Unbounded Variable", "Inter Variable", sans-serif',
};

const monoFont = {
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function ModularDescription({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#42423F]">{value}</p>
    );
};

function ModularSection({ title, number, compact = false, children }: { title: string; number: number; compact?: boolean; children: ReactNode; }) {
    const isBlue = number % 2 === 0;

    return (
        <section className={`cv-section ${compact ? "cv-modular-compact" : ""}`}>
            <div className="cv-section-heading mb-4 flex min-w-0 items-center gap-3 border-b-2 border-[#252525] pb-3">
                <span
                    style={monoFont}
                    className={`flex size-11 shrink-0 items-center justify-center text-[14px] font-semibold ${isBlue ? "bg-[#2549B8] text-white" : "bg-[#E65D45] text-[#252525]"}`}
                >
                    {String(number).padStart(2, "0")}
                </span>

                <h2 style={displayFont} className="min-w-0 flex-1 wrap-break-word text-[18px] font-bold leading-[1.3] tracking-[-0.04em] text-[#242424]">{title}</h2>

                <span aria-hidden="true" className="flex shrink-0 items-end gap-1">
                    <span className="h-5 w-1.5 bg-[#2549B8]" />
                    <span className="h-3 w-1.5 bg-[#E65D45]" />
                </span>
            </div>

            {children}
        </section>
    );
};

function ModularEntry({ index, label, period, title, subtitle, color = "orange", children }: { index: number; label: string; period: string; title: string; subtitle?: string; color?: "blue" | "orange"; children?: ReactNode; }) {
    return (
        <div className="cv-entry cv-modular-entry grid grid-cols-[112px_minmax(0,1fr)] gap-4 border-b border-[#CCC4B7] py-3 first:pt-0 last:border-b-0 last:pb-0">
            <div className="min-w-0 self-start bg-[#E9DFCF] p-3">
                <span
                    style={monoFont}
                    className={`block text-[9px] font-semibold uppercase tracking-[0.02em] ${color === "blue" ? "text-[#2549B8]" : "text-[#B64430]"}`}
                >
                    {label} / {String(index).padStart(2, "0")}
                </span>

                {period && (
                    <p style={monoFont} className="mt-2 wrap-break-word text-[9px] leading-[1.6] text-[#403D38]">{period}</p>
                )}
            </div>

            <div className="min-w-0 space-y-2 py-0.5">
                {title.trim() && (
                    <h3 className="wrap-break-word text-[14px] font-bold leading-[1.3] tracking-tight text-[#242424]">{title}</h3>
                )}

                {subtitle?.trim() && (
                    <p className="wrap-break-word text-[11px] font-semibold text-[#B64430]">{subtitle}</p>
                )}

                {children}
            </div>
        </div>
    );
};

export function ModularTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry cv-modular-hero">
                <div className={`grid ${role ? "grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)]" : "grid-cols-1"}`}>
                    <div className="flex min-h-36 min-w-0 items-center bg-[#2549B8] p-5">
                        {personal.fullName.trim() && (
                            <h1 style={displayFont} className="wrap-break-word text-[34px] font-extrabold leading-[1.15] tracking-[-0.065em] text-white">{personal.fullName}</h1>
                        )}
                    </div>

                    {role && (
                        <div className="flex min-w-0 flex-col justify-between gap-5 bg-[#E65D45] p-4">
                            <span style={monoFont} className="text-[10px] font-semibold uppercase text-[#252525]">Role / Position</span>
                            <p style={displayFont} className="wrap-break-word text-[15px] font-bold leading-[1.4] tracking-[-0.035em] text-[#252525]">{role}</p>
                        </div>
                    )}
                </div>

                {(personal.email.trim() ||
                    personal.location.trim() ||
                    personal.phone.trim()) && (
                        <div className={`grid ${personal.email.trim() && (personal.location.trim() || personal.phone.trim()) ? "grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "grid-cols-1"}`}>
                            {personal.email.trim() && (
                                <div className="min-w-0 bg-[#252525] p-4">
                                    <span style={monoFont} className="block text-[8px] uppercase tracking-[0.08em] text-[#C4C5C0]">Email</span>
                                    <p className="mt-2 wrap-break-word text-[11px] font-medium leading-normal text-white">{personal.email} </p>
                                </div>
                            )}

                            {(personal.location.trim() ||
                                personal.phone.trim()) && (
                                    <div className="min-w-0 space-y-1 bg-[#E9DFCF] p-4">
                                        <span style={monoFont} className="block text-[8px] uppercase tracking-[0.08em] text-[#605950]">Location / Phone</span>

                                        {personal.location.trim() && (
                                            <p className="mt-2 wrap-break-word text-[10px] leading-normal text-[#2C2B28]">{personal.location}</p>
                                        )}

                                        {personal.phone.trim() && (
                                            <p className="wrap-break-word text-[10px] leading-normal text-[#2C2B28]">{personal.phone}</p>
                                        )}
                                    </div>
                                )}
                        </div>
                    )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <div className="grid grid-cols-[98px_minmax(0,1fr)] bg-[#E9DFCF]">
                <div className="flex min-w-0 items-start bg-[#2549B8] p-3">
                    <span style={monoFont} className="wrap-break-word text-[9px] font-semibold uppercase leading-normal text-white">In / Brief</span>
                </div>

                <p className="min-w-0 whitespace-pre-line wrap-break-word p-4 text-[11px] leading-[1.7] text-[#30302D]">{summary}</p>
            </div>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div>
                {visibleExperience.map((item, index) => (
                    <ModularEntry
                        key={item.id}
                        index={index + 1}
                        label="Work"
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                    >
                        <ModularDescription value={item.description} />
                    </ModularEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div>
                {visibleEducation.map((item, index) => (
                    <ModularEntry
                        key={item.id}
                        index={index + 1}
                        label="Study"
                        color="blue"
                        period={formatResumePeriod(item)}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy].filter(Boolean).join(" · ")}
                    >
                        <ModularDescription value={item.description} />
                    </ModularEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-3">
                {visibleSkillGroups.map((group, index) => (
                    <div key={group.id} className="cv-entry grid grid-cols-[132px_minmax(0,1fr)] border border-[#D3CABC]">
                        <div className={`min-w-0 p-3 ${index % 2 === 0 ? "bg-[#DFE6F5]" : "bg-[#F3DFD8]"}`}>
                            <span style={monoFont} className="block text-[8px] font-semibold text-[#5A5A54]">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-2 wrap-break-word text-[11px] font-bold leading-[1.45] text-[#242424]">{group.name.trim() || "Skills"}</h3>
                        </div>

                        <div className="flex min-w-0 flex-wrap content-center items-center gap-1.5 p-3">
                            {group.skills.map(
                                (skill, skillIndex) => (
                                    <span key={`${skillIndex}-${skill}`} className="wrap-break-word border border-[#D5CFC5] px-2 py-1 text-[10px] leading-[1.35] text-[#383733]" >{skill}</span>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <div>
                {visibleProjects.map((item, index) => {
                    const website = safeHttpUrl(item.websiteUrl);
                    const repository = safeHttpUrl(item.repositoryUrl);
                    const technologies = item.technologies.map((technology) => technology.trim()).filter(Boolean);

                    return (
                        <ModularEntry
                            key={item.id}
                            index={index + 1}
                            label="Project"
                            color="blue"
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                        >
                            <ModularDescription value={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.55] text-[#4C4A46]">
                                    <span className="font-semibold text-[#242424]">Tools /{" "}</span>
                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-[#2549B8]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </ModularEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
                {visibleLanguages.map((item, index) => (
                    <div key={item.id} className="cv-entry flex min-w-0 items-center gap-3 border border-[#D3CABC] px-3 py-2.5">
                        <span style={monoFont} className="shrink-0 text-[9px] font-semibold text-[#B64430]">{String(index + 1).padStart(2, "0")}</span>
                        <span className="min-w-0 flex-1 wrap-break-word text-[11px] font-semibold text-[#242424]">{item.name}</span>

                        {item.level && (
                            <span style={monoFont} className="shrink-0 text-[9px] text-[#625D54]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = getVisibleTemplateSections(sections, content);

    return (
        <article className="cv-document cv-modular box-border min-h-280.75 w-full space-y-7 px-12 py-12 font-sans text-[#242424]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const compact = (section.id === "summary" && summary.length <= 250) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <ModularSection
                        key={section.id}
                        title={SECTION_TITLES[section.id]}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        compact={compact}
                    >
                        {content[section.id]}
                    </ModularSection>
                );
            })}
        </article>
    );
};