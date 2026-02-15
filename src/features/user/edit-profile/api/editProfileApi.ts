import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/app/api'
import { currentUserActions, type IUser } from '@/entities/user'
import type { EditProfileDto } from '../model/schema'

export const editProfileApi = createApi({
  reducerPath: 'editProfileApi',
  baseQuery,
  endpoints: builder => ({
    editProfile: builder.mutation<IUser, EditProfileDto>({
      query: body => ({
        url: '/users/me',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(currentUserActions.setUser(data))
      },
    }),
  }),
})

export const { useEditProfileMutation } = editProfileApi
