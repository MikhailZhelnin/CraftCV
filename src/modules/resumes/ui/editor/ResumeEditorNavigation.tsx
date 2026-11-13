import type { FieldErrors } from "react-hook-form";
import { FileText, LayoutTemplate } from "lucide-react";
import { cn } from "cn";

import { CareerSectionNavigator, type CareerSectionId } from "@/modules/career-data";

import { Button } from "@/shared/ui/button";

import type { ResumeDraft } from "../../model/resume.types";

export type ResumeEditorPanel = | CareerSectionId | "details" | "design";

interface ResumeEditorNavigationProps {
    activePanel: ResumeEditorPanel;
    sectionOrder: CareerSectionId[];
    errors: FieldErrors<ResumeDraft>;
    onSelect: (panel: ResumeEditorPanel) => void;
};

export function ResumeEditorNavigation({ activePanel, sectionOrder, errors, onSelect }: ResumeEditorNavigationProps) {
    const activeCareerSection = sectionOrder.find((id) => id === activePanel) ?? null;

    const buttonClassName = (active: boolean) => cn(
        "h-10 w-full justify-start gap-3 rounded-sm",
        "border px-3 text-left text-xs",
        active ? "border-border bg-muted" : "border-transparent"
    );

    return (
        <div className="space-y-4">
            <div className="border-b border-border pb-4">
                <Button
                    type="button"
                    variant="ghost"
                    aria-current={activePanel === "details" ? "step" : undefined}
                    onClick={() => onSelect("details")}
                    className={buttonClassName(activePanel === "details")}
                >
                    <FileText className="size-4" />
                    Resume Details

                    {(errors.title || errors.targetRole) && (
                        <span aria-label="Contains errors" className="ml-auto size-2 rounded-full bg-destructive" />
                    )}
                </Button>
            </div>

            <CareerSectionNavigator
                order={sectionOrder}
                activeId={activeCareerSection}
                onSelect={(id) => onSelect(id)}
                errors={errors}
            />

            <div className="border-t border-border pt-4">
                <Button
                    type="button"
                    variant="ghost"
                    aria-current={activePanel === "design" ? "step" : undefined}
                    onClick={() => onSelect("design")}
                    className={buttonClassName(activePanel === "design")}
                >
                    <LayoutTemplate className="size-4" />
                    Design & Template
                </Button>
            </div>
        </div>
    );
};