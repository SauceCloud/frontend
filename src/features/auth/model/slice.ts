import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated'

type AuthSessionState = {
  accessToken?: string
  authStatus: AuthStatus
}

const initialState: AuthSessionState = {
  accessToken: undefined,
  authStatus: 'unknown',
}

export const authSessionSlice = createSlice({
  name: 'authSession',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
      state.authStatus = 'authenticated'
    },
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.authStatus = action.payload
    },
    logout(state) {
      state.accessToken = undefined
      state.authStatus = 'unauthenticated'
    },
  },
})

export const authSessionActions = authSessionSlice.actions
export const authSessionReducer = authSessionSlice.reducer
