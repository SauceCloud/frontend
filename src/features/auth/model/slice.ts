import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AuthSessionState = {
  accessToken: string | null
  isAuth: boolean
}

const initialState: AuthSessionState = {
  accessToken: null,
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
      state.accessToken = null
      state.isAuth = false
    },
  },
})

export const authSessionActions = authSessionSlice.actions
export const authSessionReducer = authSessionSlice.reducer
