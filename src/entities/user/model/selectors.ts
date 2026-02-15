import type { RootState } from '@/app/providers/store'

export const selectCurrentUser = (s: RootState) => s.currentUser.user
