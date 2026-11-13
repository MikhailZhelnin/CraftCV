import { Controller, useFormContext } from "react-hook-form";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";

import type { ResumeDraft } from "../../model/resume.types";

import { ResumeTemplateSelector } from "./../templates/ResumeTemplateSelector";

export function ResumeDesignPanel() {
    const { control } = useFormContext<ResumeDraft>();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Design & Template</CardTitle>
                <CardDescription>
                    Choose the visual style of your CV.
                    You can change it without losing data.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Controller
                    control={control}
                    name="templateId"
                    render={({ field }) => (
                        <ResumeTemplateSelector
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </CardContent>
        </Card>
    );
};