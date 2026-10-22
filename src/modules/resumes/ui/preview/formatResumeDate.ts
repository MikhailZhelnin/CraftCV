export function formatResumeMonth(value: string): string {
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
        return "";
    };

    const [year, month] = value.split("-").map(Number);

    const date = new Date(year, month - 1, 1);

    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
};

interface DatePeriod {
    startDate: string;
    endDate: string;
    isCurrent: boolean;
};

export function formatResumePeriod({ startDate, endDate, isCurrent }: DatePeriod): string {
    const start = formatResumeMonth(startDate);

    const end = isCurrent ? "Present" : formatResumeMonth(endDate);

    if (!start && !end) return "";
    if (!start) return end;
    if (!end) return start;

    return `${start} – ${end}`;
};