import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Profile, ProfileDraft } from "./profile.types";

interface ProfilesStore {
    profiles: Profile[];
    createProfile: (data: ProfileDraft) => string;
    updateProfile: (id: string, data: ProfileDraft) => void;
};

export const useProfilesStore = create<ProfilesStore>()(
    persist(
        (set) => ({
            profiles: [],

            createProfile: (data) => {
                const now = new Date().toISOString();

                const profile: Profile = {
                    ...data,
                    id: crypto.randomUUID(),
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    profiles: [...state.profiles, profile],
                }));

                return profile.id;
            },

            updateProfile: (id, data) => {
                set((state) => ({
                    profiles: state.profiles.map((profile) =>
                        profile.id === id
                            ? {
                                ...profile,
                                ...data,
                                updatedAt: new Date().toISOString(),
                            }
                            : profile
                    ),
                }));
            },
        }),

        {
            name: "craftcv-profiles",
            version: 1,

            partialize: (state) => ({
                profiles: state.profiles,
            }),
        }
    )
);