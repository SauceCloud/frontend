import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AuthSessionState = {
  accessToken?: string
  authStatus: 'loading' | 'authenticated' | 'unauthenticated'
}

const initialState: AuthSessionState = {
  accessToken: undefined,
  authStatus: 'loading',
}

export const authSessionSlice = createSlice({
  name: 'authSession',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
      state.authStatus = 'authenticated'
    },
    logout(state) {
      state.accessToken = undefined
      state.authStatus = 'unauthenticated'
    },
  },
})

export const authSessionActions = authSessionSlice.actions
export const authSessionReducer = authSessionSlice.reducer
