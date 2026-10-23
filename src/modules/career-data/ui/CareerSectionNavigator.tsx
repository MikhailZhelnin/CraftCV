import { Button } from "@/shared/ui/button";
import { getByPath } from "@/shared/lib/getByPath";
import { cn } from "cn";

import { CAREER_SECTION_LABELS, type CareerSectionId } from "../model/career.sections";

import { scrollToCareerSection } from "../lib/sectionNavigation";

interface CareerSectionNavigatorProps {
    order: readonly CareerSectionId[];
    errors?: unknown;
    activeId?: CareerSectionId | null;
    onSelect?: (id: CareerSectionId) => void;
};

export function CareerSectionNavigator({ order, errors, activeId, onSelect }: CareerSectionNavigatorProps) {
    const isSelectionMode = onSelect !== undefined;

    return (
        <nav aria-label="Career data sections" className={cn("flex gap-1", isSelectionMode ? "flex-col" : "flex-row flex-wrap")}>
            {order.map((id, index) => {
                const isActive = isSelectionMode && activeId === id;

                const hasError = Boolean(getByPath(errors, `careerData.${id}`));

                return (
                    <Button
                        key={id}
                        type="button"
                        variant="ghost"
                        aria-current={isActive ? "step" : undefined}
                        onClick={() => {
                            if (onSelect) {
                                onSelect(id);
                            } else {
                                scrollToCareerSection(id);
                            }
                        }}
                        className={cn(
                            "h-10 min-w-0 gap-3 rounded-sm px-3",
                            "text-left text-xs font-medium",
                            isSelectionMode ? "w-full justify-start" : "w-auto",
                            isActive ? "border border-border bg-muted text-foreground" : "border border-transparent text-muted-foreground",
                            "hover:bg-muted/70 hover:text-foreground"
                        )}
                    >
                        {isSelectionMode && (
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "flex size-5 shrink-0 items-center justify-center",
                                    "rounded-full border text-[10px] font-semibold",
                                    isActive ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
                                )}
                            >
                                {index + 1}
                            </span>
                        )}

                        <span className="min-w-0 flex-1 truncate">{CAREER_SECTION_LABELS[id]}</span>

                        {hasError && (
                            <span aria-label="Contains validation errors" className="size-2 shrink-0 rounded-full bg-destructive" />
                        )}
                    </Button>
                );
            })}
        </nav>
    );
};