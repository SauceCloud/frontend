import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/app/api'
import { currentUserActions } from '@/entities/user'
import { authSessionActions } from '../model/slice'
import type { AuthResponse, LoginDto, RegisterDto } from '../model/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, RegisterDto>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(authSessionActions.setAccessToken(data.accessToken))
        dispatch(currentUserActions.setUser(data.user))
      },
    }),
    login: builder.mutation<AuthResponse, LoginDto>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(authSessionActions.setAccessToken(data.accessToken))
        dispatch(currentUserActions.setUser(data.user))
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } finally {
          dispatch(authSessionActions.logout())
          dispatch(currentUserActions.clearUser())
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi
