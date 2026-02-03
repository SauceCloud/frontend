import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from './types'

type CurrentUserState = {
  user: IUser | null
}

const initialState: CurrentUserState = {
  user: null,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
