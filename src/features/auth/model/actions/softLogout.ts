import type { AppDispatch } from '@/app/providers/store'
import { currentUserActions } from '@/entities/user'
import { authSessionActions } from '../slice'

// eslint-disable-next-line unicorn/consistent-function-scoping
export const softLogout = () => (dispatch: AppDispatch) => {
  dispatch(authSessionActions.logout())
  dispatch(currentUserActions.clearUser())
}
