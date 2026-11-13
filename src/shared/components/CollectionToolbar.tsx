import { Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

export type CollectionTab = "all" | "recent";
export type CollectionSortOrder = "newest" | "oldest";

interface CollectionToolbarProps {
    activeTab: CollectionTab;
    onTabChange: (tab: CollectionTab) => void;

    search: string;
    onSearchChange: (value: string) => void;

    sortOrder: CollectionSortOrder;
    onSortChange: (value: CollectionSortOrder) => void;

    resourceName: string;
};

const sortOptions = [
    { value: "newest", label: "Last edited" },
    { value: "oldest", label: "Oldest first" },
];

export function CollectionToolbar({ activeTab, onTabChange, search, onSearchChange, sortOrder, onSortChange, resourceName }: CollectionToolbarProps) {
    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 lg:shrink-0">
            <div className="flex items-center gap-1">
                {([{ value: "all", label: "All" }, { value: "recent", label: "Recently edited" }] as const).map((tab) => (
                    <Button
                        key={tab.value}
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-pressed={activeTab === tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={`rounded-none border-b-2 px-2 text-[11px] font-semibold ${activeTab === tab.value ? "border-foreground" : "border-transparent text-muted-foreground"}`}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                    <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search..."
                        aria-label={`Search ${resourceName}`}
                        className="h-8 w-36 rounded-sm bg-card pl-8 text-xs sm:w-42"
                    />
                </div>

                <Select
                    items={sortOptions}
                    value={sortOrder}
                    onValueChange={(value) => {
                        if (value === "newest" || value === "oldest") {
                            onSortChange(value);
                        };
                    }}
                >
                    <SelectTrigger size="sm" aria-label={`Sort ${resourceName}`} className="w-31 rounded-sm text-xs">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="newest">Last edited</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};