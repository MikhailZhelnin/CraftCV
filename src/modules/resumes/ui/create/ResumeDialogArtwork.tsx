import type { ResumeTemplateId } from "../../model/resume.templates";

interface ResumeDialogArtworkProps {
    templateId: ResumeTemplateId;
};

export function ResumeDialogArtwork({ templateId }: ResumeDialogArtworkProps) {
    const isModern = templateId === "modern";

    return (
        <div aria-hidden="true" className="hidden min-h-0 flex-col items-center justify-center gap-6 overflow-hidden border-r border-border bg-[#ECEBE6] p-7 md:flex">
            <span className="self-start text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">CVENZA / DOCUMENT STUDIO</span>

            <div className="flex flex-1 items-center justify-center">
                <div className="h-73 w-51.5 -rotate-2 border border-black/10 bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.10)] transition-transform duration-200">
                    {isModern ? (
                        <div className="mb-5 bg-slate-900 px-3 py-4">
                            <div className="h-2 w-24 bg-white" />
                            <div className="mt-2 h-1 w-16 bg-blue-300" />
                        </div>
                    ) : (
                        <div className="mb-5 border-b-2 border-slate-800 pb-4">
                            <div className="h-2 w-24 bg-slate-800" />
                            <div className="mt-2 h-1 w-16 bg-slate-400" />
                        </div>
                    )}

                    {[0, 1, 2].map((section) => (
                        <div key={section} className="mb-5 space-y-2">
                            <div className="flex items-center gap-2">
                                {isModern && (
                                    <span className="h-3 w-0.5 bg-blue-600" />
                                )}

                                <div className="h-1.5 w-16 bg-slate-700" />
                            </div>

                            <div className="space-y-1.5">
                                <div className="h-1 w-full bg-slate-200" />
                                <div className="h-1 w-11/12 bg-slate-200" />
                                <div className="h-1 w-4/5 bg-slate-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="self-start">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Your career.
                    <br />
                    In print.
                </p>

                <span className="mt-2 block text-[10px] text-muted-foreground">
                    MAKE YOUR NEXT MOVE ↗
                </span>
            </div>
        </div>
    );
};