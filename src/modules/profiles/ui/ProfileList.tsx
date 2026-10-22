import type { ProfileSummary } from "../model/profile.types";

import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
    profiles: ProfileSummary[];
    onEdit: (id: string) => void;
};

export function ProfileList({ profiles, onEdit }: ProfileListProps) {
    if (profiles.length === 0) {
        return (
            <p className="text-center text-gray-500">No profiles yet.</p>
        );
    };

    return (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile => (
                <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onEdit={onEdit}
                />
            )))}
        </ul>
    );
};