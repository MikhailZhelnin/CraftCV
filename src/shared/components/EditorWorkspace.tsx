import { useEffect, useRef, type ReactNode } from "react";

interface EditorWorkspaceProps {
    navigation: ReactNode;
    rightPanel: ReactNode;
    children: ReactNode;
    contentKey?: string;
};

export function EditorWorkspace({ navigation, rightPanel, children, contentKey }: EditorWorkspaceProps) {
    const editorRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.scrollTop = 0;
        };
    }, [contentKey]);

    return (
        <div className="grid min-w-0 grid-cols-1 xl:h-full xl:min-h-0 xl:grid-cols-[280px_minmax(0,1fr)_minmax(340px,0.95fr)]">
            <aside aria-label="Editor navigation" className="min-w-0 border-b border-border p-4 xl:min-h-0 xl:overflow-y-auto xl:border-r xl:border-b-0">
                {navigation}
            </aside>

            <section ref={editorRef} aria-label="Editor fields" className="min-w-0 p-5 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain">
                {children}
            </section>

            <aside aria-label="Editor overview" className="min-w-0 border-t border-border bg-muted/30 p-5 xl:min-h-0 xl:overflow-y-auto xl:overscroll-contain xl:border-t-0 xl:border-l">
                {rightPanel}
            </aside>
        </div>
    );
};