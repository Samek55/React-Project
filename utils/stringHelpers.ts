// ─── STRING HELPERS ───────────────────────────────────────────────────────────

// Strips non-alphabet characters from a string (used for model/name fields)
export const alphabetOnly = (value: string): string =>
  value.replace(/[^A-Za-z ]/g, "");

// Regex to validate that a string contains only letters and spaces
export const alphabetPattern: RegExp = /^[A-Za-z ]+$/;
