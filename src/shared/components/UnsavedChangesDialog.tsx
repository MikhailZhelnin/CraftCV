import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

import { Button } from "@/shared/ui/button";

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
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Unsaved changes</DialogTitle>

                    <DialogDescription>
                        You have unsaved changes.
                        If you leave this page now,
                        those changes will be lost.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onStay}
                    >
                        Continue editing
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onLeave}
                    >
                        Leave without saving
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};