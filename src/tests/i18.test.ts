import { describe, it, expect, beforeEach } from "vitest";
import { defaultMessages, currentLang, setLanguage, t } from "../validators/i18n"; // adjust path if needed

describe("i18n messages", () => {
    beforeEach(() => {
        // Reset language to English before each test
        setLanguage("en");
    });

    it("should use English as default language", () => {
        expect(t("required")).toBe(defaultMessages.en.required);
    });

    it("should switch to Spanish when setLanguage is called", () => {
        setLanguage("es");
        expect(t("required")).toBe(defaultMessages.es.required);
    });

    it("should ignore invalid language codes", () => {
        setLanguage("fr"); // not defined
        expect(t("required")).toBe(defaultMessages.en.required);
    });

    it("should replace placeholders with parameters", () => {
        const msg = t("minLength", { length: 5 });
        expect(msg).toBe("Must be at least 5 characters");
    });

    it("should handle multiple placeholders", () => {
        const custom = {
            en: {
                greeting: "Hello {name}, you have {count} messages",
            },
        };
        // temporarily patch defaultMessages
        (defaultMessages as any).en.greeting = custom.en.greeting;

        const msg = t("greeting", { name: "Alice", count: 3 });
        expect(msg).toBe("Hello Alice, you have 3 messages");
    });

    it("should return the key itself if not found", () => {
        expect(t("nonExistingKey")).toBe("nonExistingKey");
    });
});
