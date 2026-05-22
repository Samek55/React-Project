export const EMAIL_INVALID_MESSAGE = "Enter a valid email address.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Empty email is allowed (optional field). */
export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (trimmed.length > 254) return false;
  return EMAIL_PATTERN.test(trimmed);
}

export function emailValidationError(value: string): string | null {
  return isValidEmail(value) ? null : EMAIL_INVALID_MESSAGE;
}
