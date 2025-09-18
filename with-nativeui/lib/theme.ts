import { vars } from "nativewind";

export const themes = {
    light: vars({
        // Primary colors
        "--color-primary": "0 0 0",
        "--color-primary-foreground": "255 255 255",
        "--color-foreground": "13 13 13",

        // General context (background) and cards / popovers
        "--color-background": "255 255 255",
        "--color-background-foreground": "13 13 13",
        "--color-card": "255 255 255",
        "--color-card-foreground": "13 13 13",
        "--color-popover": "255 255 255",
        "--color-popover-foreground": "13 13 13",

        // Secondary colors
        "--color-secondary": "45 45 45",
        "--color-secondary-foreground": "255 255 255",
        "--color-foreground-muted": "115 115 115",

        // Accent colors
        "--color-accent": "45 45 45",
        "--color-accent-foreground": "255 255 255",

        // Status colors
        "--color-destructive": "239 68 68",
        "--color-destructive-foreground": "250 250 250",

        "--color-success": "34 197 94",
        "--color-success-foreground": "250 250 250",

        "--color-warning": "234 179  8",
        "--color-warning-foreground": "13 13 13",

        "--color-info": "59 130 246",
        "--color-info-foreground": "250 250 250",

        // Borders, inputs and "rings"
        "--border": "229 231 235",
        "--border-foreground": "13 13 13",
        "--input": "229 231 235",
        "--input-foreground": "13 13 13",
        "--ring": "13 13 13",
    }),

    dark: vars({
        // Primary colors
        "--color-primary": "255 255 255",
        "--color-primary-foreground": "13 13 13",
        "--color-foreground": "250 250 250",

        // General context (background) and cards / popovers
        "--color-background": "23 23 28",
        "--color-background-foreground": "250 250 250",
        "--color-card": "32 32 36",
        "--color-card-foreground": "250 250 250",
        "--color-popover": "32 32 36",
        "--color-popover-foreground": "250 250 250",

        // Secondary colors
        "--color-secondary": "58 58 58",
        "--color-muted": "163 163 163",

        // Accent colors
        "--color-accent": "58  58  58",
        "--color-accent-foreground": "250 250 250",

        // Status colors
        "--color-destructive": "153  27  27",
        "--color-destructive-foreground": "250 250 250",

        "--color-success": "22 163  74",
        "--color-success-foreground": "250 250 250",

        "--color-warning": "161  98   7",
        "--color-warning-foreground": "250 250 250",

        "--color-info": " 37  99 235",
        "--color-info-foreground": "250 250 250",

        // Borders, inputs and "rings"
        "--border": " 38  38  38",
        "--border-foreground": "250 250 250",
        "--input": " 38  38  38",
        "--input-foreground": "250 250 250",
        "--ring": "212 212 212",
    }),
} as const;
