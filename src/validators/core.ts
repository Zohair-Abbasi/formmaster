import { ValidationResult } from "./types";

/**
 * Basic Validators
 */

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

/**
 * Smart UX Validators
 */

// Smart email with typo suggestions
export const smartEmail = (value: string): ValidationResult => {
    const trimmed = value.trim().toLowerCase();
    const commonTypos: Record<string, string> = {
        "gmial.com": "gmail.com",
        "hotmial.com": "hotmail.com",
        "yaho.com": "yahoo.com",
    };
    const parts = trimmed.split("@");
    const suggestion = parts[1] && commonTypos[parts[1]];
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    return {
        valid: validEmail,
        message: suggestion
            ? `Did you mean "${parts[0]}@${suggestion}"?`
            : validEmail
                ? undefined
                : "Invalid email address",
    };
};

// Auto-capitalize names or words
export const autoCapitalize = (value: string): ValidationResult => ({
    valid: true,
    message: undefined,
    formattedValue: value
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" "),
});

// Smart phone number hints
export const smartPhone = (value: string, countryCode: string = "+1"): ValidationResult => {
    const digits = value.replace(/\D/g, ""); // remove non-digits
    const codeDigits = countryCode.replace(/\D/g, ""); // e.g. "1" for "+1"

    let formatted: string;

    if (value.startsWith("+")) {
        // Already includes country code explicitly
        formatted = `+${digits}`;
    } else {
        // Prepend the country code
        formatted = `${countryCode}${digits}`;
    }

    const valid = /^\+\d{10,15}$/.test(formatted);

    return {
        valid,
        message: valid ? undefined : `Phone number looks incomplete. Did you mean "${formatted}"?`,
        formattedValue: formatted,
    };
};

// Password smart UX: strength + common mistakes
export const smartPassword = (value: string): ValidationResult => {
    const trimmed = value.trim();

    // Handle common weak passwords first
    const commonWeak = ["123456", "password", "qwerty"];
    if (commonWeak.includes(trimmed.toLowerCase())) {
        return {
            valid: false,
            message: "This password is too common",
            strength: "weak",
        };
    }

    const length = trimmed.length;
    const hasNumber = /\d/.test(trimmed);
    const hasUpper = /[A-Z]/.test(trimmed);
    const hasLower = /[a-z]/.test(trimmed);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(trimmed);

    const complexityCount = [hasNumber, hasUpper, hasLower, hasSymbol].filter(Boolean).length;

    let scoreLabel: "weak" | "medium" | "strong" = "weak";

    // Simple rule-based classification
    if (length >= 12 && complexityCount >= 3) {
        scoreLabel = "strong";
    } else if (length >= 8 && complexityCount >= 2) {
        scoreLabel = "medium";
    } else {
        scoreLabel = "weak";
    }

    return {
        valid: scoreLabel !== "weak",
        message: `Password strength: ${scoreLabel}`,
        strength: scoreLabel,
    };
};
