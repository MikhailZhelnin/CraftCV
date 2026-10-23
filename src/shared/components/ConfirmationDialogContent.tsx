import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

type ConfirmationDialogContentProps = {
    icon: ReactNode;
    title: string;
    description: ReactNode;
    cancelText: string;
    confirmText: string;
    confirmVariant?: ComponentProps<typeof Button>["variant"];
    onCancel: () => void;
    onConfirm: () => void;
};

export function ConfirmationDialogContent({ icon, title, description, cancelText, confirmText, confirmVariant = "default", onCancel, onConfirm }: ConfirmationDialogContentProps) {
    return (
        <DialogContent className="w-[calc(100%-2rem)] gap-0 rounded-sm border border-border bg-card p-6 shadow-[0_16px_48px_rgba(0,0,0,0.12)] sm:max-w-115 sm:p-8">
            <div className="grid grid-cols-[36px_minmax(0,1fr)] gap-x-5 gap-y-6">
                <div aria-hidden="true" className="mt-0.5 flex size-9 items-start justify-center text-foreground">
                    {icon}
                </div>

                <DialogHeader className="gap-2 pr-5 text-left">
                    <DialogTitle className="text-base leading-5 font-semibold tracking-tight">{title}</DialogTitle>
                    <DialogDescription className="text-[13px] leading-5 text-muted-foreground">{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="col-span-2 flex flex-col-reverse gap-3 border-0 pt-0 sm:col-span-1 sm:col-start-2 sm:flex-row sm:justify-start">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="h-10 min-w-0 flex-1 px-3 text-xs"
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type="button"
                        variant={confirmVariant}
                        onClick={onConfirm}
                        className="h-10 min-w-0 flex-1 px-3 text-xs"
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </div>
        </DialogContent>
    );
};