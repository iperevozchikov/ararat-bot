export function parseBoolean(value: unknown): boolean {
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return ['1', 1, 'yes', 'true', true].includes(value as string | number | boolean);
  }

  return false;
}
