import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { asyncUsernameCheck } from "../validators/async"; // adjust the path

describe("asyncUsernameCheck", () => {
    const apiEndpoint = "https://example.com/check-username";

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should return valid true if username is not taken", async () => {
        // Mock fetch to simulate username not taken
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ taken: false }),
            } as any)
        );

        const validator = asyncUsernameCheck(apiEndpoint);
        const result = await validator("newuser");

        expect(result.valid).toBe(true);
        expect(result.message).toBeUndefined();
    });

    it("should return valid false if username is taken", async () => {
        // Mock fetch to simulate username taken
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ taken: true }),
            } as any)
        );

        const validator = asyncUsernameCheck(apiEndpoint);
        const result = await validator("existinguser");

        expect(result.valid).toBe(false);
        expect(result.message).toBe("Username is already taken");
    });

    it("should return valid false if fetch fails", async () => {
        // Mock fetch to simulate API failure
        global.fetch = vi.fn(() => Promise.reject("API error") as any);

        const validator = asyncUsernameCheck(apiEndpoint);
        const result = await validator("anyuser");

        expect(result.valid).toBe(false);
        expect(result.message).toBe("Validation API failed");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });
});
