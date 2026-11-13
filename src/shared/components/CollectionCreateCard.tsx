import { Plus } from "lucide-react";

interface CollectionCreateCardProps {
    title: string;
    description: string;
    onClick: () => void;
};

export function CollectionCreateCard({ title, description, onClick }: CollectionCreateCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex h-full min-h-65 cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-card/40 px-4 text-center transition-colors hover:border-foreground/50 hover:bg-card"
        >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform">
                <Plus className="size-6" />
            </span>

            <span className="mt-4 text-sm font-semibold text-foreground">{title}</span>

            <span className="mt-2 max-w-30 text-[11px] leading-relaxed text-muted-foreground">{description}</span>
        </button>
    );
};