import { describe, it, expect } from "vitest";
import { formatPhone, capitalize, trim } from "../validators/format"; // adjust path if needed

describe("String Utilities", () => {
    describe("formatPhone", () => {
        it("should remove all non-digit characters", () => {
            expect(formatPhone("(123) 456-7890")).toBe("1234567890");
            expect(formatPhone("+1 234 567 8900")).toBe("12345678900");
            expect(formatPhone("abc123def")).toBe("123");
            expect(formatPhone("")).toBe("");
        });
    });

    describe("capitalize", () => {
        it("should capitalize the first letter and lowercase the rest", () => {
            expect(capitalize("hello")).toBe("Hello");
            expect(capitalize("HELLO")).toBe("Hello");
            expect(capitalize("hELLo")).toBe("Hello");
            expect(capitalize("")).toBe("");
            expect(capitalize("a")).toBe("A");
        });
    });

    describe("trim", () => {
        it("should remove leading and trailing whitespace", () => {
            expect(trim("  hello  ")).toBe("hello");
            expect(trim("\tworld\n")).toBe("world");
            expect(trim("noSpaces")).toBe("noSpaces");
            expect(trim("")).toBe("");
        });
    });
});
