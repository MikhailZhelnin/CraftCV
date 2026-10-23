import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { useReactToPrint } from "react-to-print";

import type { CareerData } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../../model/resume.types";
import type { ResumeTemplateId } from "../../model/resume.templates";

import { ResumeDocumentTemplate } from "./ResumeDocumentTemplate";

import "./resume-print.css";

const PAPER_WIDTH = 794;
const PAPER_HEIGHT = 1123;

export interface ResumePreviewHandle {
    print: () => void;
};

interface ResumePreviewProps {
    data: CareerData;
    targetRole: string;
    sections: ResumeSectionSetting[];
    templateId: ResumeTemplateId;
    fileName?: string;
    printRef?: Ref<ResumePreviewHandle>;
};

export function ResumePreview({ data, targetRole, sections, templateId, fileName = "CraftCV-Resume", printRef }: ResumePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const paperRef = useRef<HTMLDivElement>(null);

    const [availableWidth, setAvailableWidth] = useState(PAPER_WIDTH);
    const [paperHeight, setPaperHeight] = useState(PAPER_HEIGHT);

    const [printError, setPrintError] = useState<string | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const paper = paperRef.current;

        if (!container || !paper) return;

        const measure = () => {
            setAvailableWidth(container.clientWidth);
            setPaperHeight(Math.max(PAPER_HEIGHT, paper.scrollHeight));
        };

        const observer = new ResizeObserver(measure);

        observer.observe(container);
        observer.observe(paper);

        measure();

        return () => observer.disconnect();
    }, []);

    const documentTitle = fileName.replace(/[\\/:*?"<>|]/g, "-").trim() || "CraftCV-Resume";

    const handlePrint = useReactToPrint({
        contentRef: paperRef,
        documentTitle,

        onPrintError: (location, error) => {
            console.error("Resume print error:", location, error);
            setPrintError("Could not prepare the PDF. " + "Please try again.");
        },
    });

    useImperativeHandle(
        printRef,
        () => ({
            print: () => {
                setPrintError(null);
                void handlePrint();
            },
        }),
        [handlePrint]
    );

    const scale = Math.min(1, availableWidth / PAPER_WIDTH);

    const scaledWidth = PAPER_WIDTH * scale;
    const scaledHeight = paperHeight * scale;

    const hasLongContent = paperHeight > PAPER_HEIGHT + 2;

    return (
        <div ref={containerRef} className="mx-auto w-full max-w-130 min-w-0 space-y-3">
            {printError && (
                <p role="alert" className="text-sm text-destructive">{printError}</p>
            )}

            {hasLongContent && (
                <p className="rounded-lg border p-3 text-xs text-muted-foreground">
                    This resume is longer than one preview page.
                    Open Print Preview to see the actual A4
                    page breaks.
                </p>
            )}

            <div className="relative mx-auto" style={{ width: scaledWidth, height: scaledHeight }}>
                <div
                    ref={paperRef}
                    className="cv-print-root absolute left-0 top-0 bg-white shadow-xl ring-1 ring-black/10"
                    style={{
                        width: PAPER_WIDTH,
                        minHeight: PAPER_HEIGHT,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                    }}
                >
                    <ResumeDocumentTemplate
                        data={data}
                        targetRole={targetRole}
                        sections={sections}
                        templateId={templateId}
                    />
                </div>
            </div>
        </div>
    );
};