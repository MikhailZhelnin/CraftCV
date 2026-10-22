import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { ProfileForm, useProfilesStore, type ProfileDraft } from "@/modules/profiles";

export function ProfileEditorPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const profiles = useProfilesStore((state) => state.profiles);
    const createProfile = useProfilesStore((state) => state.createProfile);
    const updateProfile = useProfilesStore((state) => state.updateProfile);

    const profile = id ? profiles.find((item) => item.id === id) : undefined;

    if (id && !profile) {
        return <p>Profile not found.</p>;
    };

    const handleSubmit = (data: ProfileDraft) => {
        if (id) {
            updateProfile(id, data);
        } else {
            createProfile(data);
        };

        navigate("/profiles");
    };

    return (
        <div className="py-4">
            <div className="t-container">
                <div>
                    <div>
                        <Button className="mb-4" variant={"outline"} onClick={() => navigate("/profiles")}>
                            <ArrowLeft className="size-4" />
                            Back to profiles
                        </Button>

                        <div className="mb-4">
                            <h1 className="text-3xl font-bold">{id ? "Edit Profile" : "Create Profile"}</h1>
                            <p className="mt-2 text-muted-foreground">Manage your professional information.</p>
                        </div>
                    </div>

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
                        onSubmit={handleSubmit}
                        onCancel={() => navigate("/profiles")}
                    />
                </div>
            </div>
        </div>
    );
};