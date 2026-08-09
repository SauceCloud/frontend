import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { usersApi, currentUserReducer } from '@/entities/user'
import { authApi, authSessionReducer } from '@/features/auth'
import { editProfileApi } from '@/features/user/edit-profile'
import { updateAvatarApi } from '@/features/user/update-avatar'

const rootReducer = combineReducers({
  authSession: authSessionReducer,
  currentUser: currentUserReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [editProfileApi.reducerPath]: editProfileApi.reducer,
  [updateAvatarApi.reducerPath]: updateAvatarApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: gdm =>
    gdm().concat(
      authApi.middleware,
      usersApi.middleware,
      editProfileApi.middleware,
      updateAvatarApi.middleware,
    ),
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
