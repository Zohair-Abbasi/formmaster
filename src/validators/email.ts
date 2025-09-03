import { ValidationResult } from "./types";
import { regex } from "./core";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const commonDomains = ["gmail.com", "yahoo.com", "outlook.com"];

export const validateEmail = (value: string): ValidationResult => {
    const base = regex(emailPattern, "Invalid email format")(value);
    if (!base.valid) return base;

    const [_, domain] = value.split("@");
    const suggestion = commonDomains.find(d => d.toLowerCase() === domain.toLowerCase()) ? undefined : commonDomains[0];

    return {
        valid: true,
        suggestions: suggestion ? [`Did you mean ${value.split("@")[0]}@${suggestion}?`] : undefined,
    };
};
