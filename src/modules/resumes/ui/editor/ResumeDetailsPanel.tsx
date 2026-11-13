import { useFormContext } from "react-hook-form";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import type { ResumeDraft } from "../../model/resume.types";

export function ResumeDetailsPanel() {
    const { register, formState: { errors } } = useFormContext<ResumeDraft>();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resume Details</CardTitle>
                <CardDescription>Set the name and target position of this resume.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <Field data-invalid={!!errors.title}>
                    <FieldLabel htmlFor="resume-title">Resume Title</FieldLabel>

                    <Input id="resume-title"{...register("title")} aria-invalid={!!errors.title} />

                    {errors.title?.message && (
                        <FieldError>{errors.title.message}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors.targetRole}>
                    <FieldLabel htmlFor="resume-role">Target Role</FieldLabel>

                    <Input id="resume-role"{...register("targetRole")} aria-invalid={!!errors.targetRole} />

                    {errors.targetRole?.message && (
                        <FieldError>{errors.targetRole.message}</FieldError>
                    )}
                </Field>
            </CardContent>
        </Card>
    );
};