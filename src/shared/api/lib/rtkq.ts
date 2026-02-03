import type { RtkqRejected } from '../model/types'

export function isRtkqError(e: unknown): e is RtkqRejected {
  return !!e && typeof e === 'object' && 'status' in e && 'data' in e
}
