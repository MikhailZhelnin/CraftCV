import { useNavigate, useParams } from "react-router";
import { Controller, FormProvider, useForm, useWatch, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import { useUnsavedChangesGuard } from "@/shared/hooks/useUnsavedChangesGuard";
import { UnsavedChangesDialog } from "@/shared/components/UnsavedChangesDialog";

import { CareerDataSections, CareerSectionNavigator, findFirstInvalidCareerSection, scrollToCareerSection } from "@/modules/career-data";
import { useResumesStore, resumeDraftSchema, createDefaultResumeSections, ResumeSectionSettings, type Resume, type ResumeDraft, ResumeTemplateSelector, DEFAULT_RESUME_TEMPLATE } from "@/modules/resumes";

import { ResumeLivePreview } from "./ui/ResumeLivePreview";

export function ResumeEditorPage() {
    const { id } = useParams<{ id: string }>();

    const resume = useResumesStore((state) => state.resumes.find((item) => item.id === id));

    if (!resume) {
        return (
            <div className="space-y-4">
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

    const onSubmit = (data: ResumeDraft) => {
        updateResume(resume.id, data);
        navigate("/");
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

            <div className="py-4">
                <div className="t-container">
                    <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit, onInvalid)}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
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

                        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                            <div className="min-w-0 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resume Information</CardTitle>
                                        <CardDescription>
                                            Set the name and target position
                                            of this resume.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="grid gap-4 sm:grid-cols-2">
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
                                                <FieldError> {errors.targetRole.message}</FieldError>
                                            )}
                                        </Field>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resume Template</CardTitle>
                                        <CardDescription>
                                            Choose the visual style of your resume.
                                            You can change it without losing your data.
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

                                <Controller
                                    control={control}
                                    name="sections"
                                    render={({ field }) => (
                                        <ResumeSectionSettings value={field.value} onChange={field.onChange} />
                                    )}
                                />

                                <CareerSectionNavigator order={sectionOrder} errors={errors} />

                                <CareerDataSections order={sectionOrder} hiddenIds={hiddenIds} />
                            </div>

                            <aside className="min-w-0 xl:sticky xl:top-6 xl:self-start">
                                <div className="xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto xl:pr-2">
                                    <ResumeLivePreview />
                                </div>
                            </aside>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
};