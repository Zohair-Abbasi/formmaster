"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Validator: () => Validator,
  aiPasswordTips: () => aiPasswordTips,
  ariaError: () => ariaError,
  asyncUsernameCheck: () => asyncUsernameCheck,
  capitalize: () => capitalize,
  currentLang: () => currentLang,
  defaultMessages: () => defaultMessages,
  formatPhone: () => formatPhone,
  maxLength: () => maxLength,
  minLength: () => minLength,
  passwordStrength: () => passwordStrength,
  passwordStrengthProgress: () => passwordStrengthProgress,
  regex: () => regex,
  required: () => required,
  setLanguage: () => setLanguage,
  smartEmail: () => smartEmail,
  t: () => t,
  trim: () => trim,
  validate: () => validate,
  validateEmail: () => validateEmail,
  validateIBAN: () => validateIBAN,
  validateVAT: () => validateVAT
});
module.exports = __toCommonJS(index_exports);

// src/validators/core.ts
var required = (value) => ({
  valid: value.trim() !== "",
  message: value.trim() ? void 0 : "This field is required"
});
var minLength = (length) => (value) => ({
  valid: value.length >= length,
  message: value.length >= length ? void 0 : `Must be at least ${length} characters`
});
var maxLength = (length) => (value) => ({
  valid: value.length <= length,
  message: value.length <= length ? void 0 : `Must be no more than ${length} characters`
});
var regex = (pattern, message) => (value) => ({
  valid: pattern.test(value),
  message: pattern.test(value) ? void 0 : message
});
var smartEmail = (value) => {
  const trimmed = value.trim().toLowerCase();
  const commonTypos = {
    "gmial.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "yaho.com": "yahoo.com"
  };
  const domain = trimmed.split("@")[1];
  const suggestion = domain && commonTypos[domain];
  return {
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed),
    message: suggestion ? `Did you mean "${trimmed.split("@")[0]}@${suggestion}"?` : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? void 0 : "Invalid email address"
  };
};

// src/validators/email.ts
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var commonDomains = ["gmail.com", "yahoo.com", "outlook.com"];
var validateEmail = (value) => {
  const base = regex(emailPattern, "Invalid email format")(value);
  if (!base.valid) return base;
  const [_, domain] = value.split("@");
  const suggestion = commonDomains.find((d) => d.toLowerCase() === domain.toLowerCase()) ? void 0 : commonDomains[0];
  return {
    valid: true,
    suggestions: suggestion ? [`Did you mean ${value.split("@")[0]}@${suggestion}?`] : void 0
  };
};

// src/validators/password.ts
var passwordStrength = (value) => {
  const lengthScore = value.length >= 8 ? 1 : 0;
  const upper = /[A-Z]/.test(value) ? 1 : 0;
  const lower = /[a-z]/.test(value) ? 1 : 0;
  const number = /[0-9]/.test(value) ? 1 : 0;
  const symbol = /[!@#$%^&*]/.test(value) ? 1 : 0;
  const score = lengthScore + upper + lower + number + symbol;
  let strength = "weak";
  if (score >= 4) strength = "strong";
  else if (score >= 3) strength = "medium";
  const tips = [];
  if (!upper) tips.push("Add an uppercase letter");
  if (!lower) tips.push("Add a lowercase letter");
  if (!number) tips.push("Add a number");
  if (!symbol) tips.push("Add a symbol (!@#$%)");
  return {
    valid: score >= 3,
    strength,
    tips
  };
};

// src/validators/format.ts
var formatPhone = (value) => value.replace(/\D/g, "");
var capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
var trim = (value) => value.trim();

// src/validators/async.ts
var asyncUsernameCheck = (apiEndpoint) => {
  return async (value) => {
    try {
      const res = await fetch(`${apiEndpoint}?username=${value}`);
      const data = await res.json();
      return { valid: !data.taken, message: data.taken ? "Username is already taken" : void 0 };
    } catch (e) {
      return { valid: false, message: "Validation API failed" };
    }
  };
};

// src/validators/schema.ts
var Validator = class {
  constructor(value) {
    this.rules = [];
    this.value = value;
  }
  required() {
    this.rules.push((v) => v.trim() ? { valid: true } : { valid: false, message: "Required" });
    return this;
  }
  min(length) {
    this.rules.push((v) => v.length >= length ? { valid: true } : { valid: false, message: `Min ${length}` });
    return this;
  }
  max(length) {
    this.rules.push((v) => v.length <= length ? { valid: true } : { valid: false, message: `Max ${length}` });
    return this;
  }
  email() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.rules.push((v) => pattern.test(v) ? { valid: true } : { valid: false, message: "Invalid email" });
    return this;
  }
  validate() {
    for (const rule of this.rules) {
      const res = rule(this.value);
      if (!res.valid) return res;
    }
    return { valid: true };
  }
};
var validate = (value) => new Validator(value);

// src/validators/i18n.ts
var defaultMessages = {
  en: {
    required: "This field is required",
    invalidEmail: "Invalid email format",
    minLength: "Must be at least {length} characters",
    maxLength: "Must be no more than {length} characters",
    usernameTaken: "Username is already taken",
    invalidIBAN: "Invalid IBAN number"
  },
  es: {
    required: "Este campo es obligatorio",
    invalidEmail: "Formato de correo no v\xE1lido",
    minLength: "Debe tener al menos {length} caracteres",
    maxLength: "No debe exceder {length} caracteres",
    usernameTaken: "El nombre de usuario ya existe",
    invalidIBAN: "N\xFAmero IBAN inv\xE1lido"
  }
};
var currentLang = "en";
var setLanguage = (lang) => {
  if (defaultMessages[lang]) currentLang = lang;
};
var t = (key, params) => {
  let msg = defaultMessages[currentLang][key] || key;
  if (params) {
    Object.keys(params).forEach((k) => {
      msg = msg.replace(`{${k}}`, String(params[k]));
    });
  }
  return msg;
};

// src/validators/ai.ts
var aiPasswordTips = (password) => {
  const tips = [];
  if (!/[A-Z]/.test(password)) tips.push("Add an uppercase letter");
  if (!/[a-z]/.test(password)) tips.push("Add a lowercase letter");
  if (!/[0-9]/.test(password)) tips.push("Add a number");
  if (!/[!@#$%^&*]/.test(password)) tips.push("Add a symbol (!@#$%)");
  return {
    valid: tips.length <= 2,
    tips
  };
};

// src/validators/accessibility.ts
var ariaError = (id, message) => {
  return `<span id="${id}" role="alert" aria-live="polite">${message}</span>`;
};

// src/validators/gamify.ts
var passwordStrengthProgress = (value) => {
  const score = (value.length >= 8 ? 1 : 0) + (/[A-Z]/.test(value) ? 1 : 0) + (/[a-z]/.test(value) ? 1 : 0) + (/[0-9]/.test(value) ? 1 : 0) + (/[!@#$%^&*]/.test(value) ? 1 : 0);
  return Math.min(100, score / 5 * 100);
};

// src/validators/domain.ts
var validateIBAN = (iban) => {
  const pattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  return { valid: pattern.test(iban), message: pattern.test(iban) ? void 0 : "Invalid IBAN number" };
};
var validateVAT = (vat) => {
  const pattern = /^[A-Z]{2}\d{8,12}$/;
  return { valid: pattern.test(vat), message: pattern.test(vat) ? void 0 : "Invalid VAT number" };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Validator,
  aiPasswordTips,
  ariaError,
  asyncUsernameCheck,
  capitalize,
  currentLang,
  defaultMessages,
  formatPhone,
  maxLength,
  minLength,
  passwordStrength,
  passwordStrengthProgress,
  regex,
  required,
  setLanguage,
  smartEmail,
  t,
  trim,
  validate,
  validateEmail,
  validateIBAN,
  validateVAT
});
