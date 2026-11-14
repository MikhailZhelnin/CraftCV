import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const THEME_STORAGE_KEY = "cvenza-theme";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used within ThemeProvider"
        );
    };

    return context;
};