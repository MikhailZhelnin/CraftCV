import { Plus } from "lucide-react";

import type { ProfileSummary } from "../model/profile.types";

import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
    profiles: ProfileSummary[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onCreateNew: () => void;
};

export function ProfileList({ profiles, onEdit, onDelete, onCreateNew }: ProfileListProps) {
    return (
        <div className="grid auto-rows-fr grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-4">
            {profiles.map((profile => (
                <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )))}

            <button
                type="button"
                onClick={onCreateNew}
                className="group flex h-full min-h-65 flex-col items-center justify-center border border-dashed border-border bg-card/40 px-4 text-center transition-colors hover:border-foreground/50 hover:bg-card cursor-pointer"
            >
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform">
                    <Plus className="size-6" />
                </span>
                <span className="mt-4 text-sm font-semibold text-foreground">Create new profile</span>
                <span className="mt-2 max-w-30 text-[11px] leading-relaxed text-muted-foreground">Build another version of your story.</span>
            </button>
        </div>
    );
};