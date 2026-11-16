export function GridlineIllustration() {
    const displayFont = {
        fontFamily: '"Anton", Impact, "Inter Variable", sans-serif',
    };

    const monoFont = {
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
    };

    return (
        <div className="font-sans text-[#20211F]">
            <div className="border-2 border-[#20211F]">
                <div className="grid grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                    <div className="min-w-0 border-r-2 border-[#20211F] p-2">
                        <p style={monoFont} className="text-[5px] text-[#6B6B64]">NAME</p>
                        <p style={displayFont} className="mt-2 text-[17px] uppercase leading-[1.02]">
                            Alex
                            <br />
                            Morgan
                        </p>
                    </div>

                    <div className="flex min-w-0 flex-col justify-between bg-[#D94D3D] p-2">
                        <p style={monoFont} className="text-[5px]">POSITION</p>
                        <p className="text-[7px] font-bold leading-tight">
                            Design
                            <br />
                            Director
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t-2 border-[#20211F]">
                    {[["EMAIL", "alex@email.com"], ["PHONE", "+48 123 456"], ["CITY", "Warsaw"],].map(([label, value], index) => (
                        <div key={label} className={`min-w-0 p-1 ${index < 2 ? "border-r border-[#20211F]" : ""}`}>
                            <p style={monoFont} className="text-[4px] text-[#6B6B64]">{label}</p>
                            <p className="mt-0.5 wrap-break-word text-[5px] leading-[1.3]">{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-3 space-y-2.5">
                <div className="border border-[#20211F]">
                    <div className="grid grid-cols-[23px_minmax(0,1fr)] border-b border-[#20211F]">
                        <span style={monoFont} className="bg-[#F2CB45] p-1 text-[6px] font-bold">01</span>
                        <span style={displayFont} className="border-l border-[#20211F] bg-[#F7F7F2] px-2 py-1 text-[9px] uppercase">Profile</span>
                    </div>
                    <p className="p-2 text-[6px] leading-[1.4]">Creative strategist building clear digital products and systems.</p>
                </div>

                <div className="border border-[#20211F]">
                    <div className="grid grid-cols-[23px_minmax(0,1fr)] border-b border-[#20211F]">
                        <span style={monoFont} className="bg-[#F2CB45] p-1 text-[6px] font-bold">02</span>
                        <span style={displayFont} className="border-l border-[#20211F] bg-[#F7F7F2] px-2 py-1 text-[9px] uppercase">Experience</span>
                    </div>

                    {[["01", "2022–Now", "Design Lead", "North Studio"], ["02", "2019–22", "Visual Designer", "Forma Agency"]].map(([number, date, title, company], index) => (
                        <div key={number} className={`grid grid-cols-[43px_minmax(0,1fr)] ${index === 0 ? "border-b border-[#20211F]" : ""}`}>
                            <div className="border-r border-[#20211F] p-1">
                                <p style={monoFont} className="text-[5px] text-[#C34437]">{number}</p>
                                <p className="mt-1 text-[5px]">{date}</p>
                            </div>

                            <div className="min-w-0 space-y-1 p-1.5">
                                <p className="text-[6px] font-bold leading-[1.3]">{title}</p>
                                <p className="text-[5px] text-[#B74034]">{company}</p>
                                <div className="h-0.75 w-4/5 bg-[#D0D0C9]" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border border-[#20211F]">
                    <div className="grid grid-cols-[23px_minmax(0,1fr)] border-b border-[#20211F]">
                        <span style={monoFont} className="bg-[#F2CB45] p-1 text-[6px] font-bold">03</span>
                        <span style={displayFont} className="border-l border-[#20211F] bg-[#F7F7F2] px-2 py-1 text-[9px] uppercase">Expertise</span>
                    </div>

                    <div className="grid grid-cols-[43px_minmax(0,1fr)] text-[5px]">
                        <span className="border-r border-[#20211F] p-1 font-semibold">Design</span>
                        <span className="p-1">Strategy · Research · Systems</span>
                    </div>
                </div>
            </div>
        </div>
    );
};