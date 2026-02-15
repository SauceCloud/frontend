import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from './types'

type CurrentUserState = {
  user?: IUser
}

const initialState: CurrentUserState = {
  user: undefined,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = undefined
    },
  },
})

export const currentUserActions = currentUserSlice.actions
export const currentUserReducer = currentUserSlice.reducer
