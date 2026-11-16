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

function Description({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#555149]">{value}</p>
    );
};

function BauhausSection({ number, title, keepTogether = false, children }: { number: number; title: string; keepTogether?: boolean; children: ReactNode; }) {
    return (
        <section className={`cv-section ${keepTogether ? "cv-bauhaus-compact" : ""}`}>
            <div className="cv-section-heading flex items-center gap-4 border-b-2 border-[#292923] pb-3">
                <span className="flex size-11 shrink-0 items-center justify-center bg-[#C85439] text-[17px] font-black text-[#FFF9EF]">{String(number).padStart(2, "0")}</span>
                <h2 className="min-w-0 flex-1 wrap-break-word text-[19px] font-extrabold uppercase leading-[1.1] tracking-[-0.035em] text-[#292923]">{title}</h2>
                <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-[#292923]" />
            </div>

            <div className="pt-4">{children}</div>
        </section>
    );
};

function BauhausEntry({ title, subtitle, period, children }: { title: string; subtitle?: string; period?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry grid grid-cols-[12px_minmax(0,1fr)] gap-3">
            <span aria-hidden="true" className="mt-1.5 size-2.5 bg-[#C85439]" />

            <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div className="min-w-0 flex-1">
                        {title.trim() && (
                            <h3 className="wrap-break-word text-[14px] font-bold leading-[1.3] text-[#292923]">{title}</h3>
                        )}

                        {subtitle?.trim() && (
                            <p className="mt-1 wrap-break-word text-[11px] font-semibold text-[#A84731]">{subtitle}</p>
                        )}
                    </div>

                    {period && (
                        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.03em] text-[#716A60]">{period}</span>
                    )}
                </div>

                {children}
            </div>
        </div>
    );
};

export function BauhausTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [personal.email, personal.phone, personal.location,].map((value) => value.trim()).filter((value) => value.length > 0);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry">
                <div className="flex items-center justify-between border-t-[5px] border-[#292923] pt-3" />

                <div className="mt-4">
                    <div className="min-w-0">
                        {personal.fullName.trim() && (
                            <h1 className="wrap-break-word text-[45px] font-black leading-[0.98] tracking-[-0.065em] text-[#292923]">{personal.fullName}</h1>
                        )}

                        {role && (
                            <p className="mt-4 wrap-break-word border-l-[5px] border-[#C85439] pl-3 text-[14px] font-bold leading-[1.35] text-[#A84731]">{role}</p>
                        )}
                    </div>
                </div>

                {contacts.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 bg-[#292923] px-4 py-3">
                        {contacts.map((contact, index) => (
                            <span key={`${index}-${contact}`} className="wrap-break-word text-[10px] leading-[1.4] text-[#FFF5E6]">{contact}</span>
                        ))}
                    </div>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <p className="whitespace-pre-line wrap-break-word border-l-[5px] border-[#C85439] pl-5 text-[13px] font-medium leading-[1.65] text-[#3D3B34]">{summary}</p>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div className="space-y-6">
                {visibleExperience.map((item) => (
                    <BauhausEntry
                        key={item.id}
                        title={item.position}
                        subtitle={item.company}
                        period={formatResumePeriod(item)}
                    >
                        <Description value={item.description} />
                    </BauhausEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div className="space-y-5">
                {visibleEducation.map((item) => (
                    <BauhausEntry
                        key={item.id}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy].filter(Boolean).join(" · ")}
                        period={formatResumePeriod(item)}
                    >
                        <Description value={item.description} />
                    </BauhausEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-4">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry grid grid-cols-[145px_minmax(0,1fr)] gap-4 border-b border-[#D8CCBC] pb-3">
                        <h3 className="min-w-0 wrap-break-word text-[11px] font-bold uppercase leading-[1.45] text-[#A84731]">{group.name.trim() || "Skills"}</h3>
                        <p className="min-w-0 wrap-break-word text-[11px] leading-[1.6] text-[#3D3B34]">{group.skills.join(" / ")}</p>
                    </div>
                ))}
            </div>
        ) : null,

        projects: visibleProjects.length > 0 ? (
            <div className="space-y-6">
                {visibleProjects.map((item) => {
                    const website = safeHttpUrl(item.websiteUrl);
                    const repository = safeHttpUrl(item.repositoryUrl);
                    const technologies = item.technologies.map((value) => value.trim()).filter(Boolean);

                    return (
                        <BauhausEntry
                            key={item.id}
                            title={item.name}
                            subtitle={item.role}
                            period={formatResumePeriod(item)}
                        >
                            <Description value={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#6C655B]">
                                    <span className="font-bold text-[#292923]">Tools / Methods:{" "}</span>
                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-bold text-[#A84731]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </BauhausEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex min-w-0 items-baseline justify-between gap-2 border-b border-[#D8CCBC] pb-2">
                        <span className="wrap-break-word text-[11px] font-bold text-[#292923]">{item.name}</span>

                        {item.level && (
                            <span className="shrink-0 text-[10px] font-bold text-[#A84731]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = getVisibleTemplateSections(sections, content);

    return (
        <article className="cv-document cv-bauhaus box-border min-h-280.75 w-full space-y-8 px-13 py-12 font-sans text-[#292923]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const keepTogether = (section.id === "summary" && summary.length < 320) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <BauhausSection
                        key={section.id}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        title={SECTION_TITLES[section.id]}
                        keepTogether={keepTogether}
                    >
                        {content[section.id]}
                    </BauhausSection>
                );
            })}
        </article>
    );
};