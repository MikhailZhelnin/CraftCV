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

function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (!words.length) return "—";

    return words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join("");
};

function Description({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.65] text-[#536056]">
            {value}
        </p>
    );
};

function OliveSection({ number, title, children, keepTogether = false }: { number: number; title: string; children: ReactNode; keepTogether?: boolean; }) {
    return (
        <section className={keepTogether ? "cv-section cv-section-keep-together" : "cv-section"}>
            <div className="cv-section-heading grid grid-cols-[172px_minmax(0,1fr)] gap-x-6">
                <div className="olive-panel flex min-h-18.5 flex-col justify-between bg-[#214D3D] px-4 py-3">
                    <span className="text-[12px] font-bold text-[#A8CBAA]">{String(number).padStart(2, "0")}</span>
                    <h2 className="wrap-break-word text-[10px] font-semibold uppercase tracking-[0.12em] text-white">{title}</h2>
                </div>

                <div className="flex min-w-0 items-end border-b border-[#D4DED2] pb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#58725E]">{title}</span>
                </div>
            </div>

            <div className="min-w-0 pt-4 pl-49">{children}</div>
        </section>
    );
};

function OliveEntry({ period, title, subtitle, children }: { period?: string; title: string; subtitle?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry space-y-2">
            {period && (
                <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#879389]">{period}</p>
            )}

            {title && (
                <h3 className="wrap-break-word text-[14px] font-semibold leading-[1.3] tracking-tight text-[#25392D]">{title}</h3>
            )}

            {subtitle && (
                <p className="wrap-break-word text-[11px] font-semibold text-[#4E7860]">{subtitle}</p>
            )}

            {children}
        </div>
    );
};

export function OliveTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [personal.location, personal.email, personal.phone,].map((value) => value.trim()).filter(Boolean);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry grid grid-cols-[172px_minmax(0,1fr)] gap-x-6">
                <div className="olive-panel flex min-h-51.5 flex-col justify-between bg-[#214D3D] p-5">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#B8D5B9]">Personal</span>

                    <span className="wrap-break-word text-[55px] font-bold leading-none tracking-[-0.07em] text-[#F2F5E9]">{getInitials(personal.fullName)}</span>

                    <div className="h-0.75 w-10 bg-[#A8CBAA]" />
                </div>

                <div className="flex min-w-0 flex-col justify-center gap-4 py-3">
                    <div className="space-y-2">
                        {personal.fullName.trim() && (
                            <h1 className="wrap-break-word text-[38px] font-semibold leading-[1.02] tracking-tighter text-[#26392D]">{personal.fullName}</h1>
                        )}

                        {role && (
                            <p className="wrap-break-word text-[15px] font-medium text-[#4E7860]">{role}</p>
                        )}
                    </div>

                    {contacts.length > 0 && (
                        <div className="space-y-1.5 border-t border-[#D4DED2] pt-3">
                            {contacts.map((contact, index) => (
                                <p key={`${index}-${contact}`} className="wrap-break-word text-[10px] leading-normal text-[#627567]">{contact}</p>
                            ))}
                        </div>
                    )}
                </div>
            </header>
        ) : null,

        summary: summary.trim() ? (
            <p className="whitespace-pre-line wrap-break-word border-l-[3px] border-[#A8CBAA] pl-4 text-[13px] leading-[1.6] text-[#36483B]">{summary}</p>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div className="space-y-5">
                {visibleExperience.map((item) => (
                    <OliveEntry
                        key={item.id}
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                    >
                        <Description value={item.description} />
                    </OliveEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div className="space-y-5">
                {visibleEducation.map((item) => {
                    const details = [item.degree, item.fieldOfStudy,].filter(Boolean).join(" · ");

                    return (
                        <OliveEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.institution}
                            subtitle={details}
                        >
                            <Description value={item.description} />
                        </OliveEntry>
                    );
                })}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-4">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry space-y-2">
                        <h3 className="text-[11px] font-semibold text-[#28533B]">{group.name.trim() || "Skills"}</h3>

                        <div className="flex flex-wrap gap-1.5">
                            {group.skills.map((skill) => (
                                <span key={skill} className="wrap-break-word border border-[#D6E2D3] bg-[#F0F4ED] px-2 py-1 text-[10px] text-[#365A43]">{skill}</span>
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
                        <OliveEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                        >
                            <Description value={item.description} />

                            {item.technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-relaxed text-[#64776A]">
                                    <span className="font-semibold">Tools & Methods:{" "}</span>
                                    {item.technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-[#285E44]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </OliveEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="space-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex items-baseline justify-between gap-3 border-b border-[#E0E7DC] pb-2">
                        <span className="wrap-break-word text-[11px] font-semibold text-[#304B38]">{item.name}</span>

                        {item.level && (
                            <span className="shrink-0 text-[10px] font-medium text-[#568065]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = sections.filter((section) => section.visible && content[section.id] !== null);

    return (
        <article className="cv-document cv-olive box-border min-h-280.75 w-full space-y-8 bg-white px-14 py-13 font-sans text-[#26392D]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                const sectionContent = content[section.id];

                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{sectionContent}</div>
                    );
                };

                return (
                    <OliveSection
                        key={section.id}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        title={SECTION_TITLES[section.id]}
                        keepTogether={section.id === "languages"}
                    >
                        {sectionContent}
                    </OliveSection>
                );
            })}
        </article>
    );
};