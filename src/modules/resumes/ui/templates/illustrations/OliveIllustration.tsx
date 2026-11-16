export function OliveIllustration() {
    const sections = [
        {
            number: "01",
            title: "PROFILE",
            text: "Creative strategist focused on thoughtful digital experiences.",
        },
        {
            number: "02",
            title: "EXPERIENCE",
            text: "Creative Strategy Lead",
            detail: "Studio North · 2022–Present",
        },
        {
            number: "03",
            title: "EDUCATION",
            text: "University of Arts",
            detail: "Visual Communication",
        },
    ];

    return (
        <div className="font-sans text-[#26392D]">
            <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
                <div className="flex min-h-23.25 flex-col justify-between bg-[#214D3D] p-2.5">
                    <span className="text-[5px] font-semibold tracking-wide text-[#B8D5B9]">PERSONAL</span>
                    <span className="text-[22px] font-bold leading-none tracking-[-0.06em] text-white">AM</span>

                    <div className="h-0.5 w-5 bg-[#A8CBAA]" />
                </div>

                <div className="flex min-w-0 flex-col justify-center gap-2">
                    <div>
                        <p className="text-[14px] font-semibold leading-[1.05] tracking-tight text-[#26392D]">
                            Alex
                            <br />
                            Morgan
                        </p>

                        <p className="mt-1.5 text-[7px] font-medium text-[#4E7860]">Creative Director</p>
                    </div>

                    <div className="space-y-1 border-t border-[#D4DED2] pt-2">
                        <p className="text-[5px] text-[#627567]">Warsaw, Poland</p>
                        <p className="text-[5px] text-[#627567]">alex@email.com</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {sections.map((section) => (
                    <div key={section.number}>
                        <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
                            <div className="flex min-h-8.25 flex-col justify-between bg-[#214D3D] px-2 py-1.5">
                                <span className="text-[8px] font-bold text-[#A8CBAA]">{section.number}</span>
                                <span className="text-[5px] font-semibold tracking-[0.06em] text-white">{section.title}</span>
                            </div>

                            <div className="flex items-end border-b border-[#D4DED2] pb-1.5">
                                <p className="text-[6px] font-semibold tracking-wider text-[#4E7860]">{section.title}</p>
                            </div>
                        </div>

                        <div className="mt-2 pl-16">
                            <p className="text-[7px] font-medium leading-[1.4] text-[#36483B]">{section.text}</p>

                            {section.detail && (
                                <p className="mt-1 text-[6px] text-[#6C7E70]">{section.detail}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};