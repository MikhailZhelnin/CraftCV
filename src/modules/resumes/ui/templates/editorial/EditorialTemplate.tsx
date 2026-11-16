import type { ReactNode } from "react";

import type { CareerSectionId } from "@/modules/career-data";

import type { ResumeTemplateProps, ResumeTemplateContent } from "../template.types";
import { getRenderableCareerData, getResumeRole, getTemplateSectionNumber, hasPersonalContent, safeHttpUrl } from "../template.utils";

import { formatResumePeriod } from "../../preview/formatResumeDate";

const SECTION_TITLES: Record<CareerSectionId, string> = {
    personal: "Personal Details",
    summary: "Profile",
    experience: "Experience",
    education: "Education",
    skills: "Expertise",
    projects: "Selected Projects",
    languages: "Languages",
};

const serifFont = {
    fontFamily: '"Newsreader Variable", Georgia, serif',
};

function Description({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#514B45]">
            {value}
        </p>
    );
};

function SectionHeading({ title, number }: { title: string; number: number; }) {
    return (
        <div className="cv-section-heading mb-4 flex items-center gap-3 border-b border-[#D8CEC4] pb-2.5">
            <span className="text-[10px] font-semibold tracking-widest text-[#924E48]">{String(number).padStart(2, "0")} /</span>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#292622]">{title}</h2>
        </div>
    );
};

function Entry({ period, title, subtitle, children }: { period: string; title: string; subtitle?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry grid grid-cols-[116px_minmax(0,1fr)] gap-x-5">
            <div className="pt-0.5 text-[10px] leading-normal text-[#8F8178]">{period}</div>

            <div className="min-w-0 space-y-1.5">
                {title && (
                    <h3 style={serifFont} className="wrap-break-word text-[17px] font-medium leading-[1.12] text-[#292622]">{title}</h3>
                )}

                {subtitle && (
                    <p className="text-[11px] font-semibold text-[#924E48]">{subtitle}</p>
                )}

                {children}
            </div>
        </div>
    );
};

export function EditorialTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [personal.location, personal.email, personal.phone].map((item) => item.trim()).filter(Boolean);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry space-y-5">
                <div className="h-0.75 w-14.5 bg-[#924E48]" />

                <div className="space-y-1">
                    {personal.fullName.trim() && (
                        <h1 style={serifFont} className="wrap-break-word text-[48px] font-normal leading-[0.95] tracking-[-0.035em] text-[#292622]">{personal.fullName}</h1>
                    )}

                    {role && (
                        <p className="pt-2 text-[15px] font-medium tracking-tight text-[#924E48]">{role}</p>
                    )}
                </div>

                {contacts.length > 0 && (
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-[#D8CEC4] pt-4 text-[10px] text-[#665D56]">
                        {contacts.map((contact, index) => (
                            <span key={`${index}-${contact}`} className="wrap-break-word">{contact}</span>
                        ))}
                    </div>
                )}
            </header>
        ) : null,

        summary: summary.trim() ? (
            <div className="cv-entry border-l-2 border-[#924E48] py-1 pl-5">
                <p style={serifFont} className="whitespace-pre-line wrap-break-word text-[18px] leading-[1.35] text-[#3C3631]">{summary}</p>
            </div>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div className="space-y-5">
                {visibleExperience.map((item) => (
                    <Entry
                        key={item.id}
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                    >
                        <Description value={item.description} />
                    </Entry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div className="space-y-5">
                {visibleEducation.map((item) => {
                    const details = [item.degree, item.fieldOfStudy].filter(Boolean).join(" · ");

                    return (
                        <Entry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.institution}
                            subtitle={details}
                        >
                            <Description value={item.description} />
                        </Entry>
                    );
                })}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-4">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry grid grid-cols-[116px_minmax(0,1fr)] gap-x-5">
                        <h3 className="wrap-break-word text-[11px] font-semibold text-[#924E48]">{group.name.trim() || "Skills"}</h3>
                        <p className="wrap-break-word text-[11px] leading-[1.65] text-[#514B45]">{group.skills.join("  ·  ")}</p>
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
                        <Entry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                        >
                            <Description value={item.description} />

                            {item.technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#665D56]">
                                    <span className="font-semibold">Tools & Methods:{" "}</span>
                                    {item.technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#924E48]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </Entry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="space-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry grid grid-cols-[116px_minmax(0,1fr)] gap-x-5 text-[11px]">
                        <span className="font-semibold text-[#924E48]">{item.name}</span>
                        <span className="text-[#514B45]">{item.level || "Not specified"}</span>
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = sections.filter((section) => section.visible && content[section.id] !== null);

    return (
        <article className="cv-document cv-editorial box-border min-h-280.75 w-full space-y-8 bg-white px-14 py-13 font-sans text-[#292622]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                const sectionContent = content[section.id];

                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{sectionContent}</div>
                    );
                };

                return (
                    <section key={section.id} className="cv-section">
                        <SectionHeading
                            title={SECTION_TITLES[section.id]}
                            number={getTemplateSectionNumber(visibleSections, section.id)}
                        />

                        {sectionContent}
                    </section>
                );
            })}
        </article>
    );
};