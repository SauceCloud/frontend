import type { RootState } from '@/app/providers/store'

export const selectIsAuth = (s: RootState) => s.authSession.isAuth
