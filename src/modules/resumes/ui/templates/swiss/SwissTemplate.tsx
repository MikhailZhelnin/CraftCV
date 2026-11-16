import type { ReactNode } from "react";

import type { CareerSectionId } from "@/modules/career-data";

import type { ResumeTemplateProps, ResumeTemplateContent } from "../template.types";
import { getRenderableCareerData, getResumeRole, getTemplateSectionNumber, hasPersonalContent, safeHttpUrl } from "../template.utils";

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

function Description({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.6] text-[#525B6B]">{value}</p>
    );
};

function SwissSection({ number, title, children }: { number: number; title: string; children: ReactNode; }) {
    return (
        <section className="cv-section">
            <div className="cv-section-heading grid grid-cols-[140px_minmax(0,1fr)] items-end gap-6 border-t border-[#CBD2DF] pt-4">
                <div className="space-y-1.5">
                    <span className="text-[22px] font-black leading-none tracking-tight text-[#3155D9]">{String(number).padStart(2, "0")}</span>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#1B2230]">{title}</h2>
                </div>

                <div className="mb-1 h-px bg-[#D8DFEA]" />
            </div>

            <div className="pt-5 pl-41">{children}</div>
        </section>
    );
};

function SwissEntry({ period, title, subtitle, children }: { period?: string; title: string; subtitle?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry grid grid-cols-[94px_minmax(0,1fr)] gap-4">
            <span className="pt-0.5 text-[9px] leading-normal text-[#778197]">{period}</span>

            <div className="min-w-0 space-y-1.5">
                {title && (
                    <h3 className="wrap-break-word text-[13px] font-bold leading-[1.3] tracking-[-0.015em] text-[#1B2230]">{title}</h3>
                )}

                {subtitle && (
                    <p className="wrap-break-word text-[11px] font-semibold text-[#3155D9]">{subtitle}</p>
                )}

                {children}
            </div>
        </div>
    );
};

export function SwissTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [personal.location, personal.email, personal.phone,].map((value) => value.trim()).filter(Boolean);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry space-y-8">
                <div className="h-1.75 w-full bg-[#3155D9]" />

                <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-6">
                    <div className="space-y-3 pt-2">
                        <div className="h-0.75 w-10 bg-[#3155D9]" />

                        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#3155D9]">Identity</span>
                    </div>

                    <div className="min-w-0 space-y-4">
                        <div className="space-y-2">
                            {personal.fullName.trim() && (
                                <h1 className="wrap-break-word text-[46px] font-black leading-[0.98] tracking-[-0.055em] text-[#171D29]">{personal.fullName}</h1>
                            )}

                            {role && (
                                <p className="wrap-break-word text-[16px] font-semibold tracking-tight text-[#3155D9]">{role}</p>
                            )}
                        </div>

                        {contacts.length > 0 && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[#CBD2DF] pt-3">
                                {contacts.map((contact, index) => (
                                    <span key={`${index}-${contact}`} className="wrap-break-word text-[10px] text-[#626C7D]">{contact}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        ) : null,

        summary: summary.trim() ? (
            <div className="cv-entry border-l-[3px] border-[#3155D9] pl-4">
                <p className="whitespace-pre-line wrap-break-word text-[14px] font-medium leading-[1.55] tracking-[-0.015em] text-[#323A49]">{summary}</p>
            </div>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div className="space-y-5">
                {visibleExperience.map((item) => (
                    <SwissEntry
                        key={item.id}
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                    >
                        <Description value={item.description} />
                    </SwissEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div className="space-y-5">
                {visibleEducation.map((item) => {
                    const details = [item.degree, item.fieldOfStudy].filter(Boolean).join(" · ");

                    return (
                        <SwissEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.institution}
                            subtitle={details}
                        >
                            <Description value={item.description} />
                        </SwissEntry>
                    );
                })}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-5">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry space-y-2">
                        <h3 className="text-[11px] font-bold text-[#1B2230]">{group.name.trim() || "Skills"}</h3>

                        <div className="flex flex-wrap gap-1.5">
                            {group.skills.map((skill) => (
                                <span key={skill} className="wrap-break-word border border-[#CBD5E8] bg-[#F5F7FC] px-2 py-1 text-[10px] leading-[1.4] text-[#303E5A]">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <div className="space-y-5">
                {visibleProjects.map((item) => {
                    const website = safeHttpUrl(item.websiteUrl);
                    const repository = safeHttpUrl(item.repositoryUrl);

                    return (
                        <SwissEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                        >
                            <Description value={item.description} />

                            {item.technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#626C7D]">
                                    <span className="font-bold">Tools & Methods:{" "}</span>
                                    {item.technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-[#3155D9]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer">Repository</a>
                                    )}
                                </div>
                            )}
                        </SwissEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex items-baseline justify-between gap-2 border-b border-[#E0E5EF] pb-2">
                        <span className="wrap-break-word text-[11px] font-semibold text-[#1B2230]">{item.name}</span>

                        {item.level && (
                            <span className="shrink-0 text-[10px] font-bold text-[#3155D9]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = sections.filter((section) => section.visible && content[section.id] !== null);

    return (
        <article className="cv-document cv-swiss box-border min-h-280.75 w-full space-y-9 bg-white px-14 py-13 font-sans text-[#171D29]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                const sectionContent = content[section.id];

                if (section.id === "personal") {
                    return (
                        <div key={section.id}>
                            {sectionContent}
                        </div>
                    );
                };

                return (
                    <SwissSection
                        key={section.id}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        title={SECTION_TITLES[section.id]}
                    >
                        {sectionContent}
                    </SwissSection>
                );
            })}
        </article>
    );
};