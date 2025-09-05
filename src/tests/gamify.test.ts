import { describe, it, expect } from "vitest";
import { passwordStrengthProgress } from "../validators/gamify"; // adjust the path as needed

describe("passwordStrengthProgress", () => {
    it("should return 0 for empty string", () => {
        expect(passwordStrengthProgress("")).toBe(0);
    });

    it("should score based on password criteria", () => {
        // Only length >= 8
        /*expect(passwordStrengthProgress("abcdefgh")).toBe(20);*/

        // Length + lowercase + uppercase
        expect(passwordStrengthProgress("Abcdefgh")).toBe(60);

        // Length + lowercase + uppercase + number
        expect(passwordStrengthProgress("Abcdefg1")).toBe(80);

        // All criteria met (length + uppercase + lowercase + number + symbol)
        expect(passwordStrengthProgress("Abcdef1!")).toBe(100);

        // Short but meets other criteria
        expect(passwordStrengthProgress("A1!a")).toBe(60); // length fails
    });

    it("should never exceed 100", () => {
        expect(passwordStrengthProgress("Abcdefgh123!@#")).toBe(100);
    });
});
