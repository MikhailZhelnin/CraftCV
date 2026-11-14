import type { ProfileCompletionResult } from "../../model/profile.completion";

interface ProfileCompletionProps {
    result: ProfileCompletionResult;
    showDetails?: boolean;
};

export function ProfileCompletion({ result, showDetails = false }: ProfileCompletionProps) {
    const { percentage, completedSections, totalSections, sections } = result;

    return (
        <section className="space-y-3" aria-label="Profile completion">
            <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-foreground">{percentage}% complete</span>
                <span className="text-[10px] text-muted-foreground">{completedSections}/{totalSections} sections</span>
            </div>

            <div
                role="progressbar"
                aria-label="Profile completeness"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
                className="h-1 w-full overflow-hidden bg-border"
            >
                <div className="h-full bg-linear-to-r from-[#CBF366] via-[#98BE76] to-[#52765E] transition-[width] duration-300" style={{ width: `${percentage}%` }} />
            </div>

            {showDetails && (
                <div className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
                    {sections.map((section) => {
                        const status = section.completed ? "Complete" : section.earned > 0 ? "In progress" : "Not added";

                        return (
                            <div key={section.id} className="flex items-center justify-between gap-2 border-b border-border py-2">
                                <span className="text-[11px] text-foreground">{section.label}</span>
                                <span className={section.completed ? "text-[10px] font-medium text-[#60844D]" : "text-[10px] text-muted-foreground"}>{status}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};