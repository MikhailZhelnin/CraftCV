import { z } from "zod";

import { LANGUAGE_LEVELS } from "./career.types";

const monthPattern = /^$|^\d{4}-(0[1-9]|1[0-2])$/;

const optionalUrlSchema = z
    .string()
    .trim()
    .max(2048, "URL is too long")
    .refine((value) => {
        if (!value) return true;

        try {
            const url = new URL(value);

            return (
                url.protocol === "http:" ||
                url.protocol === "https:"
            );
        } catch {
            return false;
        };
    }, "Enter a valid URL starting with https://");

export const personalDetailsSchema = z.object({
    fullName: z.string().trim().max(100),
    jobTitle: z.string().trim().max(100),
    email: z.string().trim().refine((value) => value === "" || z.email().safeParse(value).success, "Enter a valid email address"),
    phone: z.string().trim().max(40),
    location: z.string().trim().max(100),
});

export const experienceSchema = z.object({
    id: z.string().min(1),
    position: z.string().trim().min(1, "Job title is required").max(100),
    company: z.string().trim().min(1, "Company is required").max(100),
    startDate: z.string().regex(monthPattern, "Invalid start date"),
    endDate: z.string().regex(monthPattern, "Invalid end date"),
    isCurrent: z.boolean(),
    description: z.string().trim().max(2000),
}).superRefine((data, ctx) => {
    if (!data.isCurrent && data.startDate && data.endDate && data.endDate < data.startDate) {
        ctx.addIssue({
            code: "custom",
            path: ["endDate"],
            message: "End date cannot be before start date",
        });
    };
});

export const educationSchema = z.object({
    id: z.string(),
    institution: z.string().trim().min(1, "Institution is required"),
    degree: z.string().trim().max(100),
    fieldOfStudy: z.string().trim().max(120),
    startDate: z.string().regex(monthPattern, "Invalid start date"),
    endDate: z.string().regex(monthPattern, "Invalid end date"),
    isCurrent: z.boolean(),
    description: z.string().trim().max(1000),
}).superRefine((data, ctx) => {
    if (!data.isCurrent && data.startDate && data.endDate && data.endDate < data.startDate) {
        ctx.addIssue({
            code: "custom",
            path: ["endDate"],
            message: "End date cannot be before start date",
        });
    };
});

export const skillsSchema = z
    .array(z.string().trim().min(1, "Skill cannot be empty").max(40, "Skill is too long"))
    .max(30, "Maximum 30 skills")
    .refine((skills) => {
        const normalized = skills.map((skill) => skill.toLowerCase());

        return new Set(normalized).size === skills.length;
    },
        "Duplicate skills are not allowed",
    );

const projectTechnologiesSchema = z
    .array(z.string().trim().min(1).max(40))
    .max(15, "Maximum 15 technologies")
    .refine(
        (technologies) => {
            const normalized = technologies.map((technology) => technology.toLowerCase());

            return new Set(normalized).size === technologies.length;
        },
        "Duplicate technologies are not allowed"
    );

export const projectSchema = z
    .object({
        id: z.string(),
        name: z.string().trim().min(1, "Project name is required").max(120),
        role: z.string().trim().max(120),
        websiteUrl: optionalUrlSchema,
        repositoryUrl: optionalUrlSchema,
        startDate: z.string().regex(monthPattern, "Invalid start date"),
        endDate: z.string().regex(monthPattern, "Invalid end date"),
        isCurrent: z.boolean(),
        description: z.string().trim().max(2000),
        technologies: projectTechnologiesSchema,
    })
    .superRefine((data, ctx) => {
        if (!data.isCurrent && data.startDate && data.endDate && data.endDate < data.startDate) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date cannot be before start date",
            });
        };
    });

export const spokenLanguageSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, "Language is required").max(60),
    level: z.enum(["", ...LANGUAGE_LEVELS]).refine((level) => level !== "", "Select a language level"),
});

export const languagesSchema = z
    .array(spokenLanguageSchema)
    .max(12, "Maximum 12 languages")
    .superRefine((languages, ctx) => {
        const names = new Set<string>();

        languages.forEach((language, index) => {
            const normalized = language.name.trim().toLowerCase();

            if (!normalized) return;

            if (names.has(normalized)) {
                ctx.addIssue({
                    code: "custom",
                    path: [index, "name"],
                    message: "This language is already added",
                });
            };

            names.add(normalized);
        });
    });

export const careerDataSchema = z.object({
    personal: personalDetailsSchema,
    summary: z.string().trim().max(2000),
    experience: z.array(experienceSchema),
    education: z.array(educationSchema).max(20),
    skills: skillsSchema,
    projects: z.array(projectSchema).max(20),
    languages: languagesSchema,
});