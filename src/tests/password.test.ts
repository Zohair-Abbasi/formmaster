import { describe, it, expect } from "vitest";
import { passwordStrength } from "../validators/password";
import type { ValidationResult } from "../validators/types";

describe("passwordStrength", () => {
    it("should mark very weak passwords as invalid", () => {
        const result: ValidationResult = passwordStrength("abc");
        expect(result.valid).toBe(false);
        expect(result.strength).toBe("weak");
        expect(result.tips).toContain("Add an uppercase letter");
        expect(result.tips).toContain("Add a number");
        expect(result.tips).toContain("Add a symbol (!@#$%)");
    });

    it("should return medium for password with letters and numbers but no symbols", () => {
        const result: ValidationResult = passwordStrength("Abc12345");
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("medium");
        expect(result.tips).toContain("Add a symbol (!@#$%)");
    });

    it("should return strong for a password with upper, lower, number, symbol", () => {
        const result: ValidationResult = passwordStrength("Abc123!@#");
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("strong");
        expect(result.tips?.length).toBe(0);
    });

    it("should suggest adding uppercase if missing", () => {
        const result: ValidationResult = passwordStrength("abc123!@#");
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("medium");
        expect(result.tips).toContain("Add an uppercase letter");
    });

    it("should suggest adding lowercase if missing", () => {
        const result: ValidationResult = passwordStrength("ABC123!@#");
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("medium");
        expect(result.tips).toContain("Add a lowercase letter");
    });

    it("should suggest adding number if missing", () => {
        const result: ValidationResult = passwordStrength("Abcdef!@#");
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("medium");
        expect(result.tips).toContain("Add a number");
    });

    it("should suggest adding symbol if missing", () => {
        const result: ValidationResult = passwordStrength("Abc12345");
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("medium");
        expect(result.tips).toContain("Add a symbol (!@#$%)");
    });

    it("should handle exact 8 character length requirement", () => {
        const result: ValidationResult = passwordStrength("Abc1234!"); // 8 chars, all criteria
        expect(result.valid).toBe(true);
        expect(result.strength).toBe("strong");
    });
});
// --- IGNORE ---