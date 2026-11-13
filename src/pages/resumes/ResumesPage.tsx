import { useState } from "react";
import { useNavigate } from "react-router";

import { CreateResumeDialog, DeleteResumeDialog, ResumeList, useResumesStore } from "@/modules/resumes";

import { CollectionAside } from "@/shared/components/CollectionAside";
import { CollectionToolbar, type CollectionTab, type CollectionSortOrder } from "@/shared/components/CollectionToolbar";
import { ScrollArea } from "@/shared/ui/scroll-area";

const ResumesPage = () => {
    const navigate = useNavigate();

    const resumes = useResumesStore((state) => state.resumes);
    const duplicateResume = useResumesStore((state) => state.duplicateResume);
    const deleteResume = useResumesStore((state) => state.deleteResume);

    const [createOpen, setCreateOpen] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<CollectionTab>("all");

    const [sortOrder, setSortOrder] = useState<CollectionSortOrder>("newest");

    const [search, setSearch] = useState("");
    const [referenceTime] = useState(Date.now);

    const selectedResume = resumes.find((resume) => resume.id === resumeToDelete) ?? null;

    const normalizedSearch = search.trim().toLowerCase();

    const visibleResumes = resumes
        .filter((resume) => {
            if (!normalizedSearch) return true;

            return (
                resume.title.toLowerCase().includes(normalizedSearch) ||
                resume.targetRole.toLowerCase().includes(normalizedSearch)
            );
        })
        .filter((resume) => {
            if (activeTab === "all") return true;

            const updatedAt = new Date(resume.updatedAt).getTime();
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;

            return referenceTime - updatedAt <= thirtyDays;
        })
        .sort((a, b) => {
            const aTime = new Date(a.updatedAt).getTime();
            const bTime = new Date(b.updatedAt).getTime();

            return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
        });

    const confirmDelete = () => {
        if (!selectedResume) return;

        deleteResume(selectedResume.id);
        setResumeToDelete(null);
    };

    return (
        <div className="min-h-full bg-background lg:h-full lg:min-h-0 lg:overflow-hidden">
            <div className="px-4 lg:h-full lg:min-h-0">
                <div className="grid lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,28%)_minmax(0,1fr)]">
                    <CollectionAside
                        number="01"
                        title="RESUMES"
                        description={[
                            "Create, edit and manage your resumes.",
                            "Turn your experience into opportunities.",
                        ]}
                        footer={[
                            "Build your career.",
                            "Your story, your way.",
                        ]}
                        createLabel="New Resume"
                        onCreate={() => setCreateOpen(true)}
                    />

                    <section className="min-w-0 pt-4 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden lg:pl-5">
                        <CollectionToolbar
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            search={search}
                            onSearchChange={setSearch}
                            sortOrder={sortOrder}
                            onSortChange={setSortOrder}
                            resourceName="resumes"
                        />

                        <ScrollArea className="w-full lg:min-h-0 lg:flex-1">
                            <ResumeList
                                resumes={visibleResumes}
                                onEdit={(id) => navigate(`/resumes/${id}/edit`)}
                                onDuplicate={duplicateResume}
                                onDelete={setResumeToDelete}
                                onCreateNew={() => setCreateOpen(true)}
                            />

                            {visibleResumes.length === 0 && resumes.length > 0 && (
                                <p className="mt-5 text-sm text-muted-foreground">No resumes match your current filters.</p>
                            )}
                        </ScrollArea>
                    </section>
                </div>
            </div>

            <CreateResumeDialog open={createOpen} onOpenChange={setCreateOpen} />

            <DeleteResumeDialog resume={selectedResume} onClose={() => setResumeToDelete(null)} onConfirm={confirmDelete} />
        </div>
    );
};

export default ResumesPage;