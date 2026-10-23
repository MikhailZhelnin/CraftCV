import { Dialog } from "@/shared/ui/dialog";

import { ConfirmationDialogContent } from "./ConfirmationDialogContent";
import { CircleAlert } from "lucide-react";

interface Props {
    open: boolean;
    onStay: () => void;
    onLeave: () => void;
};

export function UnsavedChangesDialog({ open, onStay, onLeave }: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) onStay();
            }}
        >
            <ConfirmationDialogContent
                icon={<CircleAlert className="size-9" strokeWidth={1.7} />}
                title="Unsaved Changes"
                description={
                    <>
                        You have unsaved changes.

                        <span className="mt-1 block">
                            Are you sure you want to leave?
                            Your changes will be lost.
                        </span>
                    </>
                }
                cancelText="Stay on page"
                confirmText="Leave anyway"
                onCancel={onStay}
                onConfirm={onLeave}
            />
        </Dialog>
    );
};