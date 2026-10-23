import { useNavigate } from "react-router";

import { ProfileList, useProfilesStore } from "@/modules/profiles";

import { Button } from "@/shared/ui/button";

const ProfilesPage = () => {
    const navigate = useNavigate();
    const profiles = useProfilesStore((state) => state.profiles);

    return (
        <div className="py-4">
            <div className="t-container">
                <div>
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <span className="editorial-index">02 — Your Profiles</span>
                            <h1 className="editorial-display mt-4">My Profiles</h1>
                            <p className="mt-4 max-w-sm text-sm text-muted-foreground">Create reusable profiles to build a tailored resume in minutes.</p>
                        </div>
                        <Button onClick={() => navigate("/profiles/new")}>New Profile</Button>
                    </div>

                    <ProfileList
                        profiles={profiles}
                        onEdit={(id) => navigate(`/profiles/${id}/edit`)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilesPage;