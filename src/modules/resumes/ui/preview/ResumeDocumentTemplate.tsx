import type { CareerData } from "@/modules/career-data";

import type { ResumeSectionSetting } from "../../model/resume.types";
import type { ResumeTemplateId } from "../../model/resume.templates";

import { ClassicModernTemplate } from "../templates/classic-modern/ClassicModernTemplate";
import { EditorialTemplate } from "../templates/editorial/EditorialTemplate";
import { SwissTemplate } from "../templates/swiss/SwissTemplate";
import { OliveTemplate } from "../templates/olive/OliveTemplate";
import { OutlineTemplate } from "../templates/outline/OutlineTemplate";
import { BauhausTemplate } from "../templates/bauhaus/BauhausTemplate";
import { LedgerTemplate } from "../templates/ledger/LedgerTemplate";
import { NordicTemplate } from "../templates/nordic/NordicTemplate";
import { StudioTemplate } from "../templates/studio/StudioTemplate";
import { ModularTemplate } from "../templates/modular/ModularTemplate";
import { KineticTemplate } from "../templates/kinetic/KineticTemplate";
import { GridlineTemplate } from "../templates/gridline/GridlineTemplate";

interface ResumeDocumentTemplateProps {
    data: CareerData;
    targetRole: string;
    sections: ResumeSectionSetting[];
    templateId: ResumeTemplateId;
};

export function ResumeDocumentTemplate(props: ResumeDocumentTemplateProps) {
    switch (props.templateId) {
        case "classic":
        case "modern":
            return (
                <ClassicModernTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                    templateId={props.templateId}
                />
            );

        case "editorial":
            return (
                <EditorialTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "swiss":
            return (
                <SwissTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "olive":
            return (
                <OliveTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "outline":
            return (
                <OutlineTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "bauhaus":
            return (
                <BauhausTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "ledger":
            return (
                <LedgerTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "nordic":
            return (
                <NordicTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "studio":
            return (
                <StudioTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "modular":
            return (
                <ModularTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "kinetic":
            return (
                <KineticTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        case "gridline":
            return (
                <GridlineTemplate
                    data={props.data}
                    targetRole={props.targetRole}
                    sections={props.sections}
                />
            );

        default: {
            const unsupported: never = props.templateId;
            throw new Error(`Unsupported resume template: ${unsupported}`);
        };
    };
};