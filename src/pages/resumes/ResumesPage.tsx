import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowUpRight, Plus, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import { DeleteResumeDialog, ResumeCard, useResumesStore } from "@/modules/resumes";
import { CreateResumeDialog } from "./ui/CreateResumeDialog";
import { ScrollArea } from "@/shared/ui/scroll-area";

type ResumeTab = "all" | "recent";
type SortOrder = "newest" | "oldest";

const sortOptions = [
    { value: "newest", label: "Last edited" },
    { value: "oldest", label: "Oldest first" },
];

const ResumesPage = () => {
    const navigate = useNavigate();

    const resumes = useResumesStore((state) => state.resumes);
    const duplicateResume = useResumesStore((state) => state.duplicateResume);
    const deleteResume = useResumesStore((state) => state.deleteResume);

    const [createOpen, setCreateOpen] = useState(false);
    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<ResumeTab>("all");
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
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
                    <aside className="@container relative flex min-h-88 flex-col overflow-hidden border-b border-border py-8 lg:h-full lg:min-h-0 lg:border-r lg:border-b-0 lg:pr-7">
                        <div className="relative z-10">
                            <span className="inline-flex mb-4 text-sm font-semibold uppercase">01 — Your Resumes</span>

                            <h1 className="mb-4 font-display text-[clamp(3.25rem,7vw,5.5rem)] uppercase leading-[0.98]">
                                MY
                                <br />
                                RESUMES
                            </h1>

                            <p className=" text-sm leading-relaxed text-foreground">
                                Create, edit and manage your resumes.
                                <br />
                                Turn your experience into opportunities.
                            </p>

                            <Button
                                type="button"
                                size="lg"
                                className="mt-6 gap-4 font-bold uppercase"
                                onClick={() => setCreateOpen(true)}
                            >
                                New Resume
                                <ArrowUpRight className="size-5" />
                            </Button>
                        </div>

                        <div className="relative z-10 mt-auto pt-20">
                            <p className="max-w-35 text-xs leading-relaxed text-muted-foreground">
                                Build your career.
                                <br />
                                Your story, your way.
                            </p>
                        </div>

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 bottom-1 font-display leading-[0.8] text-foreground/6"
                            style={{ fontSize: "clamp(4rem, calc(80cqw - 6rem), 24rem)" }}
                        >
                            01
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
                            <div className="grid auto-rows-fr grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-4">
                                {visibleResumes.map((resume) => (
                                    <ResumeCard
                                        key={resume.id}
                                        resume={resume}
                                        onEdit={(id) => navigate(`/resumes/${id}/edit`)}
                                        onDuplicate={duplicateResume}
                                        onDelete={setResumeToDelete}
                                    />
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setCreateOpen(true)}
                                    className="group flex h-full min-h-65 flex-col items-center justify-center border border-dashed border-border bg-card/40 px-4 text-center transition-colors hover:border-foreground/50 hover:bg-card cursor-pointer"
                                >
                                    <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform">
                                        <Plus className="size-6" />
                                    </span>
                                    <span className="mt-4 text-sm font-semibold text-foreground">Create new resume</span>
                                    <span className="mt-2 max-w-25 text-[11px] leading-relaxed text-muted-foreground">Start from scratch or use a profile.</span>
                                </button>
                            </div>

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