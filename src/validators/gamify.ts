export const passwordStrengthProgress = (value: string): number => {
    const score =
        (value.length >= 8 ? 1 : 0) +
        (/[A-Z]/.test(value) ? 1 : 0) +
        (/[a-z]/.test(value) ? 1 : 0) +
        (/[0-9]/.test(value) ? 1 : 0) +
        (/[!@#$%^&*]/.test(value) ? 1 : 0);
    return Math.min(100, (score / 5) * 100);
};
