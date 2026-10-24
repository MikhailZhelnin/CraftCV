import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Card, CardFooter, CardContent, CardHeader } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

import type { ProfileSummary } from "../model/profile.types";

interface ProfileCardProps {
    profile: ProfileSummary;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

export function ProfileCard({ profile, onEdit, onDelete }: ProfileCardProps) {
    const updated = new Date(profile.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    return (
        <Card className="p-3 h-full overflow-hidden rounded-sm border border-border bg-card shadow-none ring-0 transition-colors hover:border-foreground/50">
            <CardHeader className="p-0">
                <button
                    type="button"
                    onClick={() => onEdit(profile.id)}
                    aria-label={`Edit ${profile.name}`}
                    className="block w-20 h-20 bg-amber-100 cursor-pointer text-left"
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

                <div>
                    <p className="text-xs">100% complete</p>
                    <div className="w-full h-0.5 bg-blue-200"/>
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