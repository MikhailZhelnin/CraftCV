export function OutlineIllustration() {
    return (
        <div className="space-y-3 font-sans text-[#292332]">
            <div className="rounded-[9px] border border-[#BEB5C9] p-3">
                <div className="grid grid-cols-[1.25fr_1fr] gap-2">
                    <div className="min-w-0">
                        <p className="text-[16px] leading-none text-[#292332]" style={{ fontFamily: '"Newsreader Variable", Georgia, serif', }}>Alex Morgan</p>
                        <span className="mt-2 inline-block rounded-full bg-[#EDE6F3] px-2 py-1 text-[6px] text-[#624A7C]">Product Manager</span>
                    </div>

                    <div className="space-y-1.5 border-l border-[#DCD5E2] pl-2">
                        {["alex@example.com", "+48 123 456 789", "Warsaw, Poland"].map((item) => (
                            <p key={item} className="wrap-break-word text-[5px] leading-[1.2] text-[#665A70]">{item}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-[9px] border border-[#BEB5C9] p-3">
                <div className="mb-2 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#604978]" style={{ fontFamily: '"Newsreader Variable", Georgia, serif' }}>Profile</span>

                    <div className="h-px flex-1 bg-[#DCD5E2]" />
                </div>

                <p className="text-[6px] leading-normal text-[#56505D]">
                    Product professional experienced in digital
                    strategy, design and cross-functional teams.
                </p>
            </div>

            <div className="rounded-[9px] border border-[#BEB5C9] p-3">
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#604978]" style={{ fontFamily: '"Newsreader Variable", Georgia, serif' }}>Experience</span>

                    <div className="h-px flex-1 bg-[#DCD5E2]" />
                </div>

                <div className="space-y-3">
                    {[
                        {
                            title: "Senior Product Manager",
                            company: "North Studio",
                            period: "2022–Now",
                            description: "Leading digital product strategy and delivery.",
                        },
                        {
                            title: "Product Specialist",
                            company: "Bright Agency",
                            period: "2019–2022",
                            description: "Supporting product research and development.",
                        },
                    ].map((item) => (
                        <div key={item.title} className="border-l border-[#D6CDDF] pl-2">
                            <div className="flex items-start justify-between gap-1">
                                <span className="text-[7px] font-semibold leading-tight text-[#292332]">{item.title}</span>
                                <span className="shrink-0 rounded-full bg-[#F0EAF4] px-1 py-0.5 text-[5px] text-[#604978]">{item.period}</span>
                            </div>

                            <p className="mt-1 text-[6px] text-[#766B7D]">{item.company}</p>

                            <p className="mt-1 text-[6px] leading-[1.4] text-[#56505D]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-[9px] border border-[#BEB5C9] p-2.5">
                    <p className="text-[10px] font-semibold text-[#604978]" style={{ fontFamily: '"Newsreader Variable", Georgia, serif' }}>Education</p>

                    <div className="mt-2 space-y-1">
                        <p className="text-[6px] font-semibold text-[#292332]">University of Warsaw</p>
                        <p className="text-[5px] text-[#766B7D]">Business Administration</p>
                    </div>
                </div>

                <div className="rounded-[9px] border border-[#BEB5C9] p-2.5">
                    <p className="text-[10px] font-semibold text-[#604978]" style={{ fontFamily: '"Newsreader Variable", Georgia, serif' }}>Skills</p>

                    <div className="mt-2 flex flex-wrap gap-1">
                        {["Strategy", "Research", "Leadership"].map((skill) => (
                            <span key={skill} className="rounded-full bg-[#F0EAF4] px-1.5 py-0.5 text-[5px] text-[#604978]">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};