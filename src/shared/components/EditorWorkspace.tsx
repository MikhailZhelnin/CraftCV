import { useEffect, useRef, type ReactNode } from "react";

import { ScrollArea } from "@/shared/ui/scroll-area";

interface EditorWorkspaceProps {
    navigation: ReactNode;
    rightPanel: ReactNode;
    children: ReactNode;
    contentKey?: string;
};

export function EditorWorkspace({ navigation, rightPanel, children, contentKey }: EditorWorkspaceProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.scrollTop = 0;
        };
    }, [contentKey]);

    return (
        <div className="grid min-w-0 grid-cols-1 xl:h-full xl:min-h-0 xl:grid-cols-[280px_minmax(0,1fr)_minmax(340px,0.95fr)]">
            <ScrollArea className="min-w-0 border-b border-border xl:min-h-0 xl:border-r xl:border-b-0">
                <aside aria-label="Editor navigation" className="p-4">
                    {navigation}
                </aside>
            </ScrollArea>

            <ScrollArea viewportRef={editorRef} className="min-w-0 xl:min-h-0">
                <section aria-label="Editor fields" className="min-w-0 p-5">
                    {children}
                </section>
            </ScrollArea>

            <ScrollArea className="min-w-0 border-t border-border bg-muted/30 xl:min-h-0 xl:border-t-0 xl:border-l">
                <aside aria-label="Editor overview" className="p-5">
                    {rightPanel}
                </aside>
            </ScrollArea>
        </div>
    );
};