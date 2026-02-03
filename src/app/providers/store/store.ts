import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { usersApi, currentUserReducer } from '@/entities/user'
import { authApi, authSessionReducer } from '@/features/auth'

const rootReducer = combineReducers({
  authSession: authSessionReducer,
  currentUser: currentUserReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: gdm => gdm().concat(authApi.middleware, usersApi.middleware),
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
