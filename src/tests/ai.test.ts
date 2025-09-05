// src/tests/aiPasswordTips.test.ts
import { describe, it, expect } from "vitest";
import { aiPasswordTips } from "../validators/aiPasswordTips"; // adjust path if needed

describe("aiPasswordTips", () => {
    it("should suggest adding an uppercase letter if missing", () => {
        const password = "abc123!@#";
        const result = aiPasswordTips(password);

        expect(result.tips).toContain("Add an uppercase letter");
        expect(result.valid).toBe(false); // 1 missing tip → valid is true only if tips <=2
    });

    it("should suggest adding a lowercase letter if missing", () => {
        const password = "ABC123!@#";
        const result = aiPasswordTips(password);

        expect(result.tips).toContain("Add a lowercase letter");
        expect(result.valid).toBe(false);
    });

    it("should suggest adding a number if missing", () => {
        const password = "Abcdef!@#";
        const result = aiPasswordTips(password);

        expect(result.tips).toContain("Add a number");
        expect(result.valid).toBe(false);
    });

    it("should suggest adding a symbol if missing", () => {
        const password = "Abc12345";
        const result = aiPasswordTips(password);

        expect(result.tips).toContain("Add a symbol (!@#$%)");
        expect(result.valid).toBe(false);
    });

    it("should return valid when 2 or fewer tips are missing", () => {
        const password = "Abc123!@#"; // All 4 criteria satisfied → no tips
        const result = aiPasswordTips(password);

        expect(result.tips).toHaveLength(0);
        expect(result.valid).toBe(true);
    });
});
