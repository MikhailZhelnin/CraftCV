import type { ResumeTemplateId } from "../../model/resume.templates";
import { ResumeTemplateSelector } from "../templates/ResumeTemplateSelector";

interface ResumeTemplateStepProps {
    templateId: ResumeTemplateId;
    onTemplateChange: (value: ResumeTemplateId) => void;
};

export function ResumeTemplateStep({ templateId, onTemplateChange }: ResumeTemplateStepProps) {
    return (
        <div className="space-y-4">
            <ResumeTemplateSelector value={templateId} onChange={onTemplateChange} />

            <p className="text-xs leading-relaxed text-muted-foreground">
                You can change the template later without
                losing your resume content.
            </p>
        </div>
    );
};