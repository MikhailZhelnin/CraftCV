import type { CareerData, CareerSectionId } from "@/modules/career-data";
import type { ResumeTemplateId } from "./resume.templates";

export interface ResumeSectionSetting {
    id: CareerSectionId;
    visible: boolean;
};

export interface Resume {
    id: string;
    title: string;
    targetRole: string;
    sourceProfileId: string | null;
    careerData: CareerData;
    sections: ResumeSectionSetting[];
    createdAt: string;
    updatedAt: string;
    templateId: ResumeTemplateId;
};

export type ResumeDraft = Pick<Resume, "title" | "targetRole" | "careerData" | "sections" | "templateId">;

export type CreateResumeInput = Pick<Resume, | "title" | "targetRole" | "careerData" | "sourceProfileId" | "templateId">;