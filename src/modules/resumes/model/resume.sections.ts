import { CAREER_SECTION_IDS } from "@/modules/career-data";

import type { ResumeSectionSetting } from "./resume.types";

export const createDefaultResumeSections = ():
    ResumeSectionSetting[] => {
    return CAREER_SECTION_IDS.map((id) => ({ id, visible: true }));
};