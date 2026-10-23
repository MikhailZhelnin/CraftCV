import { Check } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { RESUME_TEMPLATES, type ResumeTemplateId } from "../model/resume.templates";

import { cn } from "cn";

interface ResumeTemplateSelectorProps {
    value: ResumeTemplateId;
    onChange: (value: ResumeTemplateId) => void;
};

function TemplateThumbnail({ templateId }: { templateId: ResumeTemplateId; }) {
    const isModern = templateId === "modern";

    return (
        <div aria-hidden="true" className="aspect-210/297 w-28 overflow-hidden rounded-sm border bg-white p-2 shadow-sm">
            <div className={isModern ? "rounded-sm bg-slate-900 p-2" : "border-b-2 border-slate-800 pb-2"}>
                <div className={`h-2 w-16 rounded-sm ${isModern ? "bg-white" : "bg-slate-800"}`} />
                <div className={`mt-1.5 h-1 w-12 rounded-sm ${isModern ? "bg-blue-300" : "bg-slate-400"}`} />
            </div>

            <div className="mt-3 space-y-3">
                {[0, 1, 2].map((section) => (
                    <div key={section} className="space-y-1.5">
                        <div className="flex items-center gap-1">
                            {isModern && (
                                <div className="h-2 w-0.5 bg-blue-600" />
                            )}

                            <div className={`h-1.5 w-12 rounded-sm ${isModern ? "bg-blue-700" : "bg-slate-700"}`} />
                        </div>

                        <div className="h-1 w-full rounded-sm bg-slate-200" />
                        <div className="h-1 w-4/5 rounded-sm bg-slate-200" />
                        <div className="h-1 w-3/5 rounded-sm bg-slate-200" />
                    </div>
                ))}
            </div>
        </div>
    );
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
                            "grid h-full w-full grid-rows-[180px_28px_44px] items-stretch justify-items-stretch gap-3",
                            "rounded-sm border bg-card p-3 text-left",
                            "whitespace-normal shadow-none transition-colors hover:border-foreground/40",
                            "border border-border aria-pressed:border-primary"
                        )}
                    >
                        <div className="flex h-45 min-h-0 items-center justify-center overflow-hidden bg-muted">
                            <TemplateThumbnail templateId={template.id} />
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