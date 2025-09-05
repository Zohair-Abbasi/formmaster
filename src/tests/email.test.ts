import { describe, it, expect } from "vitest";
import { validateEmail } from "../validators/email"; // adjust the path if needed

describe("Email Validator", () => {
    it("should validate correct email formats without suggestions", () => {
        const validEmails = [
            "user@gmail.com",
            "test@yahoo.com",
            "example@outlook.com",
        ];

        validEmails.forEach(email => {
            const result = validateEmail(email);
            expect(result.valid).toBe(true);
            expect(result.suggestions).toBeUndefined();
        });
    });

    it("should provide suggestion for uncommon domain", () => {
        const email = "user@unknown.com";
        const result = validateEmail(email);

        expect(result.valid).toBe(true);
        expect(result.suggestions).toEqual([
            "Did you mean user@gmail.com?"
        ]);
    });

    it("should reject invalid email formats", () => {
        const invalidEmails = [
            "plainaddress",
            "missingatsign.com",
            "@missinguser.com",
            "user@.com",
            "user@com"
        ];

        invalidEmails.forEach(email => {
            const result = validateEmail(email);
            expect(result.valid).toBe(false);
            expect(result.suggestions).toBeUndefined();
        });
    });
});
