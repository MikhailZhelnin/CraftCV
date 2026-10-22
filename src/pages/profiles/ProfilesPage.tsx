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
                            <span className="text-2xl">My Profiles</span>
                            <p>Manage your professional profiles</p>
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