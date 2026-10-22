import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import type { Education } from "../model/career.types";

interface EducationFieldsProps {
    value: Education;
    errors?: Partial<Record<keyof Education, string>>;
    onChange: (value: Education) => void;
};

export function EducationFields({ value, errors, onChange, }: EducationFieldsProps) {
    const update = (changes: Partial<Education>) => {
        onChange({ ...value, ...changes });
    };

    return (
        <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field data-invalid={!!errors?.institution}>
                    <FieldLabel htmlFor={`institution-${value.id}`}>Institution</FieldLabel>

                    <Input
                        id={`institution-${value.id}`}
                        value={value.institution}
                        onChange={(e) => update({ institution: e.target.value })}
                        placeholder="University or college"
                        aria-invalid={!!errors?.institution}
                    />

                    {errors?.institution && (
                        <FieldError>{errors.institution}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.degree}>
                    <FieldLabel htmlFor={`degree-${value.id}`}>Degree</FieldLabel>

                    <Input
                        id={`degree-${value.id}`}
                        value={value.degree}
                        onChange={(e) => update({ degree: e.target.value })}
                        placeholder="Bachelor's, Master's..."
                        aria-invalid={!!errors?.degree}
                    />

                    {errors?.degree && (
                        <FieldError>{errors.degree}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.fieldOfStudy}>
                    <FieldLabel htmlFor={`field-${value.id}`}>Field of Study</FieldLabel>

                    <Input
                        id={`field-${value.id}`}
                        value={value.fieldOfStudy}
                        onChange={(e) => update({ fieldOfStudy: e.target.value })}
                        placeholder="Computer Science"
                        aria-invalid={!!errors?.fieldOfStudy}
                    />

                    {errors?.fieldOfStudy && (
                        <FieldError>{errors.fieldOfStudy}</FieldError>
                    )}
                </Field>

                <div />

                <Field data-invalid={!!errors?.startDate}>
                    <FieldLabel htmlFor={`start-${value.id}`}>Start Date</FieldLabel>

                    <Input
                        id={`start-${value.id}`}
                        type="month"
                        value={value.startDate}
                        onChange={(e) => update({ startDate: e.target.value })}
                        aria-invalid={!!errors?.startDate}
                    />

                    {errors?.startDate && (
                        <FieldError>{errors.startDate}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.endDate}>
                    <FieldLabel htmlFor={`end-${value.id}`}>End Date</FieldLabel>

                    <Input
                        id={`end-${value.id}`}
                        type="month"
                        value={value.endDate}
                        disabled={value.isCurrent}
                        onChange={(e) => update({ endDate: e.target.value })}
                        aria-invalid={!!errors?.endDate}
                    />

                    {errors?.endDate && (
                        <FieldError>{errors.endDate}</FieldError>
                    )}
                </Field>
            </div>

            <div className="flex items-center gap-3">
                <Switch
                    id={`current-${value.id}`}
                    checked={value.isCurrent}
                    onCheckedChange={(checked) => update({ isCurrent: checked, endDate: checked ? "" : value.endDate })}
                />

                <FieldLabel htmlFor={`current-${value.id}`}>I'm currently studying here</FieldLabel>
            </div>

            <Field data-invalid={!!errors?.description}>
                <FieldLabel htmlFor={`description-${value.id}`}>Description</FieldLabel>

                <Textarea
                    id={`description-${value.id}`}
                    value={value.description}
                    onChange={(e) => update({ description: e.target.value })}
                    placeholder="Describe your studies and achievements..."
                    rows={5}
                    aria-invalid={!!errors?.description}
                />

                {errors?.description && (
                    <FieldError>{errors.description}</FieldError>
                )}
            </Field>
        </div>
    );
};