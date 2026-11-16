export function NordicIllustration() {
    return (
        <div className="font-sans text-[#293A32]">
            <div className="mt-4">
                <p className="text-[23px] font-medium leading-none tracking-[-0.055em]">Alex Morgan</p>
                <p className="mt-2 text-[7px] font-medium text-[#5C7A6C]">Product Designer</p>
                <div className="mt-3 border-t border-[#DCE5DF] pt-1.5 text-[5px] text-[#596960]">Copenhagen · alex@email.com</div>
            </div>

            <div className="mt-5 space-y-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-0.5 w-4 rounded-full bg-[#789486]" />
                        <span className="text-[9px] font-semibold">About Me</span>
                        <span className="h-px flex-1 bg-[#DCE5DF]" />
                    </div>

                    <p className="mt-2 text-[6px] leading-normal text-[#52615A]">
                        Designing thoughtful digital experiences
                        with clarity and care.
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-0.5 w-4 rounded-full bg-[#789486]" />
                        <span className="text-[9px] font-semibold">Experience</span>
                        <span className="h-px flex-1 bg-[#DCE5DF]" />
                    </div>

                    <div className="mt-3 space-y-3">
                        {[
                            {
                                title: "Senior Designer",
                                company: "Studio North",
                                date: "2022–Now",
                            },
                            {
                                title: "Visual Designer",
                                company: "Form & Function",
                                date: "2019–2022",
                            },
                        ].map((entry) => (
                            <div key={entry.title} className="border-l border-[#D6E0D9] pl-2">
                                <div className="flex items-start justify-between gap-1">
                                    <p className="text-[7px] font-semibold">{entry.title}</p>
                                    <p className="shrink-0 text-[5px] text-[#718179]">{entry.date}</p>
                                </div>

                                <p className="mt-1 text-[6px] text-[#5C7A6C]">{entry.company}</p>

                                <div className="mt-1.5 h-0.75 w-4/5 bg-[#E4EAE5]" />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <span className="h-0.5 w-4 rounded-full bg-[#789486]" />
                        <span className="text-[9px] font-semibold">Skills &amp; Expertise</span>
                        <span className="h-px flex-1 bg-[#DCE5DF]" />
                    </div>

                    <p className="mt-2 text-[6px] text-[#52615A]">Research · Design Systems · Strategy</p>
                </div>
            </div>
        </div>
    );
};