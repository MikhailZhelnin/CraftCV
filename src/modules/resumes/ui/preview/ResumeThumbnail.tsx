import { useEffect, useRef, useState } from "react";

import type { Resume } from "../../model/resume.types";
import { ResumeDocumentTemplate } from "./ResumeDocumentTemplate";

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;
const PADDING = 24;

interface ResumeThumbnailProps {
    resume: Resume;
};

export function ResumeThumbnail({ resume }: ResumeThumbnailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.15);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const updateScale = () => {
            const { width, height } = container.getBoundingClientRect();

            const availableWidth = Math.max(0, width - PADDING);
            const availableHeight = Math.max(0, height - PADDING);

            const nextScale = Math.min(availableWidth / PAPER_WIDTH, availableHeight / PAPER_HEIGHT);

            setScale(nextScale);
        };

        const observer = new ResizeObserver(updateScale);

        observer.observe(container);
        updateScale();

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative aspect-[1.12] w-full overflow-hidden bg-foreground/6">
            <div
                inert
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
                <div
                    className="shrink-0 bg-white text-left shadow-sm ring-1 ring-black/5"
                    style={{
                        width: PAPER_WIDTH,
                        height: PAPER_HEIGHT,
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                    }}
                >
                    <ResumeDocumentTemplate
                        data={resume.careerData}
                        targetRole={resume.targetRole}
                        sections={resume.sections}
                        templateId={resume.templateId}
                    />
                </div>
            </div>
        </div>
    );
};