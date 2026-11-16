import type { ResumeTemplateId } from "../../model/resume.templates";

import { ResumeTemplateIllustration } from "../templates/ResumeTemplateIllustration";

interface ResumeDialogArtworkProps {
    templateId: ResumeTemplateId;
};

export function ResumeDialogArtwork({ templateId }: ResumeDialogArtworkProps) {
    return (
        <div aria-hidden="true" className="hidden min-h-0 flex-col items-center justify-center gap-6 overflow-hidden border-r border-border bg-[#ECEBE6] p-7 dark:bg-[#292C27] md:flex">
            <span className="self-start text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">CVENZA / DOCUMENT STUDIO</span>

            <div className="flex flex-1 items-center justify-center">
                <div className="-rotate-2 shadow-[0_12px_35px_rgba(0,0,0,0.10)] transition-transform duration-200">
                    <ResumeTemplateIllustration templateId={templateId} size="large" />
                </div>
            </div>

            <div className="self-start">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Your career.
                    <br />
                    In print.
                </p>

                <span className="mt-2 block text-[10px] text-muted-foreground">MAKE YOUR NEXT MOVE ↗</span>
            </div>
        </div>
    );
};