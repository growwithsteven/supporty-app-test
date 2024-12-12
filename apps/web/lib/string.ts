export function isEmptyStringOrNil(
  value: string | null | undefined,
): value is string {
  return value === null || value === undefined || value === "";
}
