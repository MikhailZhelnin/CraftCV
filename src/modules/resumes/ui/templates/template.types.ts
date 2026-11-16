import type { ReactNode } from "react";

import type { CareerData, CareerSectionId } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../../model/resume.types";

export interface ResumeTemplateProps {
    data: CareerData;
    targetRole: string;
    sections: ResumeSectionSetting[];
};

export type ResumeTemplateContent = Record<CareerSectionId, ReactNode | null>;