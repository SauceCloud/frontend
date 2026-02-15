export function pickDirty<T extends Record<string, unknown>>(
  data: T,
  dirty: Partial<Record<keyof T, boolean>>,
) {
  const out: Partial<T> = {}

  for (const [key, isDirty] of Object.entries(dirty)) {
    if (isDirty) {
      out[key as keyof T] = data[key as keyof T]
    }
  }

  return out
}
