import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Resume, ResumeDraft, CreateResumeInput } from "./resume.types";

import { createDefaultResumeSections } from "./resume.sections";

interface ResumesStore {
    resumes: Resume[];
    createResume: (data: CreateResumeInput) => string;
    updateResume: (id: string, data: ResumeDraft) => void;
    duplicateResume: (id: string) => string | null;
    deleteResume: (id: string) => void;
};

export const useResumesStore = create<ResumesStore>()(
    persist(
        (set, get) => ({
            resumes: [],

            createResume: (data) => {
                const id = crypto.randomUUID();
                const now = new Date().toISOString();

                const resume: Resume = {
                    id,
                    title: data.title,
                    targetRole: data.targetRole,
                    sourceProfileId: data.sourceProfileId,
                    templateId: data.templateId,
                    careerData: structuredClone(data.careerData),
                    sections: createDefaultResumeSections(),
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    resumes: [resume, ...state.resumes],
                }));

                return id;
            },

            updateResume: (id, data) => {
                set((state) => ({
                    resumes: state.resumes.map((resume) =>
                        resume.id === id
                            ? {
                                ...resume,
                                ...data,
                                careerData: structuredClone(data.careerData),
                                sections: structuredClone(data.sections),
                                updatedAt: new Date().toISOString(),
                            }
                            : resume
                    ),
                }));
            },

            duplicateResume: (id) => {
                const original = get().resumes.find((resume) => resume.id === id);

                if (!original) return null;

                const copyId = crypto.randomUUID();
                const now = new Date().toISOString();

                const copy: Resume = {
                    ...original,
                    id: copyId,
                    title: `${original.title} (Copy)`,
                    sourceProfileId: null,
                    careerData: structuredClone(original.careerData),
                    sections: structuredClone(original.sections),
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    resumes: [copy, ...state.resumes],
                }));

                return copyId;
            },

            deleteResume: (id) => {
                set((state) => ({
                    resumes: state.resumes.filter((resume) => resume.id !== id),
                }));
            },
        }),
        {
            name: "craftcv-resumes",
            version: 1,

            partialize: (state) => ({
                resumes: state.resumes,
            }),
        }
    )
);