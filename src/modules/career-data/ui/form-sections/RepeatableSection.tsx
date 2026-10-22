import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/ui/accordion";

interface RepeatableSectionProps {
    title: string;
    description: string;
    addLabel: string;
    emptyMessage: string;
    count: number;
    maxItems: number;
    children: ReactNode;
    headerActions?: ReactNode;
    onAdd: () => void;
};

export function RepeatableSection({ title, description, addLabel, emptyMessage, count, maxItems, children, headerActions, onAdd }: RepeatableSectionProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="mt-2">{description}</CardDescription>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                        {headerActions}

                        <Button
                            type="button"
                            variant="outline"
                            disabled={count >= maxItems}
                            onClick={onAdd}
                        >
                            <Plus className="size-4" />
                            {addLabel}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {count === 0 && (
                    <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
                )}

                {children}
            </CardContent>
        </Card>
    );
};

interface RepeatableItemProps {
    title: string;
    subtitle: string;
    index: number;
    total: number;
    children: ReactNode;
    isOpen: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onRemove: () => void;
    onOpenChange: (open: boolean) => void;
};

export function RepeatableItem({ title, subtitle, index, total, children, isOpen, onMoveUp, onMoveDown, onRemove, onOpenChange }: RepeatableItemProps) {
    return (
        <Accordion
            value={isOpen ? ["details"] : []}
            onValueChange={(value) => onOpenChange(value.includes("details"))}
            defaultValue={["details"]}
        >
            <AccordionItem value="details" className="rounded-lg border px-4">
                <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="text-left">
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="space-y-4 pb-4">
                    {children}

                    <div className="flex flex-wrap justify-between gap-3 border-t pt-4">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={index === 0}
                                onClick={onMoveUp}
                            >
                                Move up
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={index === total - 1}
                                onClick={onMoveDown}
                            >
                                Move down
                            </Button>
                        </div>

                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={onRemove}
                        >
                            <Trash2 className="size-4" />
                            Remove
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};