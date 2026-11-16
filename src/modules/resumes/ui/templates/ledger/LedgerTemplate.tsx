import type { ReactNode } from "react";

import type { CareerSectionId } from "@/modules/career-data";

import type { ResumeTemplateProps, ResumeTemplateContent } from "../template.types";
import { getRenderableCareerData, getResumeRole, getTemplateSectionNumber, getVisibleTemplateSections, hasPersonalContent, safeHttpUrl } from "../template.utils";

import { formatResumePeriod } from "../../preview/formatResumeDate";

const SECTION_TITLES: Record<CareerSectionId, string> = {
    personal: "Personal Details",
    summary: "Profile",
    experience: "Professional Experience",
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
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.6] text-[#5C5A56]">{value}</p>
    );
};

function LedgerSection({ title, number, keepTogether = false, children }: { title: string; number: number; keepTogether?: boolean; children: ReactNode; }) {
    return (
        <section className={`cv-section ${keepTogether ? "cv-ledger-compact" : ""}`}>
            <div className="cv-section-heading mb-3 flex items-baseline gap-5 border-t border-[#AAA59D] pt-3">
                <span className="w-8 shrink-0 font-mono text-[10px] font-semibold tracking-[0.04em] text-[#956C51]">{String(number).padStart(2, "0")}</span>
                <h2 className="min-w-0 wrap-break-word text-[15px] font-semibold leading-tight tracking-tight text-[#272724]">{title}</h2>
            </div>

            {children}
        </section>
    );
};

function LedgerEntry({ period, title, subtitle, children }: { period: string; title: string; subtitle?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry grid grid-cols-[112px_minmax(0,1fr)] gap-x-5 border-b border-[#E0DDD7] py-3 last:border-b-0">
            <div className="min-w-0 pt-0.5 font-mono text-[9px] leading-normal text-[#827A72]">{period}</div>

            <div className="min-w-0 space-y-1.5">
                {title.trim() && (
                    <h3 className="wrap-break-word text-[13px] font-semibold leading-[1.35] text-[#272724]">{title}</h3>
                )}

                {subtitle?.trim() && (
                    <p className="wrap-break-word text-[11px] font-medium text-[#956C51]">{subtitle}</p>
                )}

                {children}
            </div>
        </div>
    );
};

function LedgerDetailRow({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <div className="cv-entry grid grid-cols-[112px_minmax(0,1fr)] gap-x-5 border-b border-[#E0DDD7] py-2.5 last:border-b-0">
            <h3 className="min-w-0 wrap-break-word text-[10px] font-semibold leading-normal text-[#956C51]">{label}</h3>

            <div className="min-w-0 wrap-break-word text-[11px] leading-[1.6] text-[#46433E]">{children}</div>
        </div>
    );
};

export function LedgerTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [
        { label: "Email", value: personal.email.trim() },
        { label: "Phone", value: personal.phone.trim() },
        { label: "Location", value: personal.location.trim() },
    ].filter((item) => item.value.length > 0);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry border-t-[3px] border-[#272724] pt-3">
                <div className="flex items-center justify-between gap-4 font-mono text-[8px] font-medium uppercase tracking-[0.13em] text-[#827A72]" />

                <div className={`mt-7 grid gap-7 ${contacts.length > 0 ? "grid-cols-[minmax(0,1fr)_182px]" : "grid-cols-1"}`}>
                    <div className="min-w-0">
                        {personal.fullName.trim() && (
                            <h1 style={serifFont} className="wrap-break-word text-[45px] font-medium leading-[0.95] tracking-[-0.045em] text-[#272724]">{personal.fullName}</h1>
                        )}

                        {role && (
                            <p className="mt-4 wrap-break-word text-[12px] font-medium tracking-[0.015em] text-[#956C51]">{role}</p>
                        )}
                    </div>

                    {contacts.length > 0 && (
                        <div className="min-w-0 space-y-3 border-l border-[#D8D4CE] pl-5">
                            {contacts.map((contact) => (
                                <div key={contact.label} className="min-w-0 space-y-0.5">
                                    <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#827A72]">{contact.label}</p>
                                    <p className="wrap-break-word text-[10px] leading-[1.4] text-[#34322E]">{contact.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>
        ) : null,

        summary: summary.trim() ? (
            <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-x-5 pt-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-[#827A72]"> Overview</span>
                <p className="min-w-0 whitespace-pre-line wrap-break-word text-[12px] leading-[1.65] text-[#46433E]">{summary}</p>
            </div>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div>
                {visibleExperience.map((item) => (
                    <LedgerEntry
                        key={item.id}
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                    >
                        <Description value={item.description} />
                    </LedgerEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div>
                {visibleEducation.map((item) => (
                    <LedgerEntry
                        key={item.id}
                        period={formatResumePeriod(item)}
                        title={item.institution}
                        subtitle={[item.degree, item.fieldOfStudy,].filter(Boolean).join(" · ")}
                    >
                        <Description value={item.description} />
                    </LedgerEntry>
                ))}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div>
                {visibleSkillGroups.map((group) => (
                    <LedgerDetailRow key={group.id} label={group.name.trim() || "Skills"}>
                        {group.skills.join(" · ")}
                    </LedgerDetailRow>
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
                        <LedgerEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                        >
                            <Description value={item.description} />

                            {technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#66615B]">
                                    <span className="font-semibold text-[#34322E]">Tools:{" "}</span>

                                    {technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#956C51]">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer">Repository</a>
                                    )}
                                </div>
                            )}
                        </LedgerEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div>
                {visibleLanguages.map((item) => (
                    <LedgerDetailRow key={item.id} label={item.name}>
                        {item.level || "Not specified"}
                    </LedgerDetailRow>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = getVisibleTemplateSections(sections, content);

    return (
        <article className="cv-document cv-ledger box-border min-h-280.75 w-full space-y-8 bg-white px-14 py-13 font-sans text-[#272724]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const keepTogether = (section.id === "summary" && summary.length <= 260) || (section.id === "languages" && visibleLanguages.length <= 4);

                return (
                    <LedgerSection
                        key={section.id}
                        title={SECTION_TITLES[section.id]}
                        number={getTemplateSectionNumber(visibleSections, section.id)}
                        keepTogether={keepTogether}
                    >
                        {content[section.id]}
                    </LedgerSection>
                );
            })}
        </article>
    );
};