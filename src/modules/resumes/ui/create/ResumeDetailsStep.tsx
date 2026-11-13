import { ArrowUpRight, Check, FileText, UserRound } from "lucide-react";

import type { ProfileSummary } from "@/modules/profiles";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import { cn } from "cn";

interface ResumeDetailsStepProps {
    profiles: ProfileSummary[];

    sourceProfileId: string;
    onSourceProfileChange: (id: string) => void;

    title: string;
    onTitleChange: (value: string) => void;

    targetRole: string;
    onTargetRoleChange: (value: string) => void;

    titleError: string;
    roleError: string;
    formError: string;
};

const sourceButtonClass = cn(
    "h-auto w-full justify-start gap-3 rounded-sm",
    "border border-border bg-card p-3 text-left",
    "whitespace-normal shadow-none transition-colors",
    "hover:bg-muted/40",
    "aria-pressed:border-primary",
    "focus-visible:ring-1 focus-visible:ring-primary"
);

export function ResumeDetailsStep({
    profiles,
    sourceProfileId,
    onSourceProfileChange,
    title,
    onTitleChange,
    targetRole,
    onTargetRoleChange,
    titleError,
    roleError,
    formError,
}: ResumeDetailsStepProps) {
    const isBlank = sourceProfileId === "blank";

    const profileOptions = profiles.map((profile) => ({
        value: profile.id,
        label: profile.name,
    }));

    return (
        <div className="space-y-5">
            <div className="space-y-2" role="group" aria-label="Start from">
                <p className="text-xs font-semibold">Start from</p>

                <Button
                    type="button"
                    variant="outline"
                    aria-pressed={isBlank}
                    onClick={() => onSourceProfileChange("blank")}
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
                        if (firstProfile) {
                            onSourceProfileChange(firstProfile.id);
                        };
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
                                onSourceProfileChange(value);
                            };
                        }}
                    >
                        <SelectTrigger id="resume-source" className="w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {profileOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
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
                    onChange={(event) =>
                        onTitleChange(event.target.value)
                    }
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
                    onChange={(event) =>
                        onTargetRoleChange(event.target.value)
                    }
                />

                {roleError && (
                    <FieldError>{roleError}</FieldError>
                )}
            </Field>

            {formError && (
                <p role="alert" className="text-sm text-destructive">{formError}</p>
            )}
        </div>
    );
};