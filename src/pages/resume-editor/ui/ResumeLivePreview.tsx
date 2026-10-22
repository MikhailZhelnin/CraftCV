import { useFormContext, useWatch } from "react-hook-form";
import { Eye } from "lucide-react";

import { Badge } from "@/shared/ui/badge";

import { ResumePreview, type ResumeDraft, DEFAULT_RESUME_TEMPLATE } from "@/modules/resumes";

export function ResumeLivePreview() {
    const { control } = useFormContext<ResumeDraft>();

    const careerData = useWatch({ control, name: "careerData" });
    const targetRole = useWatch({ control, name: "targetRole" });
    const sections = useWatch({ control, name: "sections" });
    const templateId = useWatch({ control, name: "templateId" }) ?? DEFAULT_RESUME_TEMPLATE;
    const title = useWatch({ control, name: "title" });

    if (!careerData || !sections) {
        return null;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Eye className="size-5" />

                    <h2 className="text-lg font-semibold"> Live Preview</h2>
                </div>

                <Badge variant="secondary">A4</Badge>
            </div>

            <p className="text-sm text-muted-foreground">
                Preview updates while you edit.
                Changes are saved only when you click
                Save Changes.
            </p>

            <ResumePreview
                data={careerData}
                targetRole={targetRole ?? ""}
                sections={sections}
                templateId={templateId}
                fileName={title || "CraftCV-Resume"}
            />
        </div>
    );
};