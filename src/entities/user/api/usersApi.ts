import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/app/api'
import { currentUserActions } from '../model/slice'
import type { IUser } from '../model/types'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: builder => ({
    getMe: builder.query<IUser, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(currentUserActions.setUser(data))
      },
    }),

    getByUsername: builder.query<IUser, { username: string }>({
      query: args => ({
        url: `/users/by-username/${args.username}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useLazyGetMeQuery } = usersApi
