import { ValidationResult } from "./types";

export const required = (value: string): ValidationResult => ({
    valid: value.trim() !== "",
    message: value.trim() ? undefined : "This field is required",
});

export const minLength = (length: number) => (value: string): ValidationResult => ({
    valid: value.length >= length,
    message: value.length >= length ? undefined : `Must be at least ${length} characters`,
});

export const maxLength = (length: number) => (value: string): ValidationResult => ({
    valid: value.length <= length,
    message: value.length <= length ? undefined : `Must be no more than ${length} characters`,
});

export const regex = (pattern: RegExp, message: string) => (value: string): ValidationResult => ({
    valid: pattern.test(value),
    message: pattern.test(value) ? undefined : message,
});
export const smartEmail = (value: string): ValidationResult => {
    const trimmed = value.trim().toLowerCase();
    const commonTypos: Record<string, string> = {
        "gmial.com": "gmail.com",
        "hotmial.com": "hotmail.com",
        "yaho.com": "yahoo.com",
    };
    const domain = trimmed.split("@")[1];
    const suggestion = domain && commonTypos[domain];

    return {
        valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed),
        message: suggestion
            ? `Did you mean "${trimmed.split("@")[0]}@${suggestion}"?`
            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
                ? undefined
                : "Invalid email address",
    };
};
