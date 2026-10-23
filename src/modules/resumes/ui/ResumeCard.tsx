import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

import type { Resume } from "../model/resume.types";

import { ResumeThumbnail } from "./preview/ResumeThumbnail";

interface ResumeCardProps {
    resume: Resume;
    onEdit: (id: string) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
};

export function ResumeCard({ resume, onEdit, onDuplicate, onDelete }: ResumeCardProps) {
    const updated = new Date(resume.updatedAt).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    return (
        <Card className="group h-full gap-0 overflow-hidden rounded-sm border border-border bg-card py-0 shadow-none ring-0 transition-colors hover:border-foreground/50">
            <button
                type="button"
                onClick={() => onEdit(resume.id)}
                aria-label={`Edit ${resume.title}`}
                className="block w-full cursor-pointer text-left"
            >
                <ResumeThumbnail resume={resume} />
            </button>

            <CardContent className="flex flex-1 flex-col gap-0 px-3 py-3">
                <button
                    type="button"
                    onClick={() => onEdit(resume.id)}
                    className="w-full truncate text-left text-xs font-semibold tracking-tight text-foreground hover:underline cursor-pointer"
                    title={resume.title}
                >
                    {resume.title}
                </button>

                <p className="mt-1 truncate text-[10px] text-muted-foreground">
                    {resume.targetRole || "No target role"}
                </p>

                <div className="mt-auto flex items-end justify-between gap-2 pt-3">
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
                                    aria-label={`Actions for ${resume.title}`}
                                />
                            }
                        >
                            <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" side="bottom">
                            <DropdownMenuItem onClick={() => onEdit(resume.id)}>
                                <Pencil />
                                Edit resume
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => onDuplicate(resume.id)}>
                                <Copy />
                                Duplicate
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem variant="destructive" onClick={() => onDelete(resume.id)}>
                                <Trash2 />
                                Delete resume
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
};