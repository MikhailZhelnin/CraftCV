import type { ReactNode } from "react";

import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/shared/ui/card";

import { PersonalDetailsFields } from "../PersonalDetailsFields";
import { SummaryFields } from "../SummaryFields";
import { ExperienceFields } from "../ExperienceFields";
import { EducationFields } from "../EducationFields";
import { SkillsFields } from "../SkillsFields";
import { ProjectFields } from "../ProjectFields";
import { LanguageFields } from "../LanguageFields";

import { RepeatableSection, RepeatableItem } from "./RepeatableSection";

import { createEmptyExperience, createEmptyEducation, createEmptyProject, createEmptyLanguage } from "../../model/career.defaults";
import { CAREER_SECTION_IDS, type CareerSectionId } from "../../model/career.sections";
import type { CareerData } from "../../model/career.types";

import { useAutoExpandInvalidItems } from "../../hooks/useAutoExpandInvalidItems";

import { getCareerSectionDomId } from "../../lib/sectionNavigation";

type CareerDataFormValues = {
    careerData: CareerData;
};

interface CareerDataSectionsProps {
    order?: readonly CareerSectionId[];
    hiddenIds?: readonly CareerSectionId[];
    renderSectionActions?: (id: CareerSectionId) => ReactNode;
};

export function CareerDataSections({ order = CAREER_SECTION_IDS, hiddenIds = [], renderSectionActions }: CareerDataSectionsProps) {
    const { control, formState: { errors, submitCount } } = useFormContext<CareerDataFormValues>();

    const { fields: experienceFields, append: appendExperience, remove: removeExperience, move: moveExperience } = useFieldArray({ control, name: "careerData.experience" });
    const { fields: educationFields, append: appendEducation, remove: removeEducation, move: moveEducation } = useFieldArray({ control, name: "careerData.education" });
    const { fields: projectFields, append: appendProject, remove: removeProject, move: moveProject } = useFieldArray({ control, name: "careerData.projects" });
    const { fields: languageFields, append: appendLanguage, remove: removeLanguage, move: moveLanguage } = useFieldArray({ control, name: "careerData.languages" });


    const experienceAccordion = useAutoExpandInvalidItems({ fields: experienceFields, sectionErrors: errors.careerData?.experience, submitCount });
    const educationAccordion = useAutoExpandInvalidItems({ fields: educationFields, sectionErrors: errors.careerData?.education, submitCount });
    const projectsAccordion = useAutoExpandInvalidItems({ fields: projectFields, sectionErrors: errors.careerData?.projects, submitCount });
    const languagesAccordion = useAutoExpandInvalidItems({ fields: languageFields, sectionErrors: errors.careerData?.languages, submitCount });

    const experienceValues = useWatch({ control, name: "careerData.experience" }) ?? [];
    const educationValues = useWatch({ control, name: "careerData.education" }) ?? [];
    const projectValues = useWatch({ control, name: "careerData.projects" }) ?? [];
    const languageValues = useWatch({ control, name: "careerData.languages" }) ?? [];

    const sections: Record<CareerSectionId, ReactNode> = {
        personal: (
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>Contact details used in your resumes.</CardDescription>
                    {renderSectionActions && (
                        <CardAction>
                            {renderSectionActions("personal")}
                        </CardAction>
                    )}
                </CardHeader>

                <CardContent>
                    <Controller
                        name="careerData.personal"
                        control={control}
                        render={({ field }) => (
                            <PersonalDetailsFields
                                value={field.value}
                                onChange={field.onChange}
                                errors={{ email: errors.careerData?.personal?.email?.message }}
                            />
                        )}
                    />
                </CardContent>
            </Card>
        ),

        summary: (
            <Card>
                <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                    <CardDescription>Write a short professional introduction.</CardDescription>
                    {renderSectionActions && (
                        <CardAction>
                            {renderSectionActions("summary")}
                        </CardAction>
                    )}
                </CardHeader>

                <CardContent>
                    <Controller
                        name="careerData.summary"
                        control={control}
                        render={({ field, fieldState }) => (
                            <SummaryFields
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </CardContent>
            </Card>
        ),

        experience: (
            <RepeatableSection
                title="Work Experience"
                description="Add your professional work history."
                addLabel="Add Experience"
                emptyMessage="No work experience added yet."
                count={experienceFields.length}
                maxItems={20}
                headerActions={renderSectionActions?.("experience")}
                onAdd={() => appendExperience(createEmptyExperience())}
            >
                {experienceFields.map((item, index) => (
                    <RepeatableItem
                        key={item.id}
                        title={experienceValues[index]?.position || `Experience ${index + 1}`}
                        subtitle={experienceValues[index]?.company || "Enter company details"}
                        index={index}
                        total={experienceFields.length}
                        onMoveUp={() => moveExperience(index, index - 1)}
                        onMoveDown={() => moveExperience(index, index + 1)}
                        onRemove={() => removeExperience(index)}
                        isOpen={experienceAccordion.isOpen(item.id)}
                        onOpenChange={(open) => experienceAccordion.setItemOpen(item.id, open)}
                    >
                        <Controller
                            name={`careerData.experience.${index}`}
                            control={control}
                            render={({ field }) => (
                                <ExperienceFields
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={{
                                        position: errors.careerData?.experience?.[index]?.position?.message,
                                        company: errors.careerData?.experience?.[index]?.company?.message,
                                        startDate: errors.careerData?.experience?.[index]?.startDate?.message,
                                        endDate: errors.careerData?.experience?.[index]?.endDate?.message,
                                        description: errors.careerData?.experience?.[index]?.description?.message,
                                    }}
                                />
                            )}
                        />
                    </RepeatableItem>
                ))}
            </RepeatableSection>
        ),

        education: (
            <RepeatableSection
                title="Education"
                description="Add your educational background."
                addLabel="Add Education"
                emptyMessage="No education added yet."
                count={educationFields.length}
                maxItems={20}
                headerActions={renderSectionActions?.("education")}
                onAdd={() => appendEducation(createEmptyEducation())}
            >
                {educationFields.map((item, index) => (
                    <RepeatableItem
                        key={item.id}
                        title={educationValues[index]?.institution || `Education ${index + 1}`}
                        subtitle={educationValues[index]?.fieldOfStudy || "Enter education details"}
                        index={index}
                        total={educationFields.length}
                        onMoveUp={() => moveEducation(index, index - 1)}
                        onMoveDown={() => moveEducation(index, index + 1)}
                        onRemove={() => removeEducation(index)}
                        isOpen={educationAccordion.isOpen(item.id)}
                        onOpenChange={(open) => educationAccordion.setItemOpen(item.id, open)}
                    >
                        <Controller
                            name={`careerData.education.${index}`}
                            control={control}
                            render={({ field }) => (
                                <EducationFields
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={{
                                        institution: errors.careerData?.education?.[index]?.institution?.message,
                                        degree: errors.careerData?.education?.[index]?.degree?.message,
                                        fieldOfStudy: errors.careerData?.education?.[index]?.fieldOfStudy?.message,
                                        startDate: errors.careerData?.education?.[index]?.startDate?.message,
                                        endDate: errors.careerData?.education?.[index]?.endDate?.message,
                                        description: errors.careerData?.education?.[index]?.description?.message,
                                    }}
                                />
                            )}
                        />
                    </RepeatableItem>
                ))}
            </RepeatableSection>
        ),

        skills: (
            <Card>
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Add your professional skills.</CardDescription>
                    {renderSectionActions && (
                        <CardAction>
                            {renderSectionActions("skills")}
                        </CardAction>
                    )}
                </CardHeader>

                <CardContent>
                    <Controller
                        name="careerData.skills"
                        control={control}
                        render={({ field, fieldState }) => (
                            <SkillsFields
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </CardContent>
            </Card>
        ),

        projects: (
            <RepeatableSection
                title="Projects"
                description="Showcase personal and professional projects."
                addLabel="Add Project"
                emptyMessage="No projects added yet."
                count={projectFields.length}
                maxItems={20}
                headerActions={renderSectionActions?.("projects")}
                onAdd={() => appendProject(createEmptyProject())}
            >
                {projectFields.map((item, index) => (
                    <RepeatableItem
                        key={item.id}
                        title={projectValues[index]?.name || `Project ${index + 1}`}
                        subtitle={projectValues[index]?.role || "Enter project details"}
                        index={index}
                        total={projectFields.length}
                        onMoveUp={() => moveProject(index, index - 1)}
                        onMoveDown={() => moveProject(index, index + 1)}
                        onRemove={() => removeProject(index)}
                        isOpen={projectsAccordion.isOpen(item.id)}
                        onOpenChange={(open) => projectsAccordion.setItemOpen(item.id, open)}
                    >
                        <Controller
                            name={`careerData.projects.${index}`}
                            control={control}
                            render={({ field }) => (
                                <ProjectFields
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={{
                                        name: errors.careerData?.projects?.[index]?.name?.message,
                                        role: errors.careerData?.projects?.[index]?.role?.message,
                                        websiteUrl: errors.careerData?.projects?.[index]?.websiteUrl?.message,
                                        repositoryUrl: errors.careerData?.projects?.[index]?.repositoryUrl?.message,
                                        startDate: errors.careerData?.projects?.[index]?.startDate?.message,
                                        endDate: errors.careerData?.projects?.[index]?.endDate?.message,
                                        description: errors.careerData?.projects?.[index]?.description?.message,
                                        technologies: errors.careerData?.projects?.[index]?.technologies?.message,
                                    }}
                                />
                            )}
                        />
                    </RepeatableItem>
                ))}
            </RepeatableSection>
        ),

        languages: (
            <RepeatableSection
                title="Languages"
                description="Add languages and proficiency levels."
                addLabel="Add Language"
                emptyMessage="No languages added yet."
                count={languageFields.length}
                maxItems={12}
                headerActions={renderSectionActions?.("languages")}
                onAdd={() => appendLanguage(createEmptyLanguage())}
            >
                {languageFields.map((item, index) => (
                    <RepeatableItem
                        key={item.id}
                        title={languageValues[index]?.name || `Language ${index + 1}`}
                        subtitle={languageValues[index]?.level || "Select proficiency level"}
                        index={index}
                        total={languageFields.length}
                        onMoveUp={() => moveLanguage(index, index - 1)}
                        onMoveDown={() => moveLanguage(index, index + 1)}
                        onRemove={() => removeLanguage(index)}
                        isOpen={languagesAccordion.isOpen(item.id)}
                        onOpenChange={(open) => languagesAccordion.setItemOpen(item.id, open)}
                    >
                        <Controller
                            name={`careerData.languages.${index}`}
                            control={control}
                            render={({ field }) => (
                                <LanguageFields
                                    value={field.value}
                                    onChange={field.onChange}
                                    errors={{
                                        name: errors.careerData?.languages?.[index]?.name?.message,
                                        level: errors.careerData?.languages?.[index]?.level?.message,
                                    }}
                                />
                            )}
                        />
                    </RepeatableItem>
                ))}
            </RepeatableSection>
        ),
    };

    return (
        <div className="space-y-6">
            {order.map((sectionId) => (
                <div key={sectionId} id={getCareerSectionDomId(sectionId)} className="scroll-mt-24 space-y-2">
                    {hiddenIds.includes(sectionId) && (
                        <p className="text-xs text-muted-foreground">Hidden in exported resume</p>
                    )}

                    {sections[sectionId]}
                </div>
            ))}
        </div>
    );
};