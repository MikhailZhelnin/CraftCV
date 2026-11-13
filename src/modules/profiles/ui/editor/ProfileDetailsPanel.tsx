import { useFormContext } from "react-hook-form";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";

import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import type { ProfileDraft } from "../../model/profile.types";

export function ProfileDetailsPanel() {
    const { register, formState: { errors } } = useFormContext<ProfileDraft>();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Give your reusable professional profile a name.</CardDescription>
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
    );
};