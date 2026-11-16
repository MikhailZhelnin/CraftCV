export function EditorialIllustration() {
    return (
        <>
            <div className="h-0.75 w-12 bg-[#924E48]" />

            <div className="mt-3">
                <p className="text-[24px] leading-[0.95] text-[#292622]" style={{ fontFamily: '"Newsreader Variable", Georgia, serif' }}>
                    Alex
                    <br />
                    Morgan
                </p>

                <p className="mt-2 text-[8px] text-[#924E48]">Creative Strategy Director</p>
            </div>

            <div className="my-5 h-px bg-[#D8CEC4]" />

            <div className="space-y-4">
                {["PROFILE", "EXPERIENCE", "EDUCATION"].map(
                    (section, index) => (
                        <div key={section}>
                            <div className="mb-2 flex items-center gap-2 border-b border-[#D8CEC4] pb-2">
                                <span className="text-[7px] font-semibold text-[#924E48]">0{index + 1} /</span>
                                <span className="text-[7px] font-semibold tracking-[0.12em] text-[#292622]">{section}</span>
                            </div>

                            <div className="grid grid-cols-[35px_1fr] gap-3">
                                <div className="h-1 w-8 bg-[#C9BDB2]" />

                                <div className="space-y-1.5">
                                    <div className="h-1.25 w-22 bg-[#514B45]" />
                                    <div className="h-0.75 w-full bg-[#DDD6CF]" />
                                    <div className="h-0.75 w-4/5 bg-[#DDD6CF]" />
                                    <div className="h-0.75 w-3/5 bg-[#DDD6CF]" />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
};