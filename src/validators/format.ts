export const formatPhone = (value: string): string => value.replace(/\D/g, "");
export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
export const trim = (value: string): string => value.trim();
