export function StudioIllustration() {
    return (
        <div className="font-sans text-[#242724]">
            <div
                className="flex justify-between gap-2 border-b border-[#242724] pb-1.5 text-[5px] uppercase tracking-[0.09em] text-[#6B6F66]"
                style={{ fontFamily: '"IBM Plex Mono", monospace', }}
            >
            </div>

            <div className="mt-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p
                        className="text-[23px] font-extrabold leading-[0.9] tracking-[-0.07em]"
                        style={{ fontFamily: '"Bricolage Grotesque Variable", sans-serif' }}
                    >
                        Alex
                        <br />
                        Morgan
                    </p>

                    <p
                        className="mt-2 text-[12px] italic leading-[1.05] text-[#434A3F]"
                        style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                    >
                        Art Director
                    </p>
                </div>

                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DDEA83] text-[10px] font-extrabold tracking-tighter">CV.</div>
            </div>

            <div
                className="mt-3 border-y border-[#DADCD5] py-1.5 text-[5px] text-[#51564E]"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
                Berlin · alex@example.com
            </div>

            <div className="mt-4 space-y-3.5">
                {[
                    {
                        number: "01",
                        title: "Profile",
                        lines: ["Building clear digital experiences", "with a thoughtful design practice."],
                    },
                    {
                        number: "02",
                        title: "Experience",
                        lines: ["Lead Designer · Studio North", "2022 – Present"],
                    },
                    {
                        number: "03",
                        title: "Expertise",
                        lines: ["Design · Strategy · Research"],
                    },
                ].map((section) => (
                    <div key={section.number}>
                        <div className="flex items-end gap-1.5 border-b-2 border-[#242724] pb-1">
                            <span className="text-[6px] text-[#6B6F66]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>/{section.number}</span>

                            <span
                                className="min-w-0 flex-1 text-[10px] font-bold leading-none tracking-tight"
                                style={{ fontFamily: '"Bricolage Grotesque Variable", sans-serif' }}
                            >
                                {section.title}
                            </span>

                            <span className="size-1.5 shrink-0 bg-[#DDEA83]" />
                        </div>

                        <div className="mt-1.5 space-y-1">
                            {section.lines.map((line) => (
                                <p key={line} className="text-[6px] leading-[1.4] text-[#4E514C]">{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};