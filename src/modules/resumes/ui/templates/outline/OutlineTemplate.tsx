import type { ReactNode } from "react";
import { BriefcaseBusiness, FolderKanban, GraduationCap, Layers3, Languages, Mail, MapPin, Phone, UserRound, type LucideIcon } from "lucide-react";

import type { CareerSectionId } from "@/modules/career-data";

import type { ResumeTemplateProps, ResumeTemplateContent } from "../template.types";
import { getRenderableCareerData, getResumeRole, hasPersonalContent, safeHttpUrl } from "../template.utils";

import { formatResumePeriod } from "../../preview/formatResumeDate";

const SECTION_META: Record<CareerSectionId, { title: string; icon: LucideIcon }> = {
    personal: { title: "Personal Details", icon: UserRound },
    summary: { title: "Profile", icon: UserRound },
    experience: { title: "Experience", icon: BriefcaseBusiness },
    education: { title: "Education", icon: GraduationCap },
    skills: { title: "Skills", icon: Layers3 },
    projects: { title: "Projects", icon: FolderKanban },
    languages: { title: "Languages", icon: Languages },
};

const serifFont = {
    fontFamily: '"Newsreader Variable", Georgia, serif',
};

function Description({ value }: { value: string }) {
    if (!value.trim()) return null;

    return (
        <p className="whitespace-pre-line wrap-break-word text-[11px] leading-[1.6] text-[#56505D]">{value}</p>
    );
};

function OutlineSection({ title, icon: Icon, children, keepTogether = false }: { title: string; icon: LucideIcon; children: ReactNode; keepTogether?: boolean; }) {
    return (
        <section className={["cv-section cv-outline-card", "rounded-[14px] border border-[#BEB5C9]", "bg-white px-6 py-5", keepTogether ? "cv-outline-compact" : ""].join(" ")}>
            <div className="cv-section-heading mb-4 flex items-center gap-3">
                <Icon className="size-4.25 shrink-0 text-[#694E85]" strokeWidth={1.8} aria-hidden="true" />

                <h2 style={serifFont} className="text-[20px] font-semibold leading-none text-[#3B2B4E]">{title}</h2>

                <div className="h-px min-w-4 flex-1 bg-[#DCD5E2]" />
            </div>

            {children}
        </section>
    );
};

function OutlineEntry({ period, title, subtitle, children }: { period?: string; title: string; subtitle?: string; children?: ReactNode; }) {
    return (
        <div className="cv-entry relative border-l border-[#D6CDDF] pb-1 pl-5">
            <span aria-hidden="true" className="absolute -left-1 top-1.25 size-1.75 rounded-full bg-[#795E98]" />

            <div className="space-y-1.5">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div className="min-w-0 flex-1">
                        {title.trim() && (
                            <h3 className="wrap-break-word text-[13px] font-semibold leading-[1.35] text-[#292332]">{title}</h3>
                        )}

                        {subtitle?.trim() && (
                            <p className="wrap-break-word text-[11px] text-[#766B7D]">{subtitle}</p>
                        )}
                    </div>

                    {period && (
                        <span className="shrink-0 rounded-full bg-[#F0EAF4] px-2.5 py-1 text-[9px] font-medium leading-none text-[#604978]">{period}</span>
                    )}
                </div>

                {children}
            </div>
        </div>
    );
};

export function OutlineTemplate({ data, targetRole, sections }: ResumeTemplateProps) {
    const { personal, summary } = data;

    const role = getResumeRole(targetRole, personal.jobTitle);

    const hasPersonal = hasPersonalContent(personal, role);

    const { visibleExperience, visibleEducation, visibleProjects, visibleSkillGroups, visibleLanguages } = getRenderableCareerData(data);

    const contacts = [
        { id: "email", icon: Mail, value: personal.email.trim() },
        { id: "phone", icon: Phone, value: personal.phone.trim() },
        { id: "location", icon: MapPin, value: personal.location.trim() },
    ].filter((item) => item.value.length > 0);

    const content: ResumeTemplateContent = {
        personal: hasPersonal ? (
            <header className="cv-entry cv-outline-card rounded-[14px] border border-[#BEB5C9] bg-white px-6 py-6">
                <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6">
                    <div className="min-w-0">
                        {personal.fullName.trim() && (
                            <h1 style={serifFont} className="wrap-break-word text-[40px] font-medium leading-none tracking-tight text-[#292332]">{personal.fullName}</h1>
                        )}

                        {role && (
                            <span className="mt-4 inline-block max-w-full rounded-full bg-[#EDE6F3] px-3 py-1.5 text-[11px] font-medium text-[#624A7C]">{role}</span>
                        )}
                    </div>

                    {contacts.length > 0 && (
                        <div className="flex min-w-0 flex-col justify-center gap-2.5 border-l border-[#DCD5E2] pl-5">
                            {contacts.map((contact) => {
                                const Icon = contact.icon;

                                return (
                                    <div key={contact.id} className="flex items-start gap-2.5">
                                        <Icon aria-hidden="true" className="mt-0.5 size-3 shrink-0 text-[#694E85]" strokeWidth={1.8} />

                                        <span className="min-w-0 wrap-break-word text-[10px] leading-[1.4] text-[#524A5C]">{contact.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </header>
        ) : null,

        summary: summary.trim() ? (
            <p className="whitespace-pre-line wrap-break-word text-[12px] leading-[1.7] text-[#4C4553]">{summary}</p>
        ) : null,

        experience: visibleExperience.length > 0 ? (
            <div className="space-y-5">
                {visibleExperience.map((item) => (
                    <OutlineEntry
                        key={item.id}
                        period={formatResumePeriod(item)}
                        title={item.position}
                        subtitle={item.company}
                    >
                        <Description value={item.description} />
                    </OutlineEntry>
                ))}
            </div>
        ) : null,

        education: visibleEducation.length > 0 ? (
            <div className="space-y-4">
                {visibleEducation.map((item) => {
                    const details = [item.degree, item.fieldOfStudy,].filter(Boolean).join(" · ");

                    return (
                        <OutlineEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.institution}
                            subtitle={details}
                        >
                            <Description value={item.description} />
                        </OutlineEntry>
                    );
                })}
            </div>
        ) : null,

        skills: visibleSkillGroups.length > 0 ? (
            <div className="space-y-4">
                {visibleSkillGroups.map((group) => (
                    <div key={group.id} className="cv-entry space-y-2">
                        <h3 className="text-[11px] font-semibold text-[#463653]">{group.name.trim() || "Skills"}</h3>

                        <div className="flex flex-wrap gap-1.5">
                            {group.skills.map((skill) => (
                                <span key={skill} className="wrap-break-word rounded-full bg-[#F0EAF4] px-2.5 py-1 text-[10px] leading-[1.35] text-[#594470]">{skill}</span>
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
                        <OutlineEntry
                            key={item.id}
                            period={formatResumePeriod(item)}
                            title={item.name}
                            subtitle={item.role}
                        >
                            <Description value={item.description} />

                            {item.technologies.length > 0 && (
                                <p className="wrap-break-word text-[10px] leading-[1.6] text-[#766B7D]">
                                    <span className="font-semibold">Tools & Methods:{" "}</span>

                                    {item.technologies.join(" · ")}
                                </p>
                            )}

                            {(website || repository) && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    {website && (
                                        <a href={website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-[#694E85] underline underline-offset-2">Website</a>
                                    )}

                                    {repository && (
                                        <a href={repository} target="_blank" rel="noopener noreferrer" className="text-[10px] font-medium text-[#694E85] underline underline-offset-2">Repository</a>
                                    )}
                                </div>
                            )}
                        </OutlineEntry>
                    );
                })}
            </div>
        ) : null,

        languages: visibleLanguages.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {visibleLanguages.map((item) => (
                    <div key={item.id} className="cv-entry flex min-w-0 items-baseline justify-between gap-2 border-b border-[#E5DFEA] pb-2">
                        <span className="wrap-break-word text-[11px] font-medium text-[#322A3A]">{item.name}</span>

                        {item.level && (
                            <span className="shrink-0 text-[10px] font-semibold text-[#755B92]">{item.level}</span>
                        )}
                    </div>
                ))}
            </div>
        ) : null,
    };

    const visibleSections = sections.filter((section) => section.visible && content[section.id] !== null);

    return (
        <article className="cv-document cv-outline box-border min-h-280.75 w-full space-y-5 bg-white px-13 py-12 font-sans text-[#292332]" style={{ colorScheme: "light" }}>
            {visibleSections.map((section) => {
                if (section.id === "personal") {
                    return (
                        <div key={section.id}>{content.personal}</div>
                    );
                };

                const meta = SECTION_META[section.id];

                const keepTogether = section.id === "summary" || (section.id === "languages" && visibleLanguages.length <= 5) || (section.id === "education" && visibleEducation.length <= 2);

                return (
                    <OutlineSection
                        key={section.id}
                        title={meta.title}
                        icon={meta.icon}
                        keepTogether={keepTogether}
                    >
                        {content[section.id]}
                    </OutlineSection>
                );
            })}
        </article>
    );
};