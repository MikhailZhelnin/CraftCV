import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Controller, FormProvider, useForm, useWatch, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText, LayoutTemplate } from "lucide-react";
import { Printer } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import { useUnsavedChangesGuard } from "@/shared/hooks/useUnsavedChangesGuard";
import { UnsavedChangesDialog } from "@/shared/components/UnsavedChangesDialog";
import { EditorWorkspace } from "@/shared/components/EditorWorkspace";

import { CareerDataSections, CareerSectionNavigator, findFirstInvalidCareerSection, type CareerSectionId } from "@/modules/career-data";
import { useResumesStore, resumeDraftSchema, createDefaultResumeSections, ResumeSectionActions, ResumeTemplateSelector, DEFAULT_RESUME_TEMPLATE, type Resume, type ResumeDraft, type ResumePreviewHandle } from "@/modules/resumes";

import { ResumeLivePreview } from "./ui/ResumeLivePreview";

import { cn } from "cn";

export function ResumeEditorPage() {
    const { id } = useParams<{ id: string }>();

    const resume = useResumesStore((state) => state.resumes.find((item) => item.id === id));

    if (!resume) {
        return (
            <div className="t-container py-6">
                <h1 className="text-2xl font-semibold">Resume not found</h1>
                <p className="text-muted-foreground">This resume does not exist or was deleted.</p>
            </div>
        );
    };

    return (
        <ResumeEditorForm key={resume.id} resume={resume} />
    );
};

interface ResumeEditorFormProps {
    resume: Resume;
};

type ResumeEditorPanel = | CareerSectionId | "details" | "design";

function ResumeEditorForm({ resume }: ResumeEditorFormProps) {
    const navigate = useNavigate();

    const printRef = useRef<ResumePreviewHandle>(null);

    const updateResume = useResumesStore((state) => state.updateResume);

    const [saveError, setSaveError] = useState<string | null>(null);
    const [activePanel, setActivePanel] = useState<ResumeEditorPanel>("personal");

    const methods = useForm<ResumeDraft>({
        resolver: zodResolver(resumeDraftSchema),
        shouldFocusError: false,
        shouldUnregister: false,

        defaultValues: {
            title: resume.title,
            targetRole: resume.targetRole,
            careerData: structuredClone(resume.careerData),
            sections: structuredClone(resume.sections ?? createDefaultResumeSections()),
            templateId: resume.templateId ?? DEFAULT_RESUME_TEMPLATE,
        },
    });

    const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting } } = methods;

    const navigationGuard = useUnsavedChangesGuard(isDirty);

    const sections = useWatch({ control, name: "sections" }) ?? [];

    const sectionOrder = sections.map((section) => section.id);

    const activeCareerSection = sectionOrder.find((id) => id === activePanel) ?? null;

    const hiddenIds = sections.filter((section) => !section.visible).map((section) => section.id);

    const moveSection = (id: CareerSectionId, direction: -1 | 1) => {
        const current = methods.getValues("sections");

        const index = current.findIndex((section) => section.id === id);

        if (index === -1) return;

        const nextIndex = index + direction;

        if (nextIndex < 0 || nextIndex >= current.length) return;

        const updated = [...current];

        [updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]];

        methods.setValue("sections", updated, { shouldDirty: true, shouldValidate: true });
    };

    const toggleSectionVisibility = (id: CareerSectionId, visible: boolean) => {
        const current = methods.getValues("sections");

        const updated = current.map((section) => section.id === id ? { ...section, visible } : section);

        methods.setValue("sections", updated, { shouldDirty: true, shouldValidate: true });
    };

    const renderSectionActions = (id: CareerSectionId) => {
        const index = sections.findIndex((section) => section.id === id);

        if (index === -1) return null;

        const section = sections[index];

        return (
            <ResumeSectionActions
                section={section}
                index={index}
                total={sections.length}
                onMoveUp={() => moveSection(id, -1)}
                onMoveDown={() => moveSection(id, 1)}
                onVisibilityChange={(visible) => toggleSectionVisibility(id, visible)}
            />
        );
    };

    const onSubmit = (data: ResumeDraft) => {
        setSaveError(null);

        try {
            updateResume(resume.id, data);
            methods.reset(data);
            navigationGuard.allowNextNavigation();

            navigate("/");
        } catch (error) {
            console.error("Failed to save resume:", error);

            navigationGuard.resumeBlocking();

            setSaveError("Could not save your resume. " + "Please try again.");
        };
    };


    const onInvalid: SubmitErrorHandler<ResumeDraft> = (formErrors) => {
        if (formErrors.title || formErrors.targetRole) {
            setActivePanel("details");
            return;
        };

        const firstInvalidSection = findFirstInvalidCareerSection(formErrors, sectionOrder);

        if (firstInvalidSection) {
            setActivePanel(firstInvalidSection);
        };
    };

    return (
        <FormProvider {...methods}>
            <UnsavedChangesDialog
                open={navigationGuard.isBlocked}
                onStay={navigationGuard.stay}
                onLeave={navigationGuard.leave}
            />

            <div className="h-full min-h-0">
                <form noValidate onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex h-full min-h-0 flex-col">
                    <header className="shrink-0 border-b border-border">
                        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                            <div className="flex items-center gap-9.5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate("/")}
                                >
                                    <ArrowLeft className="size-4" />
                                    Back to resumes
                                </Button>

                                <div>
                                    <h1 className="text-2xl font-semibold tracking-tight">Edit Resume</h1>
                                    <p className="text-xs text-muted-foreground">{resume.title}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => printRef.current?.print()}
                                >
                                    <Printer className="size-4" />
                                    Print / Save PDF
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="min-w-36"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </header>

                    {saveError && (
                        <div role="alert" className="shrink-0 border-b border-destructive/20 px-6 py-3 text-sm text-destructive">{saveError}</div>
                    )}

                    <div className="min-h-0 flex-1 xl:overflow-hidden">
                        <EditorWorkspace
                            navigation={
                                <div className="space-y-4">
                                    <div className="border-b border-border pb-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            aria-current={activePanel === "details" ? "step" : undefined}
                                            onClick={() => setActivePanel("details")}
                                            className={cn(
                                                "h-10 w-full justify-start gap-3", "rounded-sm border px-3", "text-left text-xs",
                                                activePanel === "details" ? "border-border bg-muted" : "border-transparent"
                                            )}
                                        >
                                            <FileText className="size-4" />
                                            Resume Details

                                            {(errors.title || errors.targetRole) && (
                                                <span aria-label="Contains errors" className="ml-auto size-2 rounded-full bg-destructive" />
                                            )}
                                        </Button>
                                    </div>

                                    <CareerSectionNavigator
                                        order={sectionOrder}
                                        activeId={activeCareerSection}
                                        onSelect={setActivePanel}
                                        errors={errors}
                                    />

                                    <div className="border-t border-border pt-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            aria-current={activePanel === "design" ? "step" : undefined}
                                            onClick={() => setActivePanel("design")}
                                            className={cn(
                                                "h-10 w-full justify-start gap-3 rounded-sm border px-3 text-left text-xs",
                                                activePanel === "design" ? "border-border bg-muted" : "border-transparent"
                                            )}
                                        >
                                            <LayoutTemplate className="size-4" />
                                            Design & Template
                                        </Button>
                                    </div>
                                </div>
                            }
                            rightPanel={<ResumeLivePreview printRef={printRef} />}
                            contentKey={activePanel}
                        >
                            {activePanel === "details" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resume Details</CardTitle>
                                        <CardDescription>
                                            Set the name and target position
                                            of this resume.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <Field data-invalid={!!errors.title}>
                                            <FieldLabel htmlFor="resume-title">Resume Title</FieldLabel>

                                            <Input id="resume-title" {...register("title")} aria-invalid={!!errors.title} />

                                            {errors.title?.message && (
                                                <FieldError>{errors.title.message}</FieldError>
                                            )}
                                        </Field>

                                        <Field data-invalid={!!errors.targetRole}>
                                            <FieldLabel htmlFor="resume-role">Target Role</FieldLabel>

                                            <Input id="resume-role" {...register("targetRole")} aria-invalid={!!errors.targetRole} />

                                            {errors.targetRole?.message && (
                                                <FieldError>{errors.targetRole.message}</FieldError>
                                            )}
                                        </Field>
                                    </CardContent>
                                </Card>
                            )}

                            {activePanel === "design" && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Design & Template</CardTitle>

                                        <CardDescription>
                                            Choose the visual style of your CV.
                                            You can change it without losing data.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <Controller
                                            control={control}
                                            name="templateId"
                                            render={({ field }) => (
                                                <ResumeTemplateSelector value={field.value} onChange={field.onChange} />
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            <CareerDataSections
                                order={sectionOrder}
                                hiddenIds={hiddenIds}
                                activeSectionId={activeCareerSection}
                                renderSectionActions={renderSectionActions}
                            />
                        </EditorWorkspace>
                    </div>
                </form>
            </div >
        </FormProvider >
    );
};