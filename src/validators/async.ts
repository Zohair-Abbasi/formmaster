import { ValidationResult, AsyncValidatorFunction } from "./types";

export const asyncUsernameCheck = (apiEndpoint: string): AsyncValidatorFunction => {
    return async (value: string) => {
        try {
            const res = await fetch(`${apiEndpoint}?username=${value}`);
            const data = await res.json();
            return { valid: !data.taken, message: data.taken ? "Username is already taken" : undefined };
        } catch (e) {
            return { valid: false, message: "Validation API failed" };
        }
    };
};
