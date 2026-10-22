import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Controller, FormProvider, useForm, useWatch, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import { useUnsavedChangesGuard } from "@/shared/hooks/useUnsavedChangesGuard";
import { UnsavedChangesDialog } from "@/shared/components/UnsavedChangesDialog";

import { CareerDataSections, CareerSectionNavigator, findFirstInvalidCareerSection, scrollToCareerSection, type CareerSectionId } from "@/modules/career-data";
import { useResumesStore, resumeDraftSchema, createDefaultResumeSections, ResumeSectionActions, ResumeTemplateSelector, DEFAULT_RESUME_TEMPLATE, type Resume, type ResumeDraft } from "@/modules/resumes";

import { ResumeLivePreview } from "./ui/ResumeLivePreview";

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

function ResumeEditorForm({ resume }: ResumeEditorFormProps) {
    const navigate = useNavigate();

    const updateResume = useResumesStore((state) => state.updateResume);

    const [saveError, setSaveError] = useState<string | null>(null);

    const methods = useForm<ResumeDraft>({
        resolver: zodResolver(resumeDraftSchema),
        shouldFocusError: false,

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
        if (formErrors.title) {
            methods.setFocus("title");
            return;
        };

        if (formErrors.targetRole) {
            methods.setFocus("targetRole");
            return;
        };

        const firstInvalidSection = findFirstInvalidCareerSection(formErrors, sectionOrder);

        if (!firstInvalidSection) return;

        scrollToCareerSection(firstInvalidSection);
    };

    return (
        <FormProvider {...methods}>
            <UnsavedChangesDialog
                open={navigationGuard.isBlocked}
                onStay={navigationGuard.stay}
                onLeave={navigationGuard.leave}
            />

            <div className="h-full min-h-0">
                <div className="h-full min-h-0">
                    <form className="flex h-full min-h-0 flex-col" noValidate onSubmit={handleSubmit(onSubmit, onInvalid)}>
                        <div className="py-4 border-b">
                            <div className="t-container">
                                <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold">Edit Resume</h1>
                                        <p className="text-muted-foreground">{resume.title}</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="button" variant="outline" onClick={() => navigate("/")}>
                                            Cancel
                                        </Button>

                                        <Button type="submit" disabled={isSubmitting}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {saveError && (
                            <p role="alert" className="shrink-0 text-sm text-destructive">{saveError}</p>
                        )}

                        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto xl:grid-cols-2 xl:overflow-hidden t-container">
                            <section aria-label="Resume editor fields" className="min-w-0 space-y-6 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:pr-3 py-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resume Information</CardTitle>
                                        <CardDescription>Set the name and target position of this resume.</CardDescription>
                                    </CardHeader>

                                    <CardContent className=" grid gap-4 sm:grid-cols-2">
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

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resume Template</CardTitle>
                                        <CardDescription>
                                            Choose the visual style
                                            of your resume. You can
                                            change it without losing
                                            your data.
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

                                <CareerSectionNavigator order={sectionOrder} errors={errors} />

                                <CareerDataSections
                                    order={sectionOrder}
                                    hiddenIds={hiddenIds}
                                    renderSectionActions={renderSectionActions}
                                />
                            </section>

                            <aside aria-label="Resume preview" className="min-w-0 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:border-l xl:pl-4 py-4">
                                <ResumeLivePreview />
                            </aside>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};