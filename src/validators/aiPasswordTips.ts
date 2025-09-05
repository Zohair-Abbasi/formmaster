import { ValidationResult } from "./types";

// Example AI suggestion (could integrate OpenAI or local rules)
export const aiPasswordTips = (password: string): ValidationResult => {
    const tips: string[] = [];
    if (!/[A-Z]/.test(password)) tips.push("Add an uppercase letter");
    if (!/[a-z]/.test(password)) tips.push("Add a lowercase letter");
    if (!/[0-9]/.test(password)) tips.push("Add a number");
    if (!/[!@#$%^&*]/.test(password)) tips.push("Add a symbol (!@#$%)");

    return {
        valid: tips.length === 0, // <-- valid only if no tips are missing
        tips,
    };
};
// Note: In a real-world scenario, you might want to integrate with an AI service
// like OpenAI to generate more sophisticated tips based on password analysis.