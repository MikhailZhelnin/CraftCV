import { z } from "zod";

import { CAREER_SECTION_IDS, careerDataSchema } from "@/modules/career-data";
import { RESUME_TEMPLATE_IDS } from "./resume.templates";

export const resumeMetadataSchema = z.object({
    title: z.string().trim().min(2, "Title must contain at least 2 characters").max(100, "Title is too long"),
    targetRole: z.string().trim().max(120, "Target role is too long"),
});

export const resumeSectionsSchema = z
    .array(z.object({ id: z.enum(CAREER_SECTION_IDS), visible: z.boolean() }))
    .length(CAREER_SECTION_IDS.length, "Invalid number of resume sections")
    .refine(
        (sections) => {
            const ids = sections.map((section) => section.id);

            return new Set(ids).size === ids.length;
        },
        "Resume sections must be unique"
    );

export const resumeDraftSchema = resumeMetadataSchema.extend({ careerData: careerDataSchema, sections: resumeSectionsSchema, templateId: z.enum(RESUME_TEMPLATE_IDS), });
