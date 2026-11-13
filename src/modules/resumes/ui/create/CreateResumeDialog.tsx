import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "cn";

import { createEmptyCareerData } from "@/modules/career-data";
import { useProfilesStore } from "@/modules/profiles";

import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";

import { useResumesStore } from "../../model/resumes.store";
import { resumeMetadataSchema } from "../../model/resume.schema";
import { DEFAULT_RESUME_TEMPLATE, type ResumeTemplateId } from "../../model/resume.templates";

import { ResumeDialogArtwork } from "./ResumeDialogArtwork";
import { ResumeDetailsStep } from "./ResumeDetailsStep";
import { ResumeTemplateStep } from "./ResumeTemplateStep";

type CreateStep = "details" | "template";

interface CreateResumeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function CreateResumeDialog({ open, onOpenChange }: CreateResumeDialogProps) {
    const navigate = useNavigate();

    const profiles = useProfilesStore((state) => state.profiles);
    const createResume = useResumesStore((state) => state.createResume);

    const [step, setStep] = useState<CreateStep>("details");

    const [title, setTitle] = useState("");
    const [targetRole, setTargetRole] = useState("");
    const [sourceProfileId, setSourceProfileId] = useState("blank");

    const [templateId, setTemplateId] = useState<ResumeTemplateId>(DEFAULT_RESUME_TEMPLATE);

    const [titleError, setTitleError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [formError, setFormError] = useState("");

    const resetForm = () => {
        setStep("details");
        setTitle("");
        setTargetRole("");
        setSourceProfileId("blank");
        setTemplateId(DEFAULT_RESUME_TEMPLATE);
        setTitleError("");
        setRoleError("");
        setFormError("");
    };

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            resetForm();
        };

        onOpenChange(nextOpen);
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        setTitleError("");
    };

    const handleRoleChange = (value: string) => {
        setTargetRole(value);
        setRoleError("");
    };

    const handleSourceChange = (id: string) => {
        setSourceProfileId(id);
        setFormError("");
    };

    const validateDetails = () => {
        const result = resumeMetadataSchema.safeParse({ title, targetRole });

        setTitleError(result.success ? "" : result.error.issues.find((issue) => issue.path[0] === "title")?.message ?? "");

        setRoleError(result.success ? "" : result.error.issues.find((issue) => issue.path[0] === "targetRole")?.message ?? "");

        const selectedProfile = sourceProfileId === "blank" ? undefined : profiles.find((profile) => profile.id === sourceProfileId);

        if (sourceProfileId !== "blank" && !selectedProfile) {
            setFormError("Selected profile was not found.");
            return null;
        };

        setFormError("");

        if (!result.success) return null;

        return {
            metadata: result.data,
            selectedProfile,
        };
    };

    const handleContinue = () => {
        const details = validateDetails();

        if (!details) return;

        setStep("template");
    };

    const handleBack = () => {
        if (step === "template") {
            setStep("details");
        } else {
            handleOpenChange(false);
        };
    };

    const handleCreate = () => {
        const details = validateDetails();

        if (!details) {
            setStep("details");
            return;
        };

        const { metadata, selectedProfile } = details;

        const id = createResume({
            title: metadata.title,
            targetRole: metadata.targetRole,
            sourceProfileId: selectedProfile?.id ?? null,
            careerData: selectedProfile ? selectedProfile.careerData : createEmptyCareerData(),
            templateId,
        });

        handleOpenChange(false);
        navigate(`/resumes/${id}/edit`);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn(
                    "grid h-[calc(100dvh-2rem)] max-h-195 w-[calc(100%-2rem)] min-h-0",
                    "grid-cols-1 grid-rows-[minmax(0,1fr)]",
                    "gap-0 overflow-hidden rounded-sm border border-border",
                    "bg-card p-0 shadow-[0_18px_60px_rgba(0,0,0,0.14)]",
                    "sm:max-w-215 md:grid-cols-[35%_minmax(0,1fr)]"
                )}
            >
                <ResumeDialogArtwork templateId={templateId} />

                <div className="flex h-full min-h-0 flex-col overflow-hidden">
                    <div className="shrink-0 px-6 pt-7 pr-14 sm:px-8 sm:pt-8 sm:pr-14">
                        <div className="mb-5">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                Step {step === "details" ? "01" : "02"} / 02
                            </span>
                        </div>

                        <DialogHeader className="gap-2">
                            <DialogTitle className="text-2xl font-semibold tracking-tight">
                                {step === "details" ? "Create Resume" : "Choose Template"}
                            </DialogTitle>
                            <DialogDescription className="text-sm leading-relaxed">
                                {step === "details" ? "How would you like to start?" : "Select a design for your resume. You can change it later."}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <ScrollArea className="min-h-0 min-w-0 flex-1">
                        <div className="px-6 pt-6 pb-7 pr-8 sm:pl-8 sm:pr-10">
                            {step === "details" ? (
                                <ResumeDetailsStep
                                    profiles={profiles}
                                    sourceProfileId={sourceProfileId}
                                    onSourceProfileChange={handleSourceChange}
                                    title={title}
                                    onTitleChange={handleTitleChange}
                                    targetRole={targetRole}
                                    onTargetRoleChange={handleRoleChange}
                                    titleError={titleError}
                                    roleError={roleError}
                                    formError={formError}
                                />
                            ) : (
                                <ResumeTemplateStep
                                    templateId={templateId}
                                    onTemplateChange={setTemplateId}
                                />
                            )}
                        </div>
                    </ScrollArea>

                    <DialogFooter className="shrink-0 border-t border-border px-6 py-4 sm:px-8">
                        <Button
                            type="button"
                            variant="outline"
                            className="min-w-28"
                            onClick={handleBack}
                        >
                            {step === "template" && (
                                <ArrowLeft className="size-4" />
                            )}

                            {step === "details" ? "Cancel" : "Back"}
                        </Button>

                        <Button
                            type="button"
                            className="min-w-36 gap-3 font-semibold"
                            onClick={step === "details" ? handleContinue : handleCreate}
                        >
                            {step === "details" ? "Continue" : "Create Resume"}

                            <ArrowRight className="size-4" />
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};