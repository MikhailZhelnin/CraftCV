import { useNavigate, useParams } from "react-router";

import { ResumeEditorForm, useResumesStore, createDefaultResumeSections, DEFAULT_RESUME_TEMPLATE } from "@/modules/resumes";

export function ResumeEditorPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const resume = useResumesStore((state) => state.resumes.find((item) => item.id === id));
    const updateResume = useResumesStore((state) => state.updateResume);

    if (!resume) {
        return (
            <div className="t-container py-6">
                <h1 className="text-2xl font-semibold">Resume not found</h1>
                <p className="text-muted-foreground">This resume does not exist or was deleted.</p>
            </div>
        );
    };

    return (
        <ResumeEditorForm
            key={resume.id}
            initialValues={{
                title: resume.title,
                targetRole: resume.targetRole,
                careerData: resume.careerData,
                sections: resume.sections ?? createDefaultResumeSections(),
                templateId: resume.templateId ?? DEFAULT_RESUME_TEMPLATE,
            }}
            onSave={(data) => updateResume(resume.id, data)}
            onCancel={() => navigate("/")}
        />
    );
};