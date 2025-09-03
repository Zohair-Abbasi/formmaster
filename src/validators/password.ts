import { ValidationResult } from "./types";

export const passwordStrength = (value: string): ValidationResult => {
    const lengthScore = value.length >= 8 ? 1 : 0;
    const upper = /[A-Z]/.test(value) ? 1 : 0;
    const lower = /[a-z]/.test(value) ? 1 : 0;
    const number = /[0-9]/.test(value) ? 1 : 0;
    const symbol = /[!@#$%^&*]/.test(value) ? 1 : 0;

    const score = lengthScore + upper + lower + number + symbol;

    let strength: "weak" | "medium" | "strong" = "weak";
    if (score >= 4) strength = "strong";
    else if (score >= 3) strength = "medium";

    const tips: string[] = [];
    if (!upper) tips.push("Add an uppercase letter");
    if (!lower) tips.push("Add a lowercase letter");
    if (!number) tips.push("Add a number");
    if (!symbol) tips.push("Add a symbol (!@#$%)");

    return {
        valid: score >= 3,
        strength,
        tips,
    };
};
