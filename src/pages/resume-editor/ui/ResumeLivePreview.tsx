import type { Ref } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { ResumePreview, DEFAULT_RESUME_TEMPLATE, type ResumeDraft, type ResumePreviewHandle } from "@/modules/resumes";

interface ResumeLivePreviewProps {
    printRef: Ref<ResumePreviewHandle>;
};

export function ResumeLivePreview({ printRef }: ResumeLivePreviewProps) {
    const { control } = useFormContext<ResumeDraft>();

    const careerData = useWatch({ control, name: "careerData" });
    const targetRole = useWatch({ control, name: "targetRole" });
    const sections = useWatch({ control, name: "sections" });
    const templateId = useWatch({ control, name: "templateId" }) ?? DEFAULT_RESUME_TEMPLATE;
    const title = useWatch({ control, name: "title" });

    if (!careerData || !sections) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-medium text-foreground">Live Preview</h2>

                <span className="text-xs text-muted-foreground">
                    A4 · {templateId === "modern" ? "Modern" : "Classic"}
                </span>
            </div>

            <ResumePreview
                printRef={printRef}
                data={careerData}
                targetRole={targetRole ?? ""}
                sections={sections}
                templateId={templateId}
                fileName={title || "CraftCV-Resume"}
            />
        </div>
    );
};