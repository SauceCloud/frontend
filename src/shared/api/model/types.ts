export interface AuthToken {
  accessToken: string
}

export type ValidationFailedError = {
  code: 'VALIDATION_FAILED'
  message: string
  details: { fields: Record<string, Array<{ code: string }>> }
}

export type DomainError = {
  code: string
  message: string
  details?: null | Record<string, unknown>
}

export type ApiErrorResponse = ValidationFailedError | DomainError

export type RtkqRejected = {
  status: number
  data: ApiErrorResponse
}
