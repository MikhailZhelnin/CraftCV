import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowUpRight, Search } from "lucide-react";

import { DeleteProfileDialog, ProfileList, useProfilesStore } from "@/modules/profiles";

import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";

type ProfileTab = "all" | "recent";
type SortOrder = "newest" | "oldest";

const sortOptions = [
    { value: "newest", label: "Last edited" },
    { value: "oldest", label: "Oldest first" },
];

const ProfilesPage = () => {
    const navigate = useNavigate();

    const profiles = useProfilesStore((state) => state.profiles);
    const deleteProfile = useProfilesStore((state) => state.deleteProfile);

    const [search, setSearch] = useState("");

    const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<ProfileTab>("all");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

    const selectedProfile = profiles.find((profile) => profile.id === profileToDelete) ?? null;

    const normalizedSearch = search.trim().toLowerCase();

    const visibleProfiles = profiles
        .filter((profile) => {
            if (!normalizedSearch) return true;

            return (
                profile.name.toLowerCase().includes(normalizedSearch) ||
                profile.description.toLowerCase().includes(normalizedSearch)
            );
        })
        .filter((profile) => {
            if (activeTab === "all") return true;

            const updatedAt = new Date(profile.updatedAt).getTime();
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;

            return Date.now() - updatedAt <= thirtyDays;
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
                    <aside className="@container relative flex min-h-88 flex-col overflow-hidden border-b border-border py-8 lg:h-full lg:min-h-0 lg:border-r lg:border-b-0 lg:pr-7">
                        <div className="relative z-10">
                            <span className="inline-flex mb-4 text-sm font-semibold uppercase">02 — Your Profiles</span>

                            <h1 className="mb-4 font-display text-[clamp(3.25rem,7vw,5.5rem)] uppercase leading-[0.98]">
                                MY
                                <br />
                                PROFILES
                            </h1>

                            <p className=" text-sm leading-relaxed text-foreground">
                                Create reusable profiles to build
                                <br />
                                a tailored resume in minutes.
                            </p>

                            <Button
                                type="button"
                                size="lg"
                                className="mt-6 gap-4 font-bold uppercase"
                                onClick={() => navigate("/profiles/new")}
                            >
                                New Profile
                                <ArrowUpRight className="size-5" />
                            </Button>
                        </div>

                        <div className="relative z-10 mt-auto pt-20">
                            <p className="max-w-35 text-xs leading-relaxed text-muted-foreground">
                                Same you.
                                <br />
                                Different opportunities.
                            </p>
                        </div>

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 bottom-1 font-display leading-[0.8] text-foreground/6"
                            style={{ fontSize: "clamp(4rem, calc(80cqw - 6rem), 24rem)" }}
                        >
                            02
                        </span>
                    </aside>

                    <section className="min-w-0 pt-4 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden lg:pl-5">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 lg:shrink-0">
                            <div className="flex items-center gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveTab("all")}
                                    className={`rounded-none border-b-2 px-2 text-[11px] font-semibold ${activeTab === "all" ? "border-foreground" : "border-transparent text-muted-foreground"}`}
                                >
                                    All
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveTab("recent")}
                                    className={`rounded-none border-b-2 px-2 text-[11px] font-semibold ${activeTab === "recent" ? "border-foreground" : "border-transparent text-muted-foreground"}`}
                                >
                                    Recently edited
                                </Button>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search..."
                                        aria-label="Search resumes"
                                        className="h-8 w-36 rounded-sm bg-card pl-8 text-xs sm:w-42"
                                    />
                                </div>

                                <Select
                                    items={sortOptions}
                                    value={sortOrder}
                                    onValueChange={(value) => {
                                        if (value === "newest" || value === "oldest") {
                                            setSortOrder(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger
                                        size="sm"
                                        aria-label="Sort resumes"
                                        className="w-31 rounded-sm text-xs"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="newest">Last edited</SelectItem>
                                        <SelectItem value="oldest">Oldest first</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <ScrollArea className="w-full lg:min-h-0 lg:flex-1">
                            <ProfileList
                                profiles={visibleProfiles}
                                onEdit={(id) => navigate(`/profiles/${id}/edit`)}
                                onDelete={setProfileToDelete}
                                onCreateNew={() => navigate("/profiles/new")}
                            />
                        </ScrollArea>
                    </section>
                </div>
            </div>

            <DeleteProfileDialog profile={selectedProfile} onClose={() => setProfileToDelete(null)} onConfirm={confirmDelete} />
        </div>
    );
};

export default ProfilesPage;