import { FormProvider, useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import { createEmptyCareerData, CareerDataSections, CareerSectionNavigator, CAREER_SECTION_IDS, findFirstInvalidCareerSection, scrollToCareerSection } from "@/modules/career-data";

import type { ProfileDraft } from "../model/profile.types";
import { profileFormSchema } from "../model/profile.schema";

interface ProfileFormProps {
    initialValues?: ProfileDraft;
    onSubmit: (data: ProfileDraft) => void;
    onCancel: () => void;
};

export function ProfileForm({ initialValues, onSubmit, onCancel }: ProfileFormProps) {
    const methods = useForm<ProfileDraft>({
        resolver: zodResolver(profileFormSchema),
        shouldFocusError: false,

        defaultValues: initialValues ?? {
            name: "",
            description: "",
            careerData: createEmptyCareerData(),
        },
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = methods;


    const onInvalid: SubmitErrorHandler<ProfileDraft> = (formErrors) => {
        if (formErrors.name) {
            methods.setFocus("name");
            return;
        };

        if (formErrors.description) {
            methods.setFocus("description");
            return;
        };

        const firstInvalidSection = findFirstInvalidCareerSection(formErrors, CAREER_SECTION_IDS);

        if (firstInvalidSection) {
            scrollToCareerSection(firstInvalidSection);
        };
    };

    return (
        <FormProvider {...methods}>
            <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Give your professional profile a name.</CardDescription>
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

                <CareerSectionNavigator order={CAREER_SECTION_IDS} errors={errors} />

                <CareerDataSections />

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button type="submit" disabled={isSubmitting}>
                        {initialValues ? "Save Changes" : "Create Profile"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};