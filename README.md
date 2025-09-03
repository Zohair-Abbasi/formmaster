# FormMaster 🧩

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![npm (scoped)](https://img.shields.io/npm/v/%40zohair-abbasi%2Fformmaster)
![npm downloads](https://img.shields.io/npm/dm/%40zohair-abbasi%2Fformmaster)

Ultra-lightweight, dependency-free JavaScript form validation library.  
Smart UX-focused, AI-assisted, accessible, and gamified.

**Current Version:** 2.2.2

---

## Features

### 1. Smart UX Validator
- Human-friendly error messages instead of generic “invalid input.”
- Suggests corrections for common mistakes (e.g., Gmail typos).
- Auto-formats names, phone numbers, and other fields for better UX.

### 2. Password Strength Companion
- Provides strength score: Weak / Medium / Strong.
- Detects repeated characters or common passwords.
- Offers actionable tips for creating stronger passwords.

### 3. Auto-Formatter Validator
- Trims, capitalizes, or formats inputs automatically (phone numbers, names, credit cards).
- Validates and formats simultaneously.

### 4. Async Validator
- Supports real-time async checks (e.g., username/email availability).
- Ideal for live form feedback in modern web apps.

### 5. Schema + Chainable Validator
- Lightweight alternative to Yup or Zod.
- Chain rules easily:
```ts

validate(username).min(3).max(12).alphanumeric().validate();
```

### 6. Multi-Language Validator
Built-in i18n support for global apps.

### 7. AI-Assisted Suggestions
Optional AI-powered tips for fields like passwords or usernames.

Can integrate with OpenAI or small local ML models.

### 8. Accessible Validator
Returns ARIA-compliant messages for screen readers.

Fully compatible with form accessibility standards.

### 9. Domain / Business Rules Validator
Validates email domains, phone codes, credit cards, IBANs, VAT numbers, etc.

### 10. Fun / Gamified Validation
Progress bars for password strength or form completion.

Makes validation interactive and engaging.

### 11. Tiny & Dependency-Free
Ultra-lightweight (<3 KB)

Works in both browser and Node.js environments.

### Installation
```ts
bash
Copy code
npm install @zohair-abbasi/formmaster
```
# or
```ts 
yarn add @zohair-abbasi/formmaster
```
# or
```ts 
pnpm add @zohair-abbasi/formmaster
```
### Usage
```ts
Copy code
import {
  // core
  required,
  // smart UX
  smartEmail, smartPassword, autoCapitalize, smartPhone,
} from "@zohair-abbasi/formmaster";

// Required field
const nameValidation = required("");

// Smart email (with typo suggestions)
const emailValidation = smartEmail("user@gmial.com");

// Password strength (weak/medium/strong)
const passwordValidation = smartPassword("password123");

// Auto-capitalize name
const formattedName = autoCapitalize("john doe").formattedValue;

// Phone number suggestion (adds country code if missing)
const phoneValidation = smartPhone("1234567890");
```
Return shape: All validators return { valid: boolean, message?: string }.
Some also include helpful extras like formattedValue (e.g., autoCapitalize, smartPhone) or strength (e.g., smartPassword).

### Available Validators / Modules
core – required, minLength, maxLength, regex, plus Smart UX helpers.

email, password, format, async, schema, i18n, ai, accessibility, gamify, domain.

You can import functions directly from the package entrypoint.

### License
MIT License © 2025 Zohair Abbasi

See the [LICENSE](./LICENSE) file for details.