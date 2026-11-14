import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/app/providers/theme";
import { Button } from "@/shared/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="border border-border"
        >
            {isDark ? (
                <Sun className="size-4" />
            ) : (
                <Moon className="size-4" />
            )}
        </Button>
    );
};