import { ArrowUp, ArrowDown } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";

import { CAREER_SECTION_LABELS } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../model/resume.types";

interface Props {
    section: ResumeSectionSetting;
    index: number;
    total: number;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onVisibilityChange: (visible: boolean) => void;
};

export function ResumeSectionActions({ section, index, total, onMoveUp, onMoveDown, onVisibilityChange }: Props) {
    const label = CAREER_SECTION_LABELS[section.id];

    return (
        <div
            className="flex flex-wrap items-center justify-end gap-2"
            role="group"
            aria-label={`${label} section settings`}
        >
            <span className="text-xs text-muted-foreground">{section.visible ? "In PDF" : "Hidden"}</span>

            <Switch
                checked={section.visible}
                onCheckedChange={onVisibilityChange}
                aria-label={`Show ${label} in PDF`}
            />

            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={index === 0}
                    onClick={onMoveUp}
                    aria-label={`Move ${label} up`}
                    title={`Move ${label} up`}
                >
                    <ArrowUp className="size-4" />
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={index === total - 1}
                    onClick={onMoveDown}
                    aria-label={`Move ${label} down`}
                    title={`Move ${label} down`}
                >
                    <ArrowDown className="size-4" />
                </Button>
            </div>
        </div>
    );
};