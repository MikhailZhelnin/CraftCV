import { Button } from "@/shared/ui/button";
import { getByPath } from "@/shared/lib/getByPath";

import { CAREER_SECTION_LABELS, type CareerSectionId } from "../model/career.sections";

import { scrollToCareerSection } from "../lib/sectionNavigation";

interface Props {
    order: readonly CareerSectionId[];
    errors?: unknown;
};

export function CareerSectionNavigator({ order, errors }: Props) {
    return (
        <nav aria-label="Career data sections" className="flex flex-wrap gap-2">
            {order.map((id) => {
                const hasError = Boolean(getByPath(errors, `careerData.${id}`));

                return (
                    <Button
                        key={id}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => scrollToCareerSection(id)}
                    >
                        {CAREER_SECTION_LABELS[id]}

                        {hasError && (
                            <span aria-label="Contains errors" className="text-destructive">●</span>
                        )}
                    </Button>
                );
            })}
        </nav>
    );
};