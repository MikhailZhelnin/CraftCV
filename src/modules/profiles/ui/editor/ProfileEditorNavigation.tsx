import type { FieldErrors } from "react-hook-form";
import { FileText } from "lucide-react";
import { cn } from "cn";

import { CAREER_SECTION_IDS, CareerSectionNavigator, type CareerSectionId } from "@/modules/career-data";

import { Button } from "@/shared/ui/button";

import type { ProfileDraft } from "../../model/profile.types";

export type ProfileEditorPanel = | "details" | CareerSectionId;

interface ProfileEditorNavigationProps {
    activePanel: ProfileEditorPanel;
    errors: FieldErrors<ProfileDraft>;
    onSelect: (panel: ProfileEditorPanel) => void;
};

export function ProfileEditorNavigation({ activePanel, errors, onSelect }: ProfileEditorNavigationProps) {
    const activeCareerSection = CAREER_SECTION_IDS.find((id) => id === activePanel) ?? null;

    return (
        <div className="space-y-4">
            <div className="border-b border-border pb-4">
                <Button
                    type="button"
                    variant="ghost"
                    aria-current={activePanel === "details" ? "step" : undefined}
                    onClick={() => onSelect("details")}
                    className={cn(
                        "h-10 w-full justify-start gap-3",
                        "rounded-sm border px-3 text-left text-xs",
                        activePanel === "details" ? "border-border bg-muted" : "border-transparent text-muted-foreground"
                    )}
                >
                    <FileText className="size-4" />
                    Profile Details

                    {(errors.name || errors.description) && (
                        <span aria-label="Contains errors" className="ml-auto size-2 rounded-full bg-destructive" />
                    )}
                </Button>
            </div>

            <CareerSectionNavigator
                order={CAREER_SECTION_IDS}
                activeId={activeCareerSection}
                onSelect={onSelect}
                errors={errors}
            />
        </div>
    );
};