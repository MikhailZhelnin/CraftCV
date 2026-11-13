import { useRef, useState } from "react";
import { FormProvider, useForm, useWatch, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Printer } from "lucide-react";

import { CareerDataSections, findFirstInvalidCareerSection, type CareerSectionId } from "@/modules/career-data";

import { Button } from "@/shared/ui/button";
import { EditorWorkspace } from "@/shared/components/EditorWorkspace";
import { UnsavedChangesDialog } from "@/shared/components/UnsavedChangesDialog";
import { useUnsavedChangesGuard } from "@/shared/hooks/useUnsavedChangesGuard";

import type { ResumeDraft } from "../../model/resume.types";
import { resumeDraftSchema } from "../../model/resume.schema";

import type { ResumePreviewHandle } from "./../preview/ResumePreview";
import { ResumeEditorNavigation, type ResumeEditorPanel } from "./ResumeEditorNavigation";
import { ResumeSectionActions } from "./ResumeSectionActions";
import { ResumeDetailsPanel } from "./ResumeDetailsPanel";
import { ResumeDesignPanel } from "./ResumeDesignPanel";
import { ResumeLivePreview } from "./ResumeLivePreview";

interface ResumeEditorFormProps {
    initialValues: ResumeDraft;
    onSave: (data: ResumeDraft) => void;
    onCancel: () => void;
};

export function ResumeEditorForm({ initialValues, onSave, onCancel }: ResumeEditorFormProps) {
    const printRef = useRef<ResumePreviewHandle>(null);

    const [activePanel, setActivePanel] = useState<ResumeEditorPanel>("personal");
    const [saveError, setSaveError] = useState<string | null>(null);

    const methods = useForm<ResumeDraft>({
        resolver: zodResolver(resumeDraftSchema),
        shouldFocusError: false,
        shouldUnregister: false,
        defaultValues: structuredClone(initialValues),
    });

    const { control, handleSubmit, formState: { errors, isDirty, isSubmitting } } = methods;

    const navigationGuard = useUnsavedChangesGuard(isDirty);

    const sections = useWatch({ control, name: "sections" }) ?? [];

    const sectionOrder = sections.map((section) => section.id);
    const hiddenIds = sections.filter((section) => !section.visible).map((section) => section.id);

    const activeCareerSection = sectionOrder.find((id) => id === activePanel) ?? null;

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

        return (
            <ResumeSectionActions
                section={sections[index]}
                index={index}
                total={sections.length}
                onMoveUp={() => moveSection(id, -1)}
                onMoveDown={() => moveSection(id, 1)}
                onVisibilityChange={(visible) => toggleSectionVisibility(id, visible)}
            />
        );
    };

    const onValid = (data: ResumeDraft) => {
        setSaveError(null);

        try {
            onSave(data);

            methods.reset(data);
            navigationGuard.allowNextNavigation();

            onCancel();
        } catch (error) {
            console.error("Failed to save resume:", error);

            navigationGuard.resumeBlocking();

            setSaveError("Could not save your resume. Please try again.");
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

            <form className="flex h-full min-h-0 flex-col" noValidate onSubmit={handleSubmit(onValid, onInvalid)}>
                <header className="shrink-0 border-b border-border">
                    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                        <div className="flex items-center">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onCancel}
                                className="mr-10.5"
                            >
                                <ArrowLeft className="size-4" />
                                Back to resumes
                            </Button>

                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight">Edit Resume</h1>
                                <p className="text-xs text-muted-foreground">{initialValues.title}</p>
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
                        contentKey={activePanel}
                        navigation={
                            <ResumeEditorNavigation
                                activePanel={activePanel}
                                sectionOrder={sectionOrder}
                                errors={errors}
                                onSelect={setActivePanel}
                            />
                        }
                        rightPanel={<ResumeLivePreview printRef={printRef} />}
                    >
                        {activePanel === "details" && (
                            <ResumeDetailsPanel />
                        )}

                        {activePanel === "design" && (
                            <ResumeDesignPanel />
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
        </FormProvider>
    );
};