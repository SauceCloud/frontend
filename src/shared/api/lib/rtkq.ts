import type { RtkqRejected } from '../model/types'

export function isRtkqError(error: unknown): error is RtkqRejected {
  return (
    !!error && typeof error === 'object' && 'status' in error && 'data' in error
  )
}
