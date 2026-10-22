import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Switch } from "@/shared/ui/switch";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";

import type { Project } from "../model/career.types";
import { SkillsFields } from "./SkillsFields";

interface ProjectFieldsProps {
    value: Project;
    errors?: Partial<Record<keyof Project, string>>;
    onChange: (value: Project) => void;
};

export function ProjectFields({ value, errors, onChange }: ProjectFieldsProps) {
    const update = (changes: Partial<Project>) => {
        onChange({ ...value, ...changes });
    };

    return (
        <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field data-invalid={!!errors?.name}>
                    <FieldLabel htmlFor={`project-name-${value.id}`}>Project Name</FieldLabel>

                    <Input
                        id={`project-name-${value.id}`}
                        value={value.name}
                        onChange={(e) => update({ name: e.target.value })}
                        placeholder="CraftCV"
                        aria-invalid={!!errors?.name}
                    />

                    {errors?.name && (
                        <FieldError>{errors.name}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.role}>
                    <FieldLabel htmlFor={`project-role-${value.id}`}>Your Role</FieldLabel>

                    <Input
                        id={`project-role-${value.id}`}
                        value={value.role}
                        onChange={(e) => update({ role: e.target.value })}
                        placeholder="Frontend Developer"
                        aria-invalid={!!errors?.role}
                    />

                    {errors?.role && (
                        <FieldError>{errors.role}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.websiteUrl}>
                    <FieldLabel htmlFor={`project-web-${value.id}`}>Project URL</FieldLabel>

                    <Input
                        id={`project-web-${value.id}`}
                        type="url"
                        value={value.websiteUrl}
                        onChange={(e) => update({ websiteUrl: e.target.value })}
                        placeholder="https://example.com"
                        aria-invalid={!!errors?.websiteUrl}
                    />

                    {errors?.websiteUrl && (
                        <FieldError>{errors.websiteUrl}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.repositoryUrl}>
                    <FieldLabel htmlFor={`project-repo-${value.id}`}>Repository URL</FieldLabel>

                    <Input
                        id={`project-repo-${value.id}`}
                        type="url"
                        value={value.repositoryUrl}
                        onChange={(e) => update({ repositoryUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        aria-invalid={!!errors?.repositoryUrl}
                    />

                    {errors?.repositoryUrl && (
                        <FieldError>{errors.repositoryUrl}</FieldError>
                    )}
                </Field>

                <Field data-invalid={!!errors?.startDate}>
                    <FieldLabel htmlFor={`project-start-${value.id}`}>Start Date</FieldLabel>

                    <Input
                        id={`project-start-${value.id}`}
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
                    <FieldLabel htmlFor={`project-end-${value.id}`}>End Date</FieldLabel>

                    <Input
                        id={`project-end-${value.id}`}
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
                    id={`project-current-${value.id}`}
                    checked={value.isCurrent}
                    onCheckedChange={(checked) => update({ isCurrent: checked, endDate: checked ? "" : value.endDate })}
                />

                <FieldLabel htmlFor={`project-current-${value.id}`}>I'm currently working on this project</FieldLabel>
            </div>

            <Field data-invalid={!!errors?.description}>
                <FieldLabel htmlFor={`project-desc-${value.id}`}>Description</FieldLabel>

                <Textarea
                    id={`project-desc-${value.id}`}
                    value={value.description}
                    onChange={(e) => update({ description: e.target.value })}
                    placeholder="Describe what you built, your contributions and the results..."
                    rows={5}
                    aria-invalid={!!errors?.description}
                />

                {errors?.description && (
                    <FieldError>{errors.description}</FieldError>
                )}
            </Field>

            <SkillsFields
                label="Technologies"
                placeholder="React, TypeScript, Node.js..."
                maxItems={15}
                value={value.technologies}
                onChange={(technologies) => update({ technologies })}
                error={errors?.technologies}
            />
        </div>
    );
};