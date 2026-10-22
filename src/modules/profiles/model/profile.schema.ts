import { z } from "zod";

import { careerDataSchema } from "@/modules/career-data";

export const profileFormSchema = z.object({
    name: z.string().trim().min(2, "Name must contain at least 2 characters").max(80, "Name is too long"),
    description: z.string().trim().max(300, "Description is too long"),
    careerData: careerDataSchema,
});