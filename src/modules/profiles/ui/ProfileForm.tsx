import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import { createEmptyCareerData, CareerDataSections } from "@/modules/career-data";

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

        defaultValues: initialValues ?? {
            name: "",
            description: "",
            careerData: createEmptyCareerData(),
        },
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = methods;

    return (
        <FormProvider {...methods}>
            <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
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
}