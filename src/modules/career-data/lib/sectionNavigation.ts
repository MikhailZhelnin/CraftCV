import { getByPath } from "@/shared/lib/getByPath";

import type { CareerSectionId } from "../model/career.sections";

export function getCareerSectionDomId(id: CareerSectionId): string {
    return `career-section-${id}`;
};

export function findFirstInvalidCareerSection(errors: unknown, order: readonly CareerSectionId[]): CareerSectionId | undefined {
    return order.find((id) => Boolean(getByPath(errors, `careerData.${id}`)));
};

export function scrollToCareerSection(id: CareerSectionId): void {
    document.getElementById(getCareerSectionDomId(id))?.scrollIntoView({ behavior: "smooth", block: "start" });
};