export interface ValidationResult {
    valid: boolean;
    message?: string;
    suggestions?: string[];
    strength?: "weak" | "medium" | "strong";
    tips?: string[];
    formattedValue?: string;
}

export type ValidatorFunction = (value: string) => ValidationResult;

export type AsyncValidatorFunction = (value: string) => Promise<ValidationResult>;

export interface SchemaRule {
    validator: ValidatorFunction | AsyncValidatorFunction;
    message?: string;
}
