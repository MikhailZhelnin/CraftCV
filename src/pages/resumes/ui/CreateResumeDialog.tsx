import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import { createEmptyCareerData } from "@/modules/career-data";
import { useProfilesStore } from "@/modules/profiles";
import { useResumesStore, resumeMetadataSchema, ResumeTemplateSelector, DEFAULT_RESUME_TEMPLATE, type ResumeTemplateId } from "@/modules/resumes";

export function CreateResumeDialog() {
    const navigate = useNavigate();

    const profiles = useProfilesStore((state) => state.profiles);

    const createResume = useResumesStore((state) => state.createResume);

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [targetRole, setTargetRole] = useState("");

    const [sourceProfileId, setSourceProfileId] = useState("blank");

    const [templateId, setTemplateId] = useState<ResumeTemplateId>(DEFAULT_RESUME_TEMPLATE);

    const [titleError, setTitleError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [formError, setFormError] = useState("");

    const profileOptions = [
        { value: "blank", label: "Start from scratch" },
        ...profiles.map((profile) => ({
            value: profile.id,
            label: profile.name,
        })),
    ];

    const resetForm = () => {
        setTitle("");
        setTargetRole("");
        setSourceProfileId("blank");
        setTemplateId(DEFAULT_RESUME_TEMPLATE);
        setTitleError("");
        setRoleError("");
        setFormError("");
    };

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (!nextOpen) {
            resetForm();
        };
    };

    const handleCreate = () => {
        const result = resumeMetadataSchema.safeParse({ title, targetRole });

        if (!result.success) {
            setTitleError(result.error.issues.find((issue) => issue.path[0] === "title")?.message ?? "");
            setRoleError(result.error.issues.find((issue) => issue.path[0] === "targetRole")?.message ?? "");
            return;
        };

        const selectedProfile = profiles.find((profile) => profile.id === sourceProfileId);

        if (sourceProfileId !== "blank" && !selectedProfile) {
            setFormError("Selected profile was not found");
            return;
        };

        const id = createResume({
            title: result.data.title,
            targetRole: result.data.targetRole,
            sourceProfileId: selectedProfile?.id ?? null,
            careerData: selectedProfile ? selectedProfile.careerData : createEmptyCareerData(),
            templateId,
        });

        handleOpenChange(false);

        navigate(`/resumes/${id}/edit`);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <Plus className="size-4" />
                Create Resume
            </Button>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>

                        <DialogDescription>
                            Start from scratch or use an
                            existing professional profile.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Field data-invalid={!!titleError}>
                            <FieldLabel htmlFor="resume-title">Resume Title</FieldLabel>

                            <Input
                                id="resume-title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setTitleError("");
                                }}
                                placeholder="Senior Frontend CV"
                                aria-invalid={!!titleError}
                            />

                            {titleError && (
                                <FieldError>{titleError}</FieldError>
                            )}
                        </Field>

                        <Field data-invalid={!!roleError}>
                            <FieldLabel htmlFor="resume-role">Target Role</FieldLabel>

                            <Input
                                id="resume-role"
                                value={targetRole}
                                onChange={(e) => {
                                    setTargetRole(e.target.value);
                                    setRoleError("");
                                }}
                                placeholder="Senior React Developer"
                                aria-invalid={!!roleError}
                            />

                            {roleError && (
                                <FieldError>{roleError}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="resume-source">Start From</FieldLabel>

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
                                        <SelectItem key={option.value} value={option.value} >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Resume Template</FieldLabel>

                            <ResumeTemplateSelector value={templateId} onChange={setTemplateId} />
                        </Field>

                        {formError && (
                            <p className="text-sm text-destructive">{formError}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={handleCreate}
                        >
                            Create Resume
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};