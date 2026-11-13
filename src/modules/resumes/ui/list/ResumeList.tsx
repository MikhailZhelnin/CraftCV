import { CollectionCreateCard } from "@/shared/components/CollectionCreateCard";

import type { Resume } from "../../model/resume.types";
import { ResumeCard } from "./ResumeCard";

interface ResumeListProps {
    resumes: Resume[];
    onEdit: (id: string) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    onCreateNew: () => void;
};

export function ResumeList({ resumes, onEdit, onDuplicate, onDelete, onCreateNew }: ResumeListProps) {
    return (
        <div className="mb-4 grid auto-rows-fr grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {resumes.map((resume) => (
                <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                />
            ))}

            <CollectionCreateCard
                title="Create new resume"
                description="Start from scratch or use a profile."
                onClick={onCreateNew}
            />
        </div>
    );
};