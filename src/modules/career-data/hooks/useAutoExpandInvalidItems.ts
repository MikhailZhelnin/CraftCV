import { useEffect, useRef, useState } from "react";

type ItemWithId = {
    id: string;
};

interface Options {
    fields: readonly ItemWithId[];
    sectionErrors: unknown;
    submitCount: number;
};

export function getInvalidItemIds(fields: readonly ItemWithId[], sectionErrors: unknown): string[] {
    if (!Array.isArray(sectionErrors)) {
        return [];
    };

    return fields.flatMap((field, index) =>
        sectionErrors[index] ? [field.id] : []
    );
};

export function useAutoExpandInvalidItems({ fields, sectionErrors, submitCount }: Options) {
    const [openIds, setOpenIds] = useState<string[]>(() => fields.map((field) => field.id));

    const knownIds = useRef(new Set(fields.map((field) => field.id)));

    const lastSubmitCount = useRef(0);

    useEffect(() => {
        const currentIds = new Set(fields.map((field) => field.id));

        const addedIds = fields.filter((field) => !knownIds.current.has(field.id)).map((field) => field.id);

        knownIds.current = currentIds;

        setOpenIds((previous) => {
            const next = [
                ...previous.filter((id) => currentIds.has(id)),
                ...addedIds,
            ];

            if (next.length === previous.length && next.every((id, index) => id === previous[index])) {
                return previous;
            };

            return next;
        });
    }, [fields]);

    useEffect(() => {
        if (submitCount === 0 || submitCount === lastSubmitCount.current) {
            return;
        };

        lastSubmitCount.current = submitCount;

        const invalidIds = getInvalidItemIds(fields, sectionErrors);

        setOpenIds((previous) => {
            const next = [
                ...new Set([...previous, ...invalidIds]),
            ];

            return next.length === previous.length ? previous : next;
        });
    }, [fields, sectionErrors, submitCount]);

    const isOpen = (id: string) => openIds.includes(id);

    const setItemOpen = (id: string, open: boolean) => {
        setOpenIds((previous) => {
            if (open) {
                return previous.includes(id) ? previous : [...previous, id];
            }

            return previous.filter((item) => item !== id);
        });
    };

    return {
        isOpen,
        setItemOpen,
    };
};