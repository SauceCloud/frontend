import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import type { ApiErrorResponse } from '../model/types'

export function applyApiErrorToForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  error: ApiErrorResponse,
  mapField?: (serverField: string) => FieldPath<T> | null,
) {
  if (error.code === 'VALIDATION_FAILED') {
    const fields = error.details?.fields ?? {}

    for (const [serverField, codes] of Object.entries(fields)) {
      if (!codes.length) continue

      const field = mapField?.(serverField)
      if (!field) continue

      const msg = `validation:fields.${serverField}.${codes[0].code}`
      form.setError(field, { type: 'server', message: msg })
    }
    return
  }

  const msg = `auth:errors.${error.code}`
  form.setError('root', { type: 'server', message: msg })
}
