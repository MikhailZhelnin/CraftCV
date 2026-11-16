import { Check } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { RESUME_TEMPLATES, type ResumeTemplateId } from "../../model/resume.templates";

import { ResumeTemplateIllustration } from "./ResumeTemplateIllustration";

import { cn } from "cn";

interface ResumeTemplateSelectorProps {
    value: ResumeTemplateId;
    onChange: (value: ResumeTemplateId) => void;
};

export function ResumeTemplateSelector({ value, onChange }: ResumeTemplateSelectorProps) {
    return (
        <div role="group" aria-label="Resume template" className="grid gap-3 sm:grid-cols-2">
            {RESUME_TEMPLATES.map((template) => {
                const isSelected = value === template.id;

                return (
                    <Button
                        key={template.id}
                        type="button"
                        variant="outline"
                        aria-pressed={isSelected}
                        onClick={() => onChange(template.id)}
                        className={cn(
                            "grid h-full w-full min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[180px_28px_44px] items-stretch gap-3",
                            "rounded-sm border bg-card p-3 text-left",
                            "whitespace-normal shadow-none transition-colors hover:border-foreground/40",
                            "border border-border aria-pressed:border-primary"
                        )}
                    >
                        <div className="flex h-45 min-h-0 items-center justify-center overflow-hidden bg-muted">
                            <ResumeTemplateIllustration templateId={template.id} size="small" />
                        </div>

                        <div className="flex h-7 min-w-0 items-center justify-between gap-2">
                            <span className="truncate text-sm font-semibold">{template.name}</span>

                            {isSelected ? (
                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                                    <Check className="size-3 text-primary-foreground" />
                                </span>
                            ) : (
                                <span className="size-5 shrink-0 rounded-full border border-muted-foreground/60" />
                            )}
                        </div>

                        <p className="h-11 overflow-hidden text-xs leading-5.5 text-muted-foreground">{template.description}</p>
                    </Button>
                );
            })}
        </div>
    );
};