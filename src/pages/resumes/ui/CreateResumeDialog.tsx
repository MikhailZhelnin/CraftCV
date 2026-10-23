import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText, UserRound } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import { createEmptyCareerData } from "@/modules/career-data";
import { useProfilesStore } from "@/modules/profiles";
import { useResumesStore, resumeMetadataSchema, ResumeTemplateSelector, DEFAULT_RESUME_TEMPLATE, type ResumeTemplateId } from "@/modules/resumes";

import { cn } from "cn";

type CreateStep = "details" | "template";

interface CreateResumeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function ResumeDialogArtwork({ templateId }: { templateId: ResumeTemplateId; }) {
    const isModern = templateId === "modern";

    return (
        <div aria-hidden="true" className="hidden min-h-0 flex-col items-center justify-center gap-6 overflow-hidden border-r border-border bg-[#ECEBE6] p-7 md:flex">
            <span className="self-start text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
                CRAFTCV / DOCUMENT STUDIO
            </span>

            <div className="flex flex-1 items-center justify-center">
                <div className="h-73 w-51.5 -rotate-2 border border-black/10 bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.10)] transition-transform duration-200">
                    {isModern ? (
                        <div className="mb-5 bg-slate-900 px-3 py-4">
                            <div className="h-2 w-24 bg-white" />
                            <div className="mt-2 h-1 w-16 bg-blue-300" />
                        </div>
                    ) : (
                        <div className="mb-5 border-b-2 border-slate-800 pb-4">
                            <div className="h-2 w-24 bg-slate-800" />
                            <div className="mt-2 h-1 w-16 bg-slate-400" />
                        </div>
                    )}

                    {[0, 1, 2].map((section) => (
                        <div key={section} className="mb-5 space-y-2">
                            <div className="flex items-center gap-2">
                                {isModern && (
                                    <span className="h-3 w-0.5 bg-blue-600" />
                                )}

                                <div className="h-1.5 w-16 bg-slate-700" />
                            </div>

                            <div className="space-y-1.5">
                                <div className="h-1 w-full bg-slate-200" />
                                <div className="h-1 w-11/12 bg-slate-200" />
                                <div className="h-1 w-4/5 bg-slate-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="self-start">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Your career.
                    <br />
                    In print.
                </p>

                <span className="mt-2 block text-[10px] text-muted-foreground">
                    MAKE YOUR NEXT MOVE ↗
                </span>
            </div>
        </div>
    );
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

    const isBlank = sourceProfileId === "blank";

    const profileOptions = profiles.map((profile) => ({ value: profile.id, label: profile.name }));

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

    const validateDetails = () => {
        const result = resumeMetadataSchema.safeParse({ title, targetRole });

        setTitleError(result.success ? "" : result.error.issues.find((issue) => issue.path[0] === "title")?.message ?? ""
        );

        setRoleError(result.success ? "" : result.error.issues.find((issue) => issue.path[0] === "targetRole")?.message ?? "");

        const selectedProfile = profiles.find((profile) => profile.id === sourceProfileId);

        if (!isBlank && !selectedProfile) {
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

    const sourceButtonClass = cn(
        "h-auto w-full justify-start gap-3 rounded-sm",
        "border border-border bg-card p-3 text-left",
        "whitespace-normal shadow-none transition-colors",
        "hover:bg-muted/40",
        "aria-pressed:border-primary",
        "focus-visible:ring-1 focus-visible:ring-primary"
    );

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn(
                    "grid h-[calc(100dvh-2rem)] max-h-195 w-[calc(100%-2rem)] min-h-0", "grid-cols-1 grid-rows-[minmax(0,1fr)]",
                    "gap-0 overflow-hidden", "rounded-sm border border-border",
                    "bg-card p-0", "shadow-[0_18px_60px_rgba(0,0,0,0.14)]",
                    "sm:max-w-215 md:grid-cols-[35%_minmax(0,1fr)]"
                )}
            >
                <ResumeDialogArtwork templateId={templateId} />

                <div className="flex h-full min-h-0 flex-col overflow-hidden">
                    <div className="shrink-0 px-6 pt-7 pr-14 sm:px-8 sm:pt-8 sm:pr-14">
                        <div className="mb-5 flex items-center gap-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                Step {step === "details" ? "01" : "02"} / 02
                            </span>

                            {/* <div className="flex items-center gap-1.5">
                                <span className="h-1 w-6 bg-foreground" />
                                <span className={`h-1 w-6 ${step === "template" ? "bg-foreground" : "bg-border"}`} />
                            </div> */}
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

                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 pb-7 sm:px-8">
                        {step === "details" ? (
                            <div className="space-y-5">
                                <div className="space-y-2" role="group" aria-label="Start from">
                                    <p className="text-xs font-semibold"> Start from</p>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        aria-pressed={isBlank}
                                        onClick={() => {
                                            setSourceProfileId("blank");
                                            setFormError("");
                                        }}
                                        className={sourceButtonClass}
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center bg-muted">
                                            <FileText className="size-4" />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block text-xs font-semibold">Blank canvas</span>
                                            <span className="mt-1 block text-[11px] font-normal text-muted-foreground">Start with a clean slate.</span>
                                        </span>

                                        {isBlank ? (
                                            <Check className="size-4 text-foreground" />
                                        ) : (
                                            <ArrowUpRight className="size-4 text-muted-foreground" />
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={profiles.length === 0}
                                        aria-pressed={!isBlank}
                                        onClick={() => {
                                            const firstProfile = profiles[0];
                                            if (!firstProfile) return;

                                            setSourceProfileId(firstProfile.id);
                                            setFormError("");
                                        }}
                                        className={sourceButtonClass}
                                    >
                                        <span className="flex size-9 shrink-0 items-center justify-center bg-muted">
                                            <UserRound className="size-4" />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block text-xs font-semibold">From existing profile</span>
                                            <span className="mt-1 block text-[11px] font-normal text-muted-foreground">Reuse your saved career information.</span>
                                        </span>

                                        {!isBlank ? (
                                            <Check className="size-4 text-foreground" />
                                        ) : (
                                            <ArrowUpRight className="size-4 text-muted-foreground" />
                                        )}
                                    </Button>

                                    {profiles.length === 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            No saved profiles yet. You can start
                                            with a blank resume.
                                        </p>
                                    )}
                                </div>

                                {!isBlank && (
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="resume-source">Choose profile</FieldLabel>

                                        <Select
                                            items={profileOptions}
                                            value={sourceProfileId}
                                            onValueChange={(value) => {
                                                if (typeof value === "string") {
                                                    setSourceProfileId(value);
                                                    setFormError("");
                                                }
                                            }}
                                        >
                                            <SelectTrigger id="resume-source" className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {profileOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                )}

                                <Field className="gap-2" data-invalid={!!titleError}>
                                    <FieldLabel htmlFor="resume-title">Resume Title</FieldLabel>

                                    <Input
                                        id="resume-title"
                                        value={title}
                                        placeholder="Senior Frontend CV"
                                        aria-invalid={!!titleError}
                                        onChange={(event) => {
                                            setTitle(event.target.value);
                                            setTitleError("");
                                        }}
                                    />

                                    {titleError && (
                                        <FieldError>{titleError}</FieldError>
                                    )}
                                </Field>

                                <Field className="gap-2" data-invalid={!!roleError}>
                                    <FieldLabel htmlFor="resume-role">
                                        Target Role
                                        <span className="font-normal text-muted-foreground">(optional)</span>
                                    </FieldLabel>

                                    <Input
                                        id="resume-role"
                                        value={targetRole}
                                        placeholder="Senior React Developer"
                                        aria-invalid={!!roleError}
                                        onChange={(event) => {
                                            setTargetRole(event.target.value);
                                            setRoleError("");
                                        }}
                                    />

                                    {roleError && (
                                        <FieldError>{roleError}</FieldError>
                                    )}
                                </Field>

                                {formError && (
                                    <p role="alert" className="text-sm text-destructive">{formError}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <ResumeTemplateSelector value={templateId} onChange={setTemplateId} />

                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    You can change the template later without
                                    losing your resume content.
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="shrink-0 border-t border-border px-6 py-4 sm:px-8">
                        <Button
                            type="button"
                            variant="outline"
                            className="min-w-28"
                            onClick={() => {
                                if (step === "template") {
                                    setStep("details");
                                } else {
                                    handleOpenChange(false);
                                }
                            }}
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
        </Dialog >
    );
};