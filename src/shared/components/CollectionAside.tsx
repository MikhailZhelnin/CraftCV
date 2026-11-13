import { ArrowUpRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface CollectionAsideProps {
    number: string;
    title: string;
    description: string[];
    footer: string[];
    createLabel: string;
    onCreate: () => void;
};

export function CollectionAside({ number, title, description, footer, createLabel, onCreate }: CollectionAsideProps) {
    return (
        <aside className="@container relative flex min-h-88 flex-col overflow-hidden border-b border-border py-8 lg:h-full lg:min-h-0 lg:border-r lg:border-b-0 lg:pr-7">
            <div className="relative z-10">
                <span className="mb-4 inline-flex text-sm font-semibold uppercase">{number} — Your {title}</span>

                <h1 className="mb-4 font-display text-[clamp(3.25rem,7vw,5.5rem)] uppercase leading-[0.98]">
                    MY
                    <br />
                    {title}
                </h1>

                <p className="text-sm leading-relaxed text-foreground">
                    {description.map((line, index) => (
                        <span key={index} className="block">{line}</span>
                    ))}
                </p>

                <Button
                    type="button"
                    size="lg"
                    className="mt-6 gap-4 font-bold uppercase"
                    onClick={onCreate}
                >
                    {createLabel}
                    <ArrowUpRight className="size-5" />
                </Button>
            </div>

            <div className="relative z-10 mt-auto pt-20">
                <p className="max-w-35 text-xs leading-relaxed text-muted-foreground">
                    {footer.map((line, index) => (
                        <span key={index} className="block">{line}</span>
                    ))}
                </p>
            </div>

            <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 bottom-1 font-display leading-[0.8] text-foreground/6"
                style={{ fontSize: "clamp(4rem, calc(80cqw - 6rem), 24rem)" }}
            >
                {number}
            </span>
        </aside>
    );
};