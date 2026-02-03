import { authSessionActions } from '@/features/auth/model/slice'
import { createBaseQueryWithReauth } from '@/shared/api'
import { API_URL } from '@/shared/config/env'

type AuthStateShape = {
  authSession: {
    accessToken: string | null
  }
}

export const baseQuery = createBaseQueryWithReauth<AuthStateShape>({
  baseUrl: API_URL,
  getToken: state => state.authSession.accessToken,
  setTokenAction: token => authSessionActions.setAccessToken(token),
  logoutAction: () => authSessionActions.logout(),
})
