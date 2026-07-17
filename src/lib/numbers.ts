export function toPositiveNumber(value: string): number | null {
  if (value === "") return null;
  const parsed = Number(value);
  return parsed > 0 ? parsed : null;
}
