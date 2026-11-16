export function LedgerIllustration() {
    return (
        <div className="font-sans text-[#272724]">
            <div className="border-t-2 border-[#272724] pt-1.5">
                <div className="flex justify-between font-mono text-[5px] uppercase tracking-wide text-[#827A72]" />
            </div>

            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_58px] gap-2">
                <div className="min-w-0">
                    <p style={{ fontFamily: '"Newsreader Variable", Georgia, serif' }} className="text-[21px] leading-[0.95] tracking-tight">Alex Morgan</p>
                    <p className="mt-2 text-[6px] font-medium text-[#956C51]">Brand Strategist</p>
                </div>

                <div className="space-y-1 border-l border-[#D8D4CE] pl-2 text-[5px] leading-[1.3] text-[#66615B]">
                    <p>EMAIL</p>
                    <p className="text-[#272724]">alex@email.com</p>

                    <p className="pt-1">LOCATION</p>
                    <p className="text-[#272724]">Warsaw, Poland</p>
                </div>
            </div>

            <div className="mt-5 space-y-3.5">
                <div>
                    <div className="flex gap-2 border-t border-[#AAA59D] pt-1.5">
                        <span className="font-mono text-[6px] text-[#956C51]">01</span>
                        <span className="text-[8px] font-semibold">Profile</span>
                    </div>

                    <div className="mt-2 grid grid-cols-[43px_minmax(0,1fr)] gap-2">
                        <span className="text-[5px] text-[#827A72]">Overview</span>
                        <p className="text-[6px] leading-[1.4] text-[#46433E]">Creative professional bringing clarity to complex ideas.</p>
                    </div>
                </div>

                <div>
                    <div className="flex gap-2 border-t border-[#AAA59D] pt-1.5">
                        <span className="font-mono text-[6px] text-[#956C51]">02</span>
                        <span className="text-[8px] font-semibold">Professional Experience</span>
                    </div>

                    {[
                        {
                            period: "2022 – Now",
                            title: "Strategy Lead",
                            place: "North Studio",
                        },
                        {
                            period: "2019 – 2022",
                            title: "Brand Designer",
                            place: "Forma Agency",
                        },
                    ].map((item) => (
                        <div key={item.title} className="grid grid-cols-[43px_minmax(0,1fr)] gap-2 border-b border-[#E0DDD7] py-2">
                            <span className="font-mono text-[5px] text-[#827A72]">{item.period}</span>

                            <div className="space-y-1">
                                <p className="text-[7px] font-semibold">{item.title}</p>
                                <p className="text-[6px] text-[#956C51]">{item.place}</p>

                                <div className="h-0.75 w-4/5 bg-[#E0DDD7]" />
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="flex gap-2 border-t border-[#AAA59D] pt-1.5">
                        <span className="font-mono text-[6px] text-[#956C51]">03</span>
                        <span className="text-[8px] font-semibold">Expertise</span>
                    </div>

                    <div className="mt-2 grid grid-cols-[43px_minmax(0,1fr)] gap-2">
                        <span className="text-[5px] text-[#956C51]">Research</span>
                        <p className="text-[6px] text-[#46433E]">Strategy · Design · Leadership</p>
                    </div>
                </div>
            </div>
        </div>
    );
};