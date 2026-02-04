import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AuthSessionState = {
  accessToken?: string
  isAuth: boolean
}

const initialState: AuthSessionState = {
  accessToken: undefined,
  isAuth: false,
}

export const authSessionSlice = createSlice({
  name: 'authSession',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
      state.isAuth = true
    },
    logout(state) {
      state.accessToken = undefined
      state.isAuth = false
    },
  },
})

export const authSessionActions = authSessionSlice.actions
export const authSessionReducer = authSessionSlice.reducer
