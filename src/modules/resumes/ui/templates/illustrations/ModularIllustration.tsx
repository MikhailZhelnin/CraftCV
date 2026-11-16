export function ModularIllustration() {
    const displayFont = {
        fontFamily: '"Unbounded Variable", "Inter Variable", sans-serif',
    };

    const monoFont = {
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
    };

    return (
        <div className="font-sans text-[#242424]">
            <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
                <div className="flex min-h-16 items-center bg-[#2549B8] p-2 text-white">
                    <p style={displayFont} className="text-[12px] font-extrabold leading-[1.12] tracking-[-0.065em] text-white">
                        Alex
                        <br />
                        Morgan
                    </p>
                </div>

                <div className="flex flex-col justify-between bg-[#E65D45] p-2">
                    <span style={monoFont} className="text-[4px] uppercase tracking-wide text-[#252525]">Role / Position</span>

                    <p style={displayFont} className="text-[7px] font-bold leading-[1.3] tracking-[-0.03em] text-[#252525]">
                        Product
                        <br />
                        Designer
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div className="bg-[#252525] p-2">
                    <span style={monoFont} className="block text-[4px] uppercase tracking-wide text-[#C4C5C0]">Email</span>
                    <p className="mt-1 text-[5px] leading-[1.35] text-white">alex@email.com</p>
                </div>

                <div className="bg-[#E9DFCF] p-2">
                    <span style={monoFont} className="block text-[4px] uppercase tracking-wide text-[#605950]">Location / Phone</span>
                    <p className="mt-1 text-[5px] leading-[1.3] text-[#252525]">Berlin</p>
                    <p className="text-[5px] leading-[1.3] text-[#252525]"> +49 123 456 789</p>
                </div>
            </div>

            <div className="mt-3 space-y-3">
                <div>
                    <div className="flex items-center gap-1.5 border-b border-[#242424] pb-1">
                        <span style={monoFont} className="bg-[#E65D45] px-1.5 py-1 text-[6px] font-bold text-[#252525]">01</span>
                        <span style={displayFont} className="text-[8px] font-bold">Profile</span>
                    </div>

                    <div className="mt-1.5 grid grid-cols-[35px_minmax(0,1fr)] bg-[#E9DFCF]">
                        <span className="bg-[#2549B8] p-1 text-[5px] text-white">IN / BRIEF</span>
                        <p className="p-1 text-[5px] leading-[1.35] text-[#242424]">
                            Thoughtful digital products,
                            clear visual systems.
                        </p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-1.5 border-b border-[#242424] pb-1">
                        <span style={monoFont} className="bg-[#2549B8] px-1.5 py-1 text-[6px] font-bold text-white">02</span>
                        <span style={displayFont} className="text-[8px] font-bold">Experience</span>
                    </div>

                    <div className="mt-1.5 grid grid-cols-[43px_minmax(0,1fr)] gap-2 border-b border-[#D3CABC] pb-1.5">
                        <div className="bg-[#E9DFCF] p-1 text-[5px] leading-[1.3]">
                            <span className="text-[#B64430]"> WORK / 01</span>
                            <p>2022 – Now</p>
                        </div>

                        <div className="min-w-0 space-y-1">
                            <p className="text-[7px] font-bold leading-[1.2]">Senior Product Designer</p>
                            <p className="text-[6px] text-[#B64430]">North Studio</p>
                            <div className="h-0.75 w-4/5 bg-[#D3CABC]" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-1.5 border-b border-[#242424] pb-1">
                        <span style={monoFont} className="bg-[#E65D45] px-1.5 py-1 text-[6px] font-bold text-[#252525]">03</span>
                        <span style={displayFont} className="text-[8px] font-bold">Expertise</span>
                    </div>

                    <div className="mt-1.5 flex gap-1.5 text-[5px]">
                        <span className="bg-[#DFE6F5] p-1.5 font-semibold">Strategy</span>
                        <span className="bg-[#F3DFD8] p-1.5 font-semibold">Research</span>
                        <span className="border border-[#D3CABC] p-1.5">Systems</span>
                    </div>
                </div>
            </div>
        </div>
    );
};