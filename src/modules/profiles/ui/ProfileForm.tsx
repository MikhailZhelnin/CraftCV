import { useState } from "react";
import { FormProvider, useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText } from "lucide-react";
import { cn } from "cn";

import { CAREER_SECTION_IDS, CareerDataSections, CareerSectionNavigator, createEmptyCareerData, findFirstInvalidCareerSection, type CareerSectionId } from "@/modules/career-data";

import { EditorWorkspace } from "@/shared/components/EditorWorkspace";
import { UnsavedChangesDialog } from "@/shared/components/UnsavedChangesDialog";
import { useUnsavedChangesGuard } from "@/shared/hooks/useUnsavedChangesGuard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import type { ProfileDraft } from "../model/profile.types";
import { profileFormSchema } from "../model/profile.schema";

import { ProfileOverview } from "./ProfileOverview";

interface ProfileFormProps {
    initialValues?: ProfileDraft;
    onSubmit: (data: ProfileDraft) => void;
    onCancel: () => void;
};

type ProfileEditorPanel = "details" | CareerSectionId;

export function ProfileForm({ initialValues, onSubmit, onCancel }: ProfileFormProps) {
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

    const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = methods;

    const navigationGuard = useUnsavedChangesGuard(isDirty);

    const activeCareerSection = CAREER_SECTION_IDS.find((id) => id === activePanel) ?? null;

    const onValid = (data: ProfileDraft) => {
        setSaveError(null);

        try {
            onSubmit(data);

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
                        <div className="flex flex-wrap items-center gap-6">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onCancel}
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
                    <div role="alert" className="shrink-0 border-b border-destructive/20 px-6 py-3 text-sm text-destructive">{saveError}</div>
                )}

                <div className="min-h-0 flex-1 xl:overflow-hidden">
                    <EditorWorkspace
                        contentKey={activePanel}
                        navigation={
                            <div className="space-y-4">
                                <div className="border-b border-border pb-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        aria-current={activePanel === "details" ? "step" : undefined}
                                        onClick={() => setActivePanel("details")}
                                        className={cn(
                                            "h-10 w-full justify-start gap-3 rounded-sm border px-3 text-left text-xs",
                                            activePanel === "details" ? "border-border bg-muted" : "border-transparent"
                                        )}
                                    >
                                        <FileText className="size-4" />
                                        Profile Details

                                        {(errors.name || errors.description) && (
                                            <span aria-label="Contains errors" className="ml-auto size-2 rounded-full bg-destructive" />
                                        )}
                                    </Button>
                                </div>

                                <CareerSectionNavigator
                                    order={CAREER_SECTION_IDS}
                                    activeId={activeCareerSection}
                                    onSelect={setActivePanel}
                                    errors={errors}
                                />
                            </div>
                        }
                        rightPanel={<ProfileOverview />}
                    >
                        {activePanel === "details" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Details</CardTitle>
                                    <CardDescription>Name and describe this reusable profile.</CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <Field data-invalid={!!errors.name}>
                                        <FieldLabel htmlFor="profile-name">Profile Name</FieldLabel>

                                        <Input
                                            id="profile-name"
                                            {...register("name")}
                                            aria-invalid={!!errors.name}
                                            placeholder="Frontend Developer"
                                        />

                                        {errors.name?.message && (
                                            <FieldError>{errors.name.message}</FieldError>
                                        )}
                                    </Field>

                                    <Field data-invalid={!!errors.description}>
                                        <FieldLabel htmlFor="profile-description">Description</FieldLabel>

                                        <Textarea
                                            id="profile-description"
                                            {...register("description")}
                                            aria-invalid={!!errors.description}
                                            placeholder="Describe this profile..."
                                        />

                                        {errors.description?.message && (
                                            <FieldError>{errors.description.message}</FieldError>
                                        )}
                                    </Field>
                                </CardContent>
                            </Card>
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