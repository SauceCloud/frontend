import type { RootState } from '@/app/providers/store'

export const selectAuthStatus = (s: RootState) => s.authSession.authStatus
