import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Card, CardFooter, CardContent, CardHeader } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

import type { Profile } from "../../model/profile.types";
import { calculateProfileCompleteness } from "../../model/profile.completion";
import { getProfileAccentSwatchClassName, resolveProfileAccentTone } from "../../model/profile.accent";

import { ProfileCompletion } from "../completion/ProfileCompletion";

import { cn } from "cn";

interface ProfileCardProps {
    profile: Profile;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

export function ProfileCard({ profile, onEdit, onDelete }: ProfileCardProps) {
    const updated = new Date(profile.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    const completion = calculateProfileCompleteness(profile.careerData);

    const accentTone = resolveProfileAccentTone(profile);
    const accentSwatchClassName = getProfileAccentSwatchClassName(accentTone);

    return (
        <Card className="p-3 h-full overflow-hidden rounded-sm border border-border bg-card shadow-none ring-0 transition-colors hover:border-foreground/50">
            <CardHeader className="p-0">
                <button
                    type="button"
                    onClick={() => onEdit(profile.id)}
                    aria-label={`Edit ${profile.name}`}
                    className={cn(
                        "block h-18 w-18 shrink-0 rounded-xs border border-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] cursor-pointer text-left",
                        accentSwatchClassName
                    )}
                />
            </CardHeader>

            <CardContent className="p-0 flex flex-1 flex-col gap-0">
                <button
                    type="button"
                    onClick={() => onEdit(profile.id)}
                    className="mb-1 w-full truncate text-left text-xs font-semibold tracking-tight text-foreground hover:underline cursor-pointer"
                    title={profile.name}
                >
                    {profile.name}
                </button>

                <p className="truncate text-[10px] text-muted-foreground">
                    {profile.description || "No description"}
                </p>

                <div className="mt-auto pt-5">
                    <ProfileCompletion result={completion} />
                </div>
            </CardContent>

            <CardFooter className="p-0 mt-auto justify-between">
                <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground">Updated {updated}</p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Actions for ${profile.name}`}
                            />
                        }
                    >
                        <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" side="bottom">
                        <DropdownMenuItem onClick={() => onEdit(profile.id)}>
                            <Pencil />
                            Edit profile
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem variant="destructive" onClick={() => onDelete(profile.id)}>
                            <Trash2 />
                            Delete profile
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    );
};