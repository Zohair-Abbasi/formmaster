interface ValidationResult {
    valid: boolean;
    message?: string;
    suggestions?: string[];
    strength?: "weak" | "medium" | "strong";
    tips?: string[];
    formattedValue?: string;
}
type AsyncValidatorFunction = (value: string) => Promise<ValidationResult>;

/**
 * Basic Validators
 */
declare const required: (value: string) => ValidationResult;
declare const minLength: (length: number) => (value: string) => ValidationResult;
declare const maxLength: (length: number) => (value: string) => ValidationResult;
declare const regex: (pattern: RegExp, message: string) => (value: string) => ValidationResult;
/**
 * Smart UX Validators
 */
declare const smartEmail: (value: string) => ValidationResult;
declare const autoCapitalize: (value: string) => ValidationResult;
declare const smartPhone: (value: string, countryCode?: string) => ValidationResult;
declare const smartPassword: (value: string) => ValidationResult;

declare const validateEmail: (value: string) => ValidationResult;

declare const passwordStrength: (value: string) => ValidationResult;

declare const formatPhone: (value: string) => string;
declare const capitalize: (value: string) => string;
declare const trim: (value: string) => string;

declare const asyncUsernameCheck: (apiEndpoint: string) => AsyncValidatorFunction;

declare class Validator {
    private value;
    private rules;
    constructor(value: string);
    required(): this;
    min(length: number): this;
    max(length: number): this;
    email(): this;
    validate(): ValidationResult;
}
declare const validate: (value: string) => Validator;

type Messages = Record<string, Record<string, string>>;
declare const defaultMessages: Messages;
declare let currentLang: string;
declare const setLanguage: (lang: string) => void;
declare const t: (key: string, params?: Record<string, string | number>) => string;

declare const aiPasswordTips: (password: string) => ValidationResult;

declare const ariaError: (id: string, message: string) => string;

declare const passwordStrengthProgress: (value: string) => number;

declare const validateIBAN: (iban: string) => ValidationResult;
declare const validateVAT: (vat: string) => ValidationResult;

export { Validator, aiPasswordTips, ariaError, asyncUsernameCheck, autoCapitalize, capitalize, currentLang, defaultMessages, formatPhone, maxLength, minLength, passwordStrength, passwordStrengthProgress, regex, required, setLanguage, smartEmail, smartPassword, smartPhone, t, trim, validate, validateEmail, validateIBAN, validateVAT };
