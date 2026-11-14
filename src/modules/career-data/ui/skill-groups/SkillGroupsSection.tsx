import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";

import type { CareerData } from "../../model/career.types";
import { createEmptySkillGroup } from "../../model/career.defaults";

import { SkillsFields } from "../SkillsFields";
import { RepeatableSection } from "../form-sections/RepeatableSection";

type FormValues = {
    careerData: CareerData;
};

interface SkillGroupsSectionProps {
    headerActions?: ReactNode;
};

export function SkillGroupsSection({ headerActions }: SkillGroupsSectionProps) {
    const { control, register, formState: { errors } } = useFormContext<FormValues>();

    const { fields, append, remove, move } = useFieldArray({ control, name: "careerData.skills" });

    const groups = useWatch({ control, name: "careerData.skills" }) ?? [];

    const totalSkills = groups.reduce((total, group) => total + group.skills.length, 0);

    return (
        <RepeatableSection
            title="Skills"
            description="Organize your skills into categories that fit your profession."
            addLabel="Add Category"
            emptyMessage="No skill categories yet. Add one to get started."
            count={fields.length}
            maxItems={8}
            headerActions={headerActions}
            onAdd={() => append(createEmptySkillGroup())}
        >
            {fields.map((item, index) => {
                const nameError = errors.careerData?.skills?.[index]?.name?.message;

                const currentGroup = groups[index];

                const groupSkillCount = currentGroup?.skills.length ?? 0;

                const maxItemsForGroup = Math.max(0, 30 - totalSkills + groupSkillCount);

                return (
                    <div key={item.id} className="space-y-4 border border-border bg-card p-4">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-xs font-semibold uppercase text-muted-foreground">
                                Category {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="flex items-center gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    disabled={index === 0}
                                    aria-label="Move category up"
                                    onClick={() => move(index, index - 1)}
                                >
                                    <ArrowUp className="size-4" />
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    disabled={index === fields.length - 1}
                                    aria-label="Move category down"
                                    onClick={() => move(index, index + 1)}
                                >
                                    <ArrowDown className="size-4" />
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Remove category"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <Field data-invalid={!!nameError}>
                            <FieldLabel htmlFor={`skill-category-${item.id}`}>Category name</FieldLabel>

                            <Input
                                id={`skill-category-${item.id}`}
                                placeholder="Enter category name..."
                                aria-invalid={!!nameError}
                                {...register(`careerData.skills.${index}.name` as const)}
                            />

                            {nameError && (
                                <FieldError>{nameError}</FieldError>
                            )}
                        </Field>

                        <Controller
                            control={control}
                            name={`careerData.skills.${index}.skills` as const}
                            render={({ field, fieldState }) => (
                                <SkillsFields
                                    label="Skills"
                                    placeholder="Enter a skill..."
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={fieldState.error?.message}
                                    maxItems={maxItemsForGroup}
                                />
                            )}
                        />
                    </div>
                );
            })}
        </RepeatableSection>
    );
};