import { ArrowUp, ArrowDown } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";

import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { FieldLabel } from "@/shared/ui/field";

import { CAREER_SECTION_LABELS } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../model/resume.types";

interface ResumeSectionSettingsProps {
    value: ResumeSectionSetting[];
    onChange: (value: ResumeSectionSetting[]) => void;
};

export function ResumeSectionSettings({ value, onChange }: ResumeSectionSettingsProps) {
    const toggleVisibility = (id: ResumeSectionSetting["id"], checked: boolean) => {
        onChange(value.map((section) => section.id === id ? { ...section, visible: checked } : section));
    };

    const moveSection = (index: number, direction: -1 | 1) => {
        const nextIndex = index + direction;

        if (nextIndex < 0 || nextIndex >= value.length) {
            return;
        };

        const updated = [...value];

        [updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]];

        onChange(updated);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resume Sections</CardTitle>
                <CardDescription>
                    Choose which sections appear in your resume
                    and arrange their order.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                {value.map((section, index) => (
                    <div key={section.id} className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="min-w-0 flex-1">
                            <FieldLabel htmlFor={`section-${section.id}`} className={!section.visible ? "text-muted-foreground" : ""}>
                                {CAREER_SECTION_LABELS[section.id]}
                            </FieldLabel>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={index === 0}
                                aria-label={`Move ${section.id} up`}
                                onClick={() => moveSection(index, -1)}
                            >
                                <ArrowUp className="size-4" />
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={index === value.length - 1}
                                aria-label={`Move ${section.id} down`}
                                onClick={() => moveSection(index, 1)}
                            >
                                <ArrowDown className="size-4" />
                            </Button>
                        </div>

                        <Switch
                            id={`section-${section.id}`}
                            checked={section.visible}
                            onCheckedChange={(checked) => toggleVisibility(section.id, checked)}
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};