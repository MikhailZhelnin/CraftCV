import { useNavigate, useParams } from "react-router";

import { ProfileEditorForm, useProfilesStore, type ProfileDraft } from "@/modules/profiles";

export function ProfileEditorPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const profile = useProfilesStore((state) => id ? state.profiles.find((item) => item.id === id) : undefined);
    const createProfile = useProfilesStore((state) => state.createProfile);
    const updateProfile = useProfilesStore((state) => state.updateProfile);

    if (id && !profile) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Profile not found</h1>
                <p className="text-sm text-muted-foreground">This profile does not exist or was deleted.</p>
            </div>
        );
    };

    const handleSave = (data: ProfileDraft): void => {
        if (id) {
            updateProfile(id, data);
        } else {
            createProfile(data);
        };
    };

    return (
        <div className="h-full min-h-0">
            <ProfileEditorForm
                key={id ?? "new"}
                initialValues={
                    profile
                        ? {
                            name: profile.name,
                            description: profile.description,
                            careerData: profile.careerData,
                        }
                        : undefined
                }
                onSave={handleSave}
                onCancel={() => navigate("/profiles")}
            />
        </div>
    );
};