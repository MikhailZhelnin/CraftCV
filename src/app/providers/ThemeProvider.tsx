import { useEffect, useState, type ReactNode } from "react";

import { ThemeContext, THEME_STORAGE_KEY, type Theme } from "./theme";

interface ThemeProviderProps {
    children: ReactNode;
};

function getInitialTheme(): Theme {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);

        if (saved === "dark" || saved === "light") {
            return saved;
        };
    } catch { };

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const setTheme = (nextTheme: Theme) => {
        setThemeState(nextTheme);

        try {
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch { };
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};