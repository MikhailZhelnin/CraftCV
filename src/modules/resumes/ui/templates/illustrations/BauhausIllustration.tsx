export function BauhausIllustration() {
    return (
        <div className="font-sans text-[#292923]">
            <div className="border-t-[3px] border-[#292923] pt-1.5">
                <div className="flex justify-between text-[5px] font-extrabold uppercase tracking-widest" />
            </div>

            <div className="mt-2 grid grid-cols-[minmax(0,1fr)_52px] items-center gap-2">
                <div className="min-w-0">
                    <p className="text-[19px] font-black leading-[0.95] tracking-[-0.06em]">
                        Alex
                        <br />
                        Morgan
                    </p>

                    <p className="mt-2 border-l-[3px] border-[#C85439] pl-1.5 text-[6px] font-bold text-[#A84731]">Design Strategist</p>
                </div>
            </div>

            <div className="mt-3 bg-[#292923] px-2 py-1.5 text-[5px] text-[#FFF5E6]">alex@example.com · Warsaw, Poland</div>

            <div className="mt-4 space-y-3">
                {[
                    {
                        number: "01",
                        title: "PROFILE",
                        lines: ["Creative problem solver with a", "focus on meaningful products."],
                    },
                    {
                        number: "02",
                        title: "EXPERIENCE",
                        lines: ["Senior Designer · North Studio", "2022 – Present"],
                    },
                    {
                        number: "03",
                        title: "EXPERTISE",
                        lines: ["Research / Strategy / Design", "Leadership / Communication"],
                    },
                ].map((section) => (
                    <div key={section.number}>
                        <div className="flex items-center gap-2 border-b border-[#292923] pb-1">
                            <span className="flex size-5 items-center justify-center bg-[#C85439] text-[7px] font-black text-white">{section.number}</span>
                            <span className="text-[8px] font-extrabold tracking-tight">{section.title}</span>
                            <span className="ml-auto size-1.5 rounded-full bg-[#292923]" />
                        </div>

                        <div className="mt-1.5 space-y-1 pl-2">
                            {section.lines.map((line) => (
                                <p key={line} className="text-[6px] leading-[1.35] text-[#555149]">{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};