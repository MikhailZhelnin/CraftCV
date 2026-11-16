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
    fontFamily: '"Anton", Impact, "Inter Variable", sans-serif',
};

const monoFont = {
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
};

function GridlineDescription({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#474844]">{value}</p>
    );
};

function GridlineSection({ number, title, compact = false, children }: { number: number; title: string; compact?: boolean; children: ReactNode; }) {
    return (
        <section className={`cv-section ${compact ? "cv-gridline-compact" : ""}`}>
            <div className="cv-section-heading grid grid-cols-[68px_minmax(0,1fr)] border-2 border-[#20211F]">
                <span style={monoFont} className="flex min-h-13 items-center justify-center border-r-2 border-[#20211F] bg-[#F2CB45] text-[15px] font-semibold text-[#20211F]">{String(number).padStart(2, "0")}</span>
                <h2 style={displayFont} className="min-w-0 wrap-break-word bg-[#F7F7F2] px-4 py-2.5 text-[25px] leading-[1.2] tracking-[0.015em] text-[#20211F] uppercase">{title}</h2>
            </div>

            <div className="cv-gridline-content">{children}</div>
        </section>
    );
};

function GridlineEntry({ number, period, title, subtitle, hasDetails, children }: { number: number; period: string; title: string; subtitle?: string; hasDetails: boolean; children?: ReactNode; }) {
    return (
        <table role="presentation" className="cv-entry cv-gridline-entry w-full table-fixed border-collapse border-x-2 border-b-2 border-[#20211F]">
            <colgroup>
                <col className="w-29.25" />
                <col />
            </colgroup>

            <thead className="cv-gridline-entry-head">
                <tr>
                    <td className="border-r-2 border-[#20211F] p-3 align-top">
                        <p style={monoFont} className="text-[9px] font-semibold text-[#C34437]">{String(number).padStart(2, "0")}</p>

                        {period && (
                            <p style={monoFont} className="mt-3 wrap-break-word text-[9px] leading-[1.6] text-[#5B5C55]">{period}</p>
                        )}
                    </td>

                    <td className="min-w-0 p-3 align-top">
                        <div className="cv-gridline-entry-title space-y-1">
                            {title.trim() && (
                                <h3 className="wrap-break-word text-[13px] font-bold leading-[1.35] text-[#20211F]">{title}</h3>
                            )}

                            {subtitle?.trim() && (
                                <p className="wrap-break-word text-[11px] font-semibold text-[#B74034]">{subtitle}</p>
                            )}
                        </div>
                    </td>
                </tr>
            </thead>

            {hasDetails && (
                <tbody>
                    <tr>
                        <td className="border-r-2 border-[#20211F] p-0" />
                        <td className="space-y-2 px-3 pb-3 pt-1 align-top">{children}</td>
                    </tr>
                </tbody>
            )}
        </table>
    );
};

function GridlineInfoRow({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <div className="cv-entry grid grid-cols-[117px_minmax(0,1fr)] border-x-2 border-t border-[#20211F] first:border-t-0 last:border-b-2">
            <h3 style={monoFont} className="min-w-0 wrap-break-word border-r-2 border-[#20211F] p-3 text-[10px] font-semibold leading-normal text-[#20211F]">{label}</h3>

            <div className="min-w-0 wrap-break-word px-4 py-3 text-[11px] leading-[1.65] text-[#474844]">{children}</div>
        </div>
    );
};

export function GridlineTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const fullName = personal.fullName.trim();

    const contacts = [
        { label: "Email", value: personal.email.trim() },
        { label: "Phone", value: personal.phone.trim() },
        { label: "Location", value: personal.location.trim() },
    ].filter((contact) => contact.value.length > 0);

    const contactColumns = contacts.length === 3 ? "grid-cols-3" : contacts.length === 2 ? "grid-cols-2" : "grid-cols-1";

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry cv-gridline-hero border-2 border-[#20211F]">
                {(fullName || role) && (
                    <div className={`grid ${fullName && role ? "grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]" : "grid-cols-1"}`}>
                        {fullName && (
                            <div className={`min-w-0 p-5 ${role ? "border-r-2 border-[#20211F]" : ""}`}>
                                <span style={monoFont} className="text-[9px] uppercase tracking-[0.08em] text-[#6B6B64]">Name</span>
                                <h1 style={displayFont} className="mt-4 wrap-break-word text-[48px] leading-[1.02] tracking-[0.005em] text-[#20211F] uppercase">{fullName}</h1>
                            </div>
                        )}

                        {role && (
                            <div className="flex min-w-0 flex-col justify-between gap-5 bg-[#D94D3D] p-5">
                                <span style={monoFont} className="text-[9px] uppercase tracking-[0.08em] text-[#20211F]">Position</span>
                                <p className="wrap-break-word text-[17px] font-bold leading-[1.3] tracking-[-0.02em] text-[#20211F]">{role}</p>
                            </div>
                        )}
                    </div>
                )}

                {contacts.length > 0 && (
                    <div className={`grid ${contactColumns} border-t-2 border-[#20211F]`}>
                        {contacts.map((contact, index) => (
                            <div key={contact.label} className={`min-w-0 px-3 py-3 ${index < contacts.length - 1 ? "border-r-2 border-[#20211F]" : ""}`}>
                                <span style={monoFont} className="text-[8px] uppercase tracking-wider text-[#6B6B64]">{contact.label}</span>
                                <p className="mt-1 wrap-break-word text-[10px] font-medium leading-[1.4] text-[#20211F]">{contact.value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <p className="cv-entry whitespace-pre-line wrap-break-word border-x-2 border-b-2 border-[#20211F] px-4 py-4 text-[12px] leading-[1.7] text-[#3C3E39]">{summary}</p>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div>
                {visibleExperience.map((item, index) => (
                    <GridlineEntry
                        key={item.id}
                        number={index + 1}
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                        hasDetails={Boolean(item.description.trim())}
                    >
                        <GridlineDescription value={item.description} />
                    </GridlineEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div>
                {visibleEducation.map((item, index) => (
                    <GridlineEntry
                        key={item.id}
                        number={index + 1}
                        period={formatResumePeriod(item)}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy].filter(Boolean).join(" · ")}
                        hasDetails={Boolean(item.description.trim())}
                    >
                        <GridlineDescription value={item.description} />
                    </GridlineEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div>
                {visibleSkillGroups.map((group) => (
                    <GridlineInfoRow key={group.id} label={group.name.trim() || "Skills"}>
                        {group.skills.join(" · ")}
                    </GridlineInfoRow>
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
                        <GridlineEntry
                            key={item.id}
                            number={index + 1}
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                            hasDetails={Boolean(item.description.trim() || technologies.length > 0 || website || repository)}
                        >
                            <GridlineDescription value={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#555751]">
                                    <span className="font-semibold text-[#20211F]">Tools: </span>
                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold text-[#B74034]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </GridlineEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div>
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry grid grid-cols-[minmax(0,1fr)_117px] border-x-2 border-t border-[#20211F] first:border-t-0 last:border-b-2">
                        <p className="min-w-0 wrap-break-word px-4 py-3 text-[11px] font-semibold text-[#20211F]">{item.name}</p>
                        <p style={monoFont} className="min-w-0 wrap-break-word border-l-2 border-[#20211F] px-3 py-3 text-[10px] text-[#B74034]">{item.level}</p>
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = getVisibleTemplateSections(sections, content);

    return (
        <article className="cv-document cv-gridline box-border min-h-280.75 w-full space-y-7 bg-white px-14 py-14 font-sans text-[#20211F]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return <div key={section.id}>{content.personal}</div>;
                };

                const compact = (section.id === "summary" && summary.length <= 260) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <GridlineSection
                        key={section.id}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        title={SECTION_TITLES[section.id]}
                        compact={compact}
                    >
                        {content[section.id]}
                    </GridlineSection>
                );
            })}
        </article>
    );
};