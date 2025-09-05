export const passwordStrengthProgress = (value: string): number => {
    const hasLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*]/.test(value);

    const criteria = [hasLength, hasUpper, hasLower, hasNumber, hasSymbol];
    const score = criteria.reduce((acc, v) => acc + (v ? 1 : 0), 0);

    // If length is missing, scale points proportionally to 4/5 instead of 100
    const progress = hasLength ? (score / 5) * 100 : (score / 5) * 75;

    return Math.min(100, progress);
};
