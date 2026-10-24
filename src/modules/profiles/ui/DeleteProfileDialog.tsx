import { Trash2 } from "lucide-react";

import { Dialog } from "@/shared/ui/dialog";
import { ConfirmationDialogContent } from "@/shared/components/ConfirmationDialogContent";

import type { Profile } from "../model/profile.types";

interface DeleteProfileDialogProps {
    profile: Profile | null;
    onClose: () => void;
    onConfirm: () => void;
};

export function DeleteProfileDialog({ profile, onClose, onConfirm }: DeleteProfileDialogProps) {
    return (
        <Dialog
            open={profile !== null}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <ConfirmationDialogContent
                icon={<Trash2 className="size-9" strokeWidth={1.7} />}
                title="Delete Profile"
                description={
                    <>
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-foreground">“{profile?.name}”?</span>
                        <span className="mt-1 block">This action cannot be undone.</span>
                    </>
                }
                cancelText="Cancel"
                confirmText="Delete forever"
                confirmVariant="destructive"
                onCancel={onClose}
                onConfirm={onConfirm}
            />
        </Dialog>
    );
};