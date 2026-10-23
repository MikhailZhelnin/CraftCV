import { Trash2 } from "lucide-react";

import { Dialog } from "@/shared/ui/dialog";
import { ConfirmationDialogContent } from "@/shared/components/ConfirmationDialogContent";

import type { Resume } from "../model/resume.types";

interface DeleteResumeDialogProps {
    resume: Resume | null;
    onClose: () => void;
    onConfirm: () => void;
};

export function DeleteResumeDialog({ resume, onClose, onConfirm }: DeleteResumeDialogProps) {
    return (
        <Dialog
            open={resume !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <ConfirmationDialogContent
                icon={<Trash2 className="size-9" strokeWidth={1.7} />}
                title="Delete Resume"
                description={
                    <>
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-foreground">“{resume?.title}”?</span>
                        <span className="mt-1 block">This action cannot be undone.</span>
                    </>
                }
                cancelText="Cancel"
                confirmText="Delete forever"
                onCancel={onClose}
                onConfirm={onConfirm}
            />
        </Dialog>
    );
};