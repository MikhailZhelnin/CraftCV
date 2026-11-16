import type { ReactNode } from "react";

function StandardSection({ title, isModern, children }: { title: string; isModern: boolean; children: ReactNode; }) {
    return (
        <section className="space-y-2">
            <div className={isModern ? "border-l-[3px] border-[#3158D7] pl-2" : "border-b border-[#CBD5E1] pb-1.5"}>
                <h3 className={isModern ? "text-[8px] font-bold uppercase tracking-[0.08em] text-[#1E40AF]" : "text-[8px] font-bold uppercase tracking-widest text-[#334155]"}>{title}</h3>
            </div>

            {children}
        </section>
    );
};

function StandardExperience({ title, company, period, description, }: { title: string; company: string; period: string; description: string; }) {
    return (
        <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-[8px] font-bold text-[#1E293B]">{title}</p>
                    <p className="text-[7px] text-[#64748B]">{company}</p>
                </div>

                <span className="shrink-0 text-[6px] text-[#94A3B8]">{period}</span>
            </div>

            <p className="text-[7px] leading-[1.45] text-[#64748B]">{description}</p>
        </div>
    );
};

export function StandardIllustration({ isModern }: { isModern: boolean; }) {
    return (
        <div className="font-sans text-[#1E293B]">
            <header className={isModern ? "space-y-1.5 rounded-[3px] bg-[#0F172A] p-3" : "space-y-1.5 border-b-2 border-[#273448] pb-3"}>
                <h2 className={isModern ? "text-[17px] font-bold leading-none tracking-tight text-white" : "text-[17px] font-bold leading-none tracking-tight text-[#0F172A]"}>Alex Morgan</h2>
                <p className={isModern ? "text-[9px] font-medium text-[#BFDBFE]" : "text-[9px] font-medium text-[#475569]"}>Marketing Specialist</p>
                <p className={isModern ? "text-[6px] text-[#CBD5E1]" : "text-[6px] text-[#64748B]"}>Warsaw · +48 123 456 789 · alex@email.com</p>
            </header>

            <div className="mt-4 space-y-3.5">
                <StandardSection title="Professional Summary" isModern={isModern}>
                    <p className="text-[7px] leading-normal text-[#64748B]">
                        Creative marketing professional with experience
                        in digital campaigns, brand development and
                        cross-functional collaboration.
                    </p>
                </StandardSection>

                <StandardSection title="Work Experience" isModern={isModern}>
                    <div className="space-y-2.5">
                        <StandardExperience
                            title="Marketing Manager"
                            company="Studio North"
                            period="2022 – Now"
                            description="Led brand campaigns and coordinated digital marketing projects."
                        />

                        <StandardExperience
                            title="Content Strategist"
                            company="Creative Agency"
                            period="2020 – 2022"
                            description="Developed content strategies for digital channels."
                        />
                    </div>
                </StandardSection>

                <StandardSection title="Education" isModern={isModern}>
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-[8px] font-bold text-[#1E293B]">University of Warsaw</p>
                            <p className="text-[7px] text-[#64748B]">BA in Marketing</p>
                        </div>

                        <span className="shrink-0 text-[6px] text-[#94A3B8]">2016 – 2020</span>
                    </div>
                </StandardSection>

                <StandardSection title="Skills" isModern={isModern}>
                    <div className="space-y-1">
                        <p className="text-[7px] font-semibold text-[#334155]">Professional Skills</p>
                        <p className="text-[7px] leading-[1.45] text-[#64748B]">Brand Strategy · Marketing · Analytics</p>
                    </div>
                </StandardSection>
            </div>
        </div>
    );
};