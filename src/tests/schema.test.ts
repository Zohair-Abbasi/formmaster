import { describe, it, expect } from "vitest";
import { validate, Validator } from "../validators/schema"; // adjust path if needed

describe("Validator class", () => {
    it("should pass required validation when value is non-empty", () => {
        const result = validate("hello").required().validate();
        expect(result.valid).toBe(true);
    });

    it("should fail required validation when value is empty", () => {
        const result = validate("   ").required().validate();
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Required");
    });

    it("should pass min length when value length is enough", () => {
        const result = validate("hello").min(3).validate();
        expect(result.valid).toBe(true);
    });

    it("should fail min length when value is too short", () => {
        const result = validate("hi").min(3).validate();
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Min 3");
    });

    it("should pass max length when value is within limit", () => {
        const result = validate("hello").max(10).validate();
        expect(result.valid).toBe(true);
    });

    it("should fail max length when value is too long", () => {
        const result = validate("helloworld!!").max(5).validate();
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Max 5");
    });

    it("should pass email validation for a valid email", () => {
        const result = validate("test@example.com").email().validate();
        expect(result.valid).toBe(true);
    });

    it("should fail email validation for an invalid email", () => {
        const result = validate("invalid-email").email().validate();
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Invalid email");
    });

    it("should stop at the first failing rule", () => {
        const result = validate("").required().min(3).validate();
        // should fail at required, not min
        expect(result.valid).toBe(false);
        expect(result.message).toBe("Required");
    });

    it("should pass when multiple rules all succeed", () => {
        const result = validate("hello@example.com")
            .required()
            .min(5)
            .max(50)
            .email()
            .validate();
        expect(result.valid).toBe(true);
    });
});
