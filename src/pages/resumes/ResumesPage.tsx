import { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, Copy, Pencil, Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

import { useResumesStore } from "@/modules/resumes";

import { CreateResumeDialog } from "./ui/CreateResumeDialog";

const ResumesPage = () => {
    const navigate = useNavigate();

    const resumes = useResumesStore((state) => state.resumes);

    const duplicateResume = useResumesStore((state) => state.duplicateResume);
    const deleteResume = useResumesStore((state) => state.deleteResume);

    const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

    const selectedResume = resumes.find((resume) => resume.id === resumeToDelete);

    const confirmDelete = () => {
        if (!resumeToDelete) return;

        deleteResume(resumeToDelete);
        setResumeToDelete(null);
    };

    return (
        <div className="py-4">
            <div className="t-container">
                <div>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold"> My Resumes</h1>
                            <p className="text-muted-foreground">Manage your resumes and create new ones.</p>
                        </div>

                        <CreateResumeDialog />
                    </div>

                    {resumes.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                                <FileText className="size-12 text-muted-foreground" />

                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold">No resumes yet</h2>
                                    <p className="text-sm text-muted-foreground">Create your first resume to get started.</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {resumes.map((resume) => (
                                <Card key={resume.id}>
                                    <CardHeader>
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-muted p-3">
                                                <FileText className="size-6" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <CardTitle className="truncate">{resume.title}</CardTitle>
                                                <CardDescription className="mt-2">{resume.targetRole || "No target role"}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <p className="text-xs text-muted-foreground">
                                            Updated{" "}
                                            {new Date(resume.updatedAt).toLocaleDateString("en-GB")}
                                        </p>

                                        <div className="flex flex-wrap gap-2 border-t pt-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => navigate(`/resumes/${resume.id}/edit`)}
                                            >
                                                <Pencil className="size-4" />
                                                Edit
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => duplicateResume(resume.id)}
                                            >
                                                <Copy className="size-4" />
                                                Duplicate
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setResumeToDelete(resume.id)}
                                            >
                                                <Trash2 className="size-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    <Dialog
                        open={resumeToDelete !== null}
                        onOpenChange={(open) => {
                            if (!open) setResumeToDelete(null);
                        }}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Resume? </DialogTitle>

                                <DialogDescription>
                                    Are you sure you want to delete{" "}
                                    {selectedResume?.title}?
                                    This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setResumeToDelete(null)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={confirmDelete}
                                >
                                    Delete Resume
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ResumesPage;