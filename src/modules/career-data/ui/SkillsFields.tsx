import { useId, useState } from "react";
import { X } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

interface SkillsFieldsProps {
    value: string[];
    error?: string;
    label?: string;
    placeholder?: string;
    maxItems?: number;
    onChange: (value: string[]) => void;
};

export function SkillsFields({ value, error, label = "Skills", placeholder = "React, TypeScript", maxItems = 30, onChange }: SkillsFieldsProps) {
    const inputId = useId();

    const [draft, setDraft] = useState("");
    const [inputError, setInputError] = useState("");

    const addSkill = () => {
        const skill = draft.trim().replace(/\s+/g, " ");

        if (!skill) return;

        const exists = value.some((item) => item.toLowerCase() === skill.toLowerCase());

        if (exists) {
            setInputError("This skill already exists");
            return;
        };

        if (skill.length > 40) {
            setInputError("Maximum 40 characters");
            return;
        };

        if (value.length >= maxItems) {
            setInputError(`Maximum ${maxItems} items`);
            return;
        };

        onChange([...value, skill]);

        setDraft("");
        setInputError("");
    };

    const removeSkill = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const displayedError = inputError || error;

    return (
        <div className="space-y-4">
            <Field data-invalid={!!displayedError}>
                <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

                <div className="flex gap-2">
                    <Input
                        id={inputId}
                        value={draft}
                        onChange={(e) => {
                            setDraft(e.target.value);
                            setInputError("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                            };
                        }}
                        placeholder={placeholder}
                        aria-invalid={!!displayedError}
                    />

                    <Button
                        type="button"
                        onClick={addSkill}
                        disabled={!draft.trim()}
                    >
                        Add
                    </Button>
                </div>

                {displayedError && (
                    <FieldError>{displayedError}</FieldError>
                )}
            </Field>

            <div className="flex flex-wrap gap-2">
                {value.map((skill, index) => (
                    <Badge
                        key={`${skill}-${index}`}
                        variant="secondary"
                        className="gap-2 py-1 pl-3 pr-1"
                    >
                        {skill}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-5 rounded-full"
                            onClick={() => removeSkill(index)}
                            aria-label={`Remove ${skill}`}
                        >
                            <X className="size-3" />
                        </Button>
                    </Badge>
                ))}
            </div>

            <p className="text-xs text-muted-foreground">Press Enter to add. {value.length}/{maxItems}</p>
        </div>
    );
};