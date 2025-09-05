import { describe, it, expect } from "vitest";
import { required, minLength, maxLength, regex, smartEmail, autoCapitalize, smartPhone, smartPassword } from "../validators/core";

describe("Basic Validators", () => {
    it("required validator", () => {
        expect(required("").valid).toBe(false);
        expect(required("").message).toBe("This field is required");
        expect(required("Hello").valid).toBe(true);
        expect(required("Hello").message).toBeUndefined();
    });

    it("minLength validator", () => {
        const min5 = minLength(5);
        expect(min5("1234").valid).toBe(false);
        expect(min5("1234").message).toBe("Must be at least 5 characters");
        expect(min5("12345").valid).toBe(true);
        expect(min5("12345").message).toBeUndefined();
    });

    it("maxLength validator", () => {
        const max5 = maxLength(5);
        expect(max5("123456").valid).toBe(false);
        expect(max5("123456").message).toBe("Must be no more than 5 characters");
        expect(max5("12345").valid).toBe(true);
        expect(max5("12345").message).toBeUndefined();
    });

    it("regex validator", () => {
        const onlyDigits = regex(/^\d+$/, "Must be digits");
        expect(onlyDigits("abc").valid).toBe(false);
        expect(onlyDigits("abc").message).toBe("Must be digits");
        expect(onlyDigits("123").valid).toBe(true);
        expect(onlyDigits("123").message).toBeUndefined();
    });
});

describe("Smart Validators", () => {
    it("smartEmail detects typos", () => {
        const result = smartEmail("user@gmial.com");
        expect(result.valid).toBe(true);
        expect(result.message).toBe('Did you mean "user@gmail.com"?');

        const validResult = smartEmail("test@example.com");
        expect(validResult.valid).toBe(true);
        expect(validResult.message).toBeUndefined();

        const invalidResult = smartEmail("invalid@");
        expect(invalidResult.valid).toBe(false);
        expect(invalidResult.message).toBe("Invalid email address");
    });

    it("autoCapitalize formats correctly", () => {
        const result = autoCapitalize("john DOE");
        expect(result.formattedValue).toBe("John Doe");
        expect(result.valid).toBe(true);
        expect(result.message).toBeUndefined();
    });

    it("smartPhone formats and validates numbers", () => {
        // US example

        const res1 = smartPhone("1234567890", "+1");
        expect(res1.formattedValue).toBe("+11234567890");
        expect(res1.valid).toBe(true);

        // Already has country code
        const res2 = smartPhone("+441234567890", "+44");
        expect(res2.formattedValue).toBe("+441234567890");
        expect(res2.valid).toBe(true);

        // Invalid number
        const res3 = smartPhone("123", "+1");
        expect(res3.valid).toBe(false);
        expect(res3.message).toBe('Phone number looks incomplete. Did you mean "+1123"?');
    });

    it("smartPassword evaluates strength and common passwords", () => {
        const weakPass = smartPassword("123456");
        expect(weakPass.valid).toBe(false);
        expect(weakPass.strength).toBe("weak");
        expect(weakPass.message).toBe("This password is too common");

        const mediumPass = smartPassword("Abc12345");
        expect(mediumPass.valid).toBe(true);
        expect(mediumPass.strength).toBe("medium");
        expect(mediumPass.message).toBe("Password strength: medium");

        const strongPass = smartPassword("Abc123456!@#");
        expect(strongPass.valid).toBe(true);
        expect(strongPass.strength).toBe("strong");
        expect(strongPass.message).toBe("Password strength: strong");
    });
});
