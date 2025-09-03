import { ValidationResult } from "./types";

export const validateIBAN = (iban: string): ValidationResult => {
    const pattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
    return { valid: pattern.test(iban), message: pattern.test(iban) ? undefined : "Invalid IBAN number" };
};

export const validateVAT = (vat: string): ValidationResult => {
    const pattern = /^[A-Z]{2}\d{8,12}$/;
    return { valid: pattern.test(vat), message: pattern.test(vat) ? undefined : "Invalid VAT number" };
};
