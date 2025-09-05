import { describe, it, expect } from "vitest";
import { validateIBAN, validateVAT } from "../validators/domain"; // adjust path if needed

describe("Financial Validators", () => {
    describe("validateIBAN", () => {
        it("should validate correct IBAN numbers", () => {
            const validIBANs = [
                "GB82WEST12345698765432",
                "DE89370400440532013000",
                "FR1420041010050500013M02606"
            ];
            validIBANs.forEach(iban => {
                const result = validateIBAN(iban);
                expect(result.valid).toBe(true);
                expect(result.message).toBeUndefined();
            });
        });

        it("should reject invalid IBAN numbers", () => {
            const invalidIBANs = [
                "GB82WEST123",        // too short
                "1234567890",         // missing country code
                "DE89-370400440532013000" // invalid chars
            ];
            invalidIBANs.forEach(iban => {
                const result = validateIBAN(iban);
                expect(result.valid).toBe(false);
                expect(result.message).toBe("Invalid IBAN number");
            });
        });
    });

    describe("validateVAT", () => {
        it("should validate correct VAT numbers", () => {
            const validVATs = [
                "DE123456789",
                "FR12345678901",
                "GB123456789012"
            ];
            validVATs.forEach(vat => {
                const result = validateVAT(vat);
                expect(result.valid).toBe(true);
                expect(result.message).toBeUndefined();
            });
        });

        it("should reject invalid VAT numbers", () => {
            const invalidVATs = [
                "DE123",          // too short
                "123456789",      // missing country code
                "FR1234567890123" // too long
            ];
            invalidVATs.forEach(vat => {
                const result = validateVAT(vat);
                expect(result.valid).toBe(false);
                expect(result.message).toBe("Invalid VAT number");
            });
        });
    });
});
