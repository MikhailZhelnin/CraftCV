import { Field, FieldError, FieldLabel, FieldDescription } from "@/shared/ui/field";

import { Textarea } from "@/shared/ui/textarea";

interface SummaryFieldsProps {
    value: string;
    error?: string;
    onChange: (value: string) => void;
};

export function SummaryFields({ value, error, onChange }: SummaryFieldsProps) {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor="career-summary">Professional Summary</FieldLabel>

            <Textarea
                id="career-summary"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-invalid={!!error}
                placeholder="Describe your professional background..."
                rows={5}
            />

            <FieldDescription>A short overview of your experience and strengths.</FieldDescription>

            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
};