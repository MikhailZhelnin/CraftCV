export function SwissIllustration() {
    const sections = [
        {
            number: "01",
            title: "PROFILE",
            content: "Product professional connecting strategy and digital experiences.",
        },
        {
            number: "02",
            title: "EXPERIENCE",
            content: "Senior Product Strategist\nNorth Studio · 2022–Present",
        },
        {
            number: "03",
            title: "EDUCATION",
            content: "University of Warsaw\nBusiness Administration",
        },
        {
            number: "04",
            title: "EXPERTISE",
            content: "Product Strategy · Research\nLeadership · Analytics",
        },
    ];

    return (
        <div className="font-sans text-[#1B2230]">
            <div className="h-1.25 w-full bg-[#3155D9]" />

            <div className="mt-4 grid grid-cols-[38px_minmax(0,1fr)] gap-2">
                <div className="pt-1">
                    <span className="text-[6px] font-bold uppercase tracking-wider text-[#3155D9]">IDENTITY</span>
                </div>

                <div className="min-w-0">
                    <p className="text-[20px] font-black leading-[0.95] tracking-[-0.06em] text-[#171D29]">
                        Alex
                        <br />
                        Morgan
                    </p>

                    <p className="mt-2 text-[8px] font-semibold text-[#3155D9]">Product Strategist</p>

                    <p className="mt-2 border-t border-[#CBD2DF] pt-1.5 text-[6px] text-[#778197]">Warsaw · alex@email.com</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                {sections.map((section) => (
                    <div key={section.number} className="grid grid-cols-[38px_minmax(0,1fr)] gap-2 border-t border-[#CBD2DF] pt-2">
                        <div>
                            <p className="text-[12px] font-black leading-none text-[#3155D9]">{section.number}</p>
                            <p className="mt-1 text-[5px] font-bold tracking-wide text-[#1B2230]">{section.title}</p>
                        </div>

                        <p className="whitespace-pre-line text-[7px] leading-[1.45] text-[#526074]">{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};