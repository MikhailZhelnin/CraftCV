import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import type { Experience } from "../model/career.types";

interface ExperienceFieldsProps {
    value: Experience;
    errors?: Partial<Record<keyof Experience, string>>;
    onChange: (value: Experience) => void;
};

export function ExperienceFields({ value, errors, onChange }: ExperienceFieldsProps) {
    const update = (changes: Partial<Experience>) => {
        onChange({ ...value, ...changes });
    };

    return (
        <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field data-invalid={!!errors?.position}>
                    <FieldLabel htmlFor={`position-${value.id}`}>Job Title</FieldLabel>

                    <Input
                        id={`position-${value.id}`}
                        value={value.position}
                        onChange={(e) => update({ position: e.target.value })}
                        placeholder="Frontend Developer"
                        aria-invalid={!!errors?.position}
                    />

                    {errors?.position && (
                        <FieldError>{errors.position}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.company}>
                    <FieldLabel htmlFor={`company-${value.id}`}>Company</FieldLabel>

                    <Input
                        id={`company-${value.id}`}
                        value={value.company}
                        onChange={(e) => update({ company: e.target.value })}
                        placeholder="Company name"
                        aria-invalid={!!errors?.company}
                    />

                    {errors?.company && (
                        <FieldError>{errors.company}</FieldError>
                    )}
                </Field>

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

                <FieldLabel htmlFor={`current-${value.id}`}>I currently work here</FieldLabel>
            </div>

            <Field data-invalid={!!errors?.description}>
                <FieldLabel htmlFor={`description-${value.id}`}>Description</FieldLabel>

                <Textarea
                    id={`description-${value.id}`}
                    value={value.description}
                    onChange={(e) => update({ description: e.target.value })}
                    placeholder="Describe your responsibilities and achievements..."
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