import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import { LANGUAGE_LEVELS, type LanguageLevel, type SpokenLanguage } from "../model/career.types";

interface LanguageFieldsProps {
    value: SpokenLanguage;
    errors?: Partial<Record<keyof SpokenLanguage, string>>;
    onChange: (value: SpokenLanguage) => void;
};

const languageLevelOptions = LANGUAGE_LEVELS.map((level) => ({
    value: level,
    label: level === "Native" ? "Native speaker" : level,
}));

function isLanguageLevel(value: string): value is Exclude<LanguageLevel, ""> {
    return (LANGUAGE_LEVELS as readonly string[]).includes(value);
};

export function LanguageFields({ value, errors, onChange }: LanguageFieldsProps) {
    const update = (changes: Partial<SpokenLanguage>) => {
        onChange({ ...value, ...changes });
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!errors?.name}>
                <FieldLabel htmlFor={`language-${value.id}`}>Language</FieldLabel>

                <Input
                    id={`language-${value.id}`}
                    value={value.name}
                    onChange={(e) => update({ name: e.target.value })}
                    placeholder="English, Polish, Ukrainian..."
                    aria-invalid={!!errors?.name}
                />

                {errors?.name && (
                    <FieldError>{errors.name}</FieldError>
                )}
            </Field>

            <Field data-invalid={!!errors?.level}>
                <FieldLabel htmlFor={`level-${value.id}`}>Proficiency Level</FieldLabel>

                <Select
                    items={languageLevelOptions}
                    value={value.level}
                    onValueChange={(level) => {
                        if (typeof level === "string" && isLanguageLevel(level)) {
                            update({ level });
                        };
                    }}
                >
                    <SelectTrigger
                        id={`level-${value.id}`}
                        className="w-full"
                        aria-invalid={!!errors?.level}
                    >
                        <SelectValue placeholder="Select level" />
                    </SelectTrigger>

                    <SelectContent>
                        {languageLevelOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors?.level && (
                    <FieldError>{errors.level}</FieldError>
                )}
            </Field>
        </div>
    );
};