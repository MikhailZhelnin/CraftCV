import { useFormContext, useWatch } from "react-hook-form";
import { BriefcaseBusiness, GraduationCap, FolderGit2, Wrench } from "lucide-react";

import type { ProfileDraft } from "../model/profile.types";

export function ProfileOverview() {
    const { control } = useFormContext<ProfileDraft>();

    const profileName = useWatch({ control, name: "name" });
    const description = useWatch({ control, name: "description" });
    const careerData = useWatch({ control, name: "careerData" });

    const fullName = careerData.personal.fullName.trim();
    const jobTitle = careerData.personal.jobTitle.trim();

    const initials = fullName ? fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() : "CV";

    const stats = [
        {
            label: "Experience",
            value: careerData.experience.length,
            icon: BriefcaseBusiness,
        },
        {
            label: "Education",
            value: careerData.education.length,
            icon: GraduationCap,
        },
        {
            label: "Skills",
            value: careerData.skills.length,
            icon: Wrench,
        },
        {
            label: "Projects",
            value: careerData.projects.length,
            icon: FolderGit2,
        },
    ];

    return (
        <div className="space-y-5">
            <div className="border-b border-border pb-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.08em]">Profile Overview</h2>
                <p className="mt-1 text-xs text-muted-foreground">Updates as you edit</p>
            </div>

            <div className="border border-border bg-card p-5">
                <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground">
                    {initials}
                </div>

                <h3 className="wrap-break-word text-xl font-semibold tracking-tight">{fullName || "Your Name"}</h3>

                <p className="mt-1 text-sm text-muted-foreground"> {jobTitle || "Professional title"}</p>

                <div className="mt-5 border-t border-border pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Profile</p>
                    <p className="mt-1 text-sm font-semibold">{profileName || "Untitled Profile"}</p>
                    {description && (
                        <p className="mt-2 wrap-break-word text-xs leading-relaxed text-muted-foreground">{description}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="border border-border bg-card p-4">
                        <Icon className="mb-4 size-4 text-muted-foreground" />

                        <p className="font-display text-3xl leading-none">{value}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{label}</p>
                    </div>
                ))}
            </div>

            <div className="border-t border-border pt-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                    Your profile is a reusable source of career
                    information. Create tailored resumes without
                    changing the original profile.
                </p>
            </div>
        </div>
    );
};