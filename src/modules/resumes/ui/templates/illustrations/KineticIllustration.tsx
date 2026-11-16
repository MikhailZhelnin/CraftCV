export function KineticIllustration() {
    const displayFont = {
        fontFamily: '"Syne Variable", "Unbounded Variable", "Inter Variable", sans-serif',
    };

    const monoFont = {
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
    };

    return (
        <div className="font-sans text-[#292033]">
            <div className="border-t-[3px] border-[#5C2ABF] pt-3">
                <p style={monoFont} className="text-[5px] uppercase tracking-widest text-[#6A5B7C]">Name</p>
                <p style={displayFont} className="mt-2 text-[24px] font-extrabold leading-[0.94] tracking-[-0.07em] text-[#5C2ABF]">
                    Alex
                    <br />
                    Morgan
                </p>
            </div>

            <div className="mt-3 ml-5 bg-[#C8F5D2] px-2 py-2">
                <p style={monoFont} className="text-[5px] uppercase text-[#4B3278]">Position</p>
                <p style={displayFont} className="mt-1 text-[9px] font-bold leading-[1.2]">Design Director</p>
            </div>

            <div className="mt-3 mr-4 flex flex-wrap gap-x-3 gap-y-1 bg-[#5C2ABF] px-2 py-2 text-[5px] text-white">
                <span>Berlin</span>
                <span>alex@email.com</span>
            </div>

            <div className="mt-4 space-y-3.5">
                <div>
                    <div className="flex items-end justify-between gap-1.5 border-b-2 border-[#5C2ABF] pb-1">
                        <span style={displayFont} className="text-[11px] font-extrabold tracking-tight">Profile</span>
                        <span style={monoFont} className="text-[8px] text-[#5C2ABF]">01</span>
                    </div>

                    <p className="mt-1.5 border-l-2 border-[#5C2ABF] pl-2 text-[6px] leading-[1.45] text-[#4D4858]">
                        Building thoughtful digital
                        products with a bold, human
                        approach.
                    </p>
                </div>

                <div>
                    <div className="flex items-end justify-between gap-1.5 border-b-2 border-[#5C2ABF] pb-1">
                        <span style={displayFont} className="text-[11px] font-extrabold tracking-tight">Experience</span>
                        <span style={monoFont} className="text-[8px] text-[#5C2ABF]">02</span>
                    </div>

                    <div className="mt-2 flex items-start justify-between gap-2">
                        <div>
                            <p className="text-[7px] font-bold">Lead Designer</p>
                            <p className="mt-1 text-[6px] text-[#5C2ABF]">North Studio</p>
                        </div>

                        <span style={monoFont} className="text-[5px] text-[#61566F]">2022 — Now</span>
                    </div>

                    <div className="mt-1.5 h-0.75 w-4/5 bg-[#E0DAE8]" />
                </div>

                <div>
                    <div className="flex items-end justify-between gap-1.5 border-b-2 border-[#5C2ABF] pb-1">
                        <span style={displayFont} className="text-[11px] font-extrabold tracking-tight">Expertise</span>
                        <span style={monoFont} className="text-[8px] text-[#5C2ABF]">03</span>
                    </div>

                    <p className="mt-2 text-[6px] font-semibold text-[#5C2ABF]">Strategy</p>
                    <p className="mt-1 ml-3 text-[6px] text-[#4D4858]">Product / Research / Systems</p>
                </div>
            </div>
        </div>
    );
};