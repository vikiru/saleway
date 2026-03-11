/**
 * Safely converts a value to a number.
 * Defaults to 0 if the value is null, undefined, or cannot be parsed as a number.
 */
export function toNum(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}
