import { CollectionCreateCard } from "@/shared/components/CollectionCreateCard";

import type { ProfileSummary } from "../../model/profile.types";

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

            <CollectionCreateCard
                title="Create new profile"
                description="Build another version of your story."
                onClick={onCreateNew}
            />
        </div>
    );
};