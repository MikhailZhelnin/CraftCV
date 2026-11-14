import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Profile, ProfileDraft } from "./profile.types";

import { pickProfileAccentTone, type ProfileAccentTone } from "./profile.accent";

interface ProfilesStore {
    profiles: Profile[];
    createProfile: (data: ProfileDraft, accentTone?: ProfileAccentTone) => string;
    updateProfile: (id: string, data: ProfileDraft) => void;
    deleteProfile: (id: string) => void;
};

export const useProfilesStore = create<ProfilesStore>()(
    persist(
        (set) => ({
            profiles: [],

            createProfile: (data, accentTone) => {
                const id = crypto.randomUUID();
                const now = new Date().toISOString();

                const profile: Profile = {
                    ...data,
                    id,
                    createdAt: now,
                    updatedAt: now,
                    accentTone: accentTone ?? pickProfileAccentTone(id),
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

            deleteProfile: (id) => {
                set((state) => ({
                    profiles: state.profiles.filter((profile) => profile.id !== id),
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