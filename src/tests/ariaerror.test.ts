// src/tests/ariaError.test.ts
import { describe, it, expect } from "vitest";
import { ariaError } from "../validators/accessibility"; // adjust path if needed

describe("ariaError", () => {
    it("returns a span with correct id, role, aria-live, and message", () => {
        const id = "username-error";
        const message = "Username is required";

        const result = ariaError(id, message);

        expect(result).toBe(
            `<span id="username-error" role="alert" aria-live="polite">Username is required</span>`
        );
    });

    it("works with different ids and messages", () => {
        const id = "password-error";
        const message = "Password must be at least 8 characters";

        const result = ariaError(id, message);

        expect(result).toBe(
            `<span id="password-error" role="alert" aria-live="polite">Password must be at least 8 characters</span>`
        );
    });
});
