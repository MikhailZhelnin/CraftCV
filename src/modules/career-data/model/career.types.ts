export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
};

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

export type Skill = string;

export interface Project {
  id: string;
  name: string;
  role: string;
  websiteUrl: string;
  repositoryUrl: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
};

export const LANGUAGE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"] as const;

export type LanguageLevel = | "" | (typeof LANGUAGE_LEVELS)[number];

export interface SpokenLanguage {
  id: string;
  name: string;
  level: LanguageLevel;
};

export interface CareerData {
  personal: PersonalDetails;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: SpokenLanguage[];
};