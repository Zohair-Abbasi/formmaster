type Messages = Record<string, Record<string, string>>;

export const defaultMessages: Messages = {
    en: {
        required: "This field is required",
        invalidEmail: "Invalid email format",
        minLength: "Must be at least {length} characters",
        maxLength: "Must be no more than {length} characters",
        usernameTaken: "Username is already taken",
        invalidIBAN: "Invalid IBAN number",
    },
    es: {
        required: "Este campo es obligatorio",
        invalidEmail: "Formato de correo no válido",
        minLength: "Debe tener al menos {length} caracteres",
        maxLength: "No debe exceder {length} caracteres",
        usernameTaken: "El nombre de usuario ya existe",
        invalidIBAN: "Número IBAN inválido",
    },
};

export let currentLang = "en";

export const setLanguage = (lang: string) => {
    if (defaultMessages[lang]) currentLang = lang;
};

export const t = (key: string, params?: Record<string, string | number>): string => {
    let msg = defaultMessages[currentLang][key] || key;
    if (params) {
        Object.keys(params).forEach(k => {
            msg = msg.replace(`{${k}}`, String(params[k]));
        });
    }
    return msg;
};
