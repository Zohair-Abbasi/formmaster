export const ariaError = (id: string, message: string): string => {
    return `<span id="${id}" role="alert" aria-live="polite">${message}</span>`;
};
