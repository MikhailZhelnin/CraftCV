import { useState } from "react";
import { useNavigate } from "react-router";

import { DeleteProfileDialog, ProfileList, useProfilesStore } from "@/modules/profiles";

import { CollectionAside } from "@/shared/components/CollectionAside";
import { CollectionToolbar, type CollectionTab, type CollectionSortOrder } from "@/shared/components/CollectionToolbar";
import { ScrollArea } from "@/shared/ui/scroll-area";

const ProfilesPage = () => {
    const navigate = useNavigate();

    const profiles = useProfilesStore((state) => state.profiles);
    const deleteProfile = useProfilesStore((state) => state.deleteProfile);

    const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<CollectionTab>("all");

    const [sortOrder, setSortOrder] = useState<CollectionSortOrder>("newest");

    const [search, setSearch] = useState("");
    const [referenceTime] = useState(Date.now);

    const selectedProfile = profiles.find((profile) => profile.id === profileToDelete) ?? null;

    const normalizedSearch = search.trim().toLowerCase();

    const visibleProfiles = profiles
        .filter((profile) => {
            if (!normalizedSearch) return true;

            return (
                profile.name.toLowerCase().includes(normalizedSearch) || profile.description.toLowerCase().includes(normalizedSearch)
            );
        })
        .filter((profile) => {
            if (activeTab === "all") return true;

            const updatedAt = new Date(profile.updatedAt).getTime();
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;

            return referenceTime - updatedAt <= thirtyDays;
        })
        .sort((a, b) => {
            const aTime = new Date(a.updatedAt).getTime();
            const bTime = new Date(b.updatedAt).getTime();

            return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
        });

    const confirmDelete = () => {
        if (!selectedProfile) return;

        deleteProfile(selectedProfile.id);
        setProfileToDelete(null);
    };

    return (
        <div className="min-h-full bg-background lg:h-full lg:min-h-0 lg:overflow-hidden">
            <div className="px-4 lg:h-full lg:min-h-0">
                <div className="grid lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,28%)_minmax(0,1fr)]">
                    <CollectionAside
                        number="02"
                        title="PROFILES"
                        description={[
                            "Create reusable profiles to build",
                            "a tailored resume in minutes.",
                        ]}
                        footer={[
                            "Same you.",
                            "Different opportunities.",
                        ]}
                        createLabel="New Profile"
                        onCreate={() => navigate("/profiles/new")}
                    />

                    <section className="min-w-0 pt-4 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden lg:pl-5">
                        <CollectionToolbar
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            search={search}
                            onSearchChange={setSearch}
                            sortOrder={sortOrder}
                            onSortChange={setSortOrder}
                            resourceName="profiles"
                        />

                        <ScrollArea className="w-full lg:min-h-0 lg:flex-1">
                            <ProfileList
                                profiles={visibleProfiles}
                                onEdit={(id) => navigate(`/profiles/${id}/edit`)}
                                onDelete={setProfileToDelete}
                                onCreateNew={() => navigate("/profiles/new")}
                            />

                            {visibleProfiles.length === 0 && profiles.length > 0 && (
                                <p className="mt-5 text-sm text-muted-foreground">No profiles match your current filters.</p>
                            )}
                        </ScrollArea>
                    </section>
                </div>
            </div>

            <DeleteProfileDialog
                profile={selectedProfile}
                onClose={() => setProfileToDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default ProfilesPage;