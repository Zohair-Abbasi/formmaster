import { ValidationResult } from "./types";

export const validateIBAN = (iban: string): ValidationResult => {
    const trimmed = iban.replace(/\s+/g, "").toUpperCase(); // remove spaces
    const pattern = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/; // enforce minimum 15 chars total
    return {
        valid: pattern.test(trimmed),
        message: pattern.test(trimmed) ? undefined : "Invalid IBAN number"
    };
};

export const validateVAT = (vat: string): ValidationResult => {
    const pattern = /^[A-Z]{2}\d{8,12}$/;
    return { valid: pattern.test(vat), message: pattern.test(vat) ? undefined : "Invalid VAT number" };
};
