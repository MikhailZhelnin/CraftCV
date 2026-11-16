import type { ComponentType } from "react";

import type { ResumeTemplateId } from "../../model/resume.templates";

import { StandardIllustration } from "./illustrations/StandardIllustration";
import { EditorialIllustration } from "./illustrations/EditorialIllustration";
import { SwissIllustration } from "./illustrations/SwissIllustration";
import { OliveIllustration } from "./illustrations/OliveIllustration";
import { OutlineIllustration } from "./illustrations/OutlineIllustration";
import { BauhausIllustration } from "./illustrations/BauhausIllustration";
import { LedgerIllustration } from "./illustrations/LedgerIllustration";
import { NordicIllustration } from "./illustrations/NordicIllustration";
import { StudioIllustration } from "./illustrations/StudioIllustration";
import { ModularIllustration } from "./illustrations/ModularIllustration";
import { KineticIllustration } from "./illustrations/KineticIllustration";
import { GridlineIllustration } from "./illustrations/GridlineIllustration";

interface ResumeTemplateIllustrationProps {
    templateId: ResumeTemplateId;
    size?: "small" | "large";
};

const WIDTH = 206;
const HEIGHT = 292;

const ILLUSTRATIONS = {
    editorial: EditorialIllustration,
    swiss: SwissIllustration,
    olive: OliveIllustration,
    outline: OutlineIllustration,
    bauhaus: BauhausIllustration,
    ledger: LedgerIllustration,
    nordic: NordicIllustration,
    studio: StudioIllustration,
    modular: ModularIllustration,
    kinetic: KineticIllustration,
    gridline: GridlineIllustration,
} satisfies Record<Exclude<ResumeTemplateId, "classic" | "modern">, ComponentType>;

function IllustrationContent({ templateId }: { templateId: ResumeTemplateId; }) {
    if (templateId === "classic" || templateId === "modern") {
        return (
            <StandardIllustration isModern={templateId === "modern"} />
        );
    };

    const Illustration = ILLUSTRATIONS[templateId];

    return <Illustration />;
};

export function ResumeTemplateIllustration({ templateId, size = "small" }: ResumeTemplateIllustrationProps) {
    const scale = size === "small" ? 112 / WIDTH : 1;

    return (
        <div aria-hidden="true" className="relative shrink-0" style={{ width: WIDTH * scale, height: HEIGHT * scale }}>
            <div
                className="absolute left-0 top-0 box-border h-73 w-51.5 overflow-hidden border border-black/10 bg-white p-5 text-left shadow-sm"
                style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
            >
                <IllustrationContent templateId={templateId} />
            </div>
        </div>
    );
};