import type { CareerData } from "@/modules/career-data";

export interface Profile {
  id: string;
  name: string;
  description: string;
  careerData: CareerData;
  createdAt: string;
  updatedAt: string;
};

export type ProfileDraft = Pick<Profile, "name" | "description" | "careerData">;

export type ProfileSummary = Pick<Profile, "id" | "name" | "description" | "updatedAt">;