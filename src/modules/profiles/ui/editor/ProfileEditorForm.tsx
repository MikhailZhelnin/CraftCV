import { useState } from "react";
import { FormProvider, useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { CAREER_SECTION_IDS, CareerDataSections, createEmptyCareerData, findFirstInvalidCareerSection, type CareerSectionId } from "@/modules/career-data";

import { Button } from "@/shared/ui/button";
import { EditorWorkspace } from "@/shared/components/EditorWorkspace";
import { UnsavedChangesDialog } from "@/shared/components/UnsavedChangesDialog";
import { useUnsavedChangesGuard } from "@/shared/hooks/useUnsavedChangesGuard";

import type { ProfileDraft } from "../../model/profile.types";
import { profileFormSchema } from "../../model/profile.schema";

import { ProfileEditorNavigation, type ProfileEditorPanel } from "../editor/ProfileEditorNavigation";
import { ProfileDetailsPanel } from "../editor/ProfileDetailsPanel";
import { ProfileOverview } from "../editor/ProfileOverview";

interface ProfileEditorFormProps {
    initialValues?: ProfileDraft;
    onSave: (data: ProfileDraft) => void;
    onCancel: () => void;
};

export function ProfileEditorForm({ initialValues, onSave, onCancel }: ProfileEditorFormProps) {
    const isEditing = initialValues !== undefined;

    const [activePanel, setActivePanel] = useState<ProfileEditorPanel>("details");
    const [saveError, setSaveError] = useState<string | null>(null);

    const methods = useForm<ProfileDraft>({
        resolver: zodResolver(profileFormSchema),
        shouldFocusError: false,
        shouldUnregister: false,

        defaultValues: initialValues
            ? structuredClone(initialValues)
            : {
                name: "",
                description: "",
                careerData: createEmptyCareerData(),
            },
    });

    const { handleSubmit, formState: { errors, isDirty, isSubmitting } } = methods;

    const navigationGuard = useUnsavedChangesGuard(isDirty);

    const activeCareerSection: CareerSectionId | null = CAREER_SECTION_IDS.find((id) => id === activePanel) ?? null;

    const onValid = (data: ProfileDraft) => {
        setSaveError(null);

        try {
            onSave(data);

            methods.reset(data);
            navigationGuard.allowNextNavigation();

            onCancel();
        } catch (error) {
            console.error("Failed to save profile:", error);

            navigationGuard.resumeBlocking();

            setSaveError("Could not save your profile. Please try again.");
        };
    };

    const onInvalid: SubmitErrorHandler<ProfileDraft> = (formErrors) => {
        if (formErrors.name || formErrors.description) {
            setActivePanel("details");
            return;
        };

        const firstInvalidSection = findFirstInvalidCareerSection(formErrors, CAREER_SECTION_IDS);

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
                                className="mr-12"
                            >
                                <ArrowLeft className="size-4" />
                                Back to profiles
                            </Button>

                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight">{isEditing ? "Edit Profile" : "Create Profile"}</h1>
                                <p className="text-xs text-muted-foreground">{isEditing ? initialValues.name : "Create a reusable professional profile"}</p>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-36"
                        >
                            {isEditing ? "Save Changes" : "Create Profile"}
                        </Button>
                    </div>
                </header>

                {saveError && (
                    <div role="alert" className="shrink-0 border-b border-destructive/20 px-6 py-3 text-sm text-destructive" >{saveError}</div>
                )}

                <div className="min-h-0 flex-1 xl:overflow-hidden">
                    <EditorWorkspace
                        contentKey={activePanel}
                        navigation={
                            <ProfileEditorNavigation
                                activePanel={activePanel}
                                errors={errors}
                                onSelect={setActivePanel}
                            />
                        }
                        rightPanel={<ProfileOverview />}
                    >
                        {activePanel === "details" && (
                            <ProfileDetailsPanel />
                        )}

                        <CareerDataSections
                            order={CAREER_SECTION_IDS}
                            activeSectionId={activeCareerSection}
                        />
                    </EditorWorkspace>
                </div>
            </form>
        </FormProvider>
    );
};