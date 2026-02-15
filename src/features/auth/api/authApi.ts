import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/app/api'
import { currentUserActions } from '@/entities/user'
import type { LoginDto } from '../login/model/schema'
import { softLogout } from '../model/actions/softLogout'
import { authSessionActions } from '../model/slice'
import type { AuthResponse } from '../model/types'
import type { RegisterDto } from '../register/model/schema'

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
        try {
          const { data } = await queryFulfilled
          dispatch(authSessionActions.setAccessToken(data.accessToken))
          dispatch(currentUserActions.setUser(data.user))
        } catch {
          dispatch(softLogout())
        }
      },
    }),
    login: builder.mutation<AuthResponse, LoginDto>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authSessionActions.setAccessToken(data.accessToken))
          dispatch(currentUserActions.setUser(data.user))
        } catch {
          dispatch(softLogout())
        }
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
          dispatch(softLogout())
        }
      },
    }),
    refresh: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(authSessionActions.setAccessToken(data.accessToken))
          dispatch(currentUserActions.setUser(data.user))
        } catch {
          dispatch(softLogout())
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi
