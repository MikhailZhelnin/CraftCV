import { useNavigate, useParams } from "react-router";

import { ProfileForm, useProfilesStore, type ProfileDraft } from "@/modules/profiles";

export function ProfileEditorPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const profiles = useProfilesStore((state) => state.profiles);
    const createProfile = useProfilesStore((state) => state.createProfile);
    const updateProfile = useProfilesStore((state) => state.updateProfile);

    const profile = id ? profiles.find((item) => item.id === id) : undefined;

    if (id && !profile) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Profile not found</h1>
                <p className="text-sm text-muted-foreground">This profile does not exist or was deleted.</p>
            </div>
        );
    };

    const handleSave = (data: ProfileDraft) => {
        if (id) {
            updateProfile(id, data);
        } else {
            createProfile(data);
        };
    };

    return (
        <div className="h-full min-h-0">
            <ProfileForm
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
                onSubmit={handleSave}
                onCancel={() => navigate("/profiles")}
            />
        </div>
    );
};