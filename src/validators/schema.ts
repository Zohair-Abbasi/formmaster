import { ValidationResult, ValidatorFunction } from "./types";

export class Validator {
    private value: string;
    private rules: ValidatorFunction[] = [];

    constructor(value: string) {
        this.value = value;
    }

    required() {
        this.rules.push(v => v.trim() ? { valid: true } : { valid: false, message: "Required" });
        return this;
    }

    min(length: number) {
        this.rules.push(v => v.length >= length ? { valid: true } : { valid: false, message: `Min ${length}` });
        return this;
    }

    max(length: number) {
        this.rules.push(v => v.length <= length ? { valid: true } : { valid: false, message: `Max ${length}` });
        return this;
    }

    email() {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.rules.push(v => pattern.test(v) ? { valid: true } : { valid: false, message: "Invalid email" });
        return this;
    }

    validate(): ValidationResult {
        for (const rule of this.rules) {
            const res = rule(this.value);
            if (!res.valid) return res;
        }
        return { valid: true };
    }
}

export const validate = (value: string) => new Validator(value);
