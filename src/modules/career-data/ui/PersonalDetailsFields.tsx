import { Field, FieldError, FieldLabel } from "@/shared/ui/field";

import { Input } from "@/shared/ui/input";

import type { PersonalDetails } from "../model/career.types";

interface PersonalDetailsFieldsProps {
    value: PersonalDetails;
    errors?: Partial<Record<keyof PersonalDetails, string>>;
    onChange: (value: PersonalDetails) => void;
};

const fields = [
    { key: "fullName", label: "Full Name", type: "text" },
    { key: "jobTitle", label: "Job Title", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "location", label: "Location", type: "text" },
] as const;

export function PersonalDetailsFields({ value, errors, onChange }: PersonalDetailsFieldsProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ key, label, type }) => {
                const error = errors?.[key];

                return (
                    <Field key={key} data-invalid={!!error}>
                        <FieldLabel htmlFor={`personal-${key}`}>{label}</FieldLabel>

                        <Input
                            id={`personal-${key}`}
                            type={type}
                            value={value[key]}
                            aria-invalid={!!error}
                            onChange={(event) =>
                                onChange({
                                    ...value,
                                    [key]: event.target.value,
                                })
                            }
                        />

                        {error && <FieldError>{error}</FieldError>}
                    </Field>
                );
            })}
        </div>
    );
};