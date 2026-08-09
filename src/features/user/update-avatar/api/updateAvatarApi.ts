import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/app/api'
import { currentUserActions } from '@/entities/user'
import type {
  ConfirmAvatarUpdateDto,
  ConfirmAvatarUpdateResponse,
  GetAvatarUploadUrlDto,
  GetAvatarUploadUrlResponse,
} from '../model/types'

export const updateAvatarApi = createApi({
  reducerPath: 'updateAvatarApi',
  baseQuery,
  endpoints: builder => ({
    getUploadUrl: builder.mutation<
      GetAvatarUploadUrlResponse,
      GetAvatarUploadUrlDto
    >({
      query: body => ({
        url: '/users/me/avatar/upload-url',
        method: 'POST',
        body,
      }),
    }),

    confirmAvatarUpdate: builder.mutation<
      ConfirmAvatarUpdateResponse,
      ConfirmAvatarUpdateDto
    >({
      query: body => ({
        url: '/users/me/avatar/confirm',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(currentUserActions.updateUser({ avatarUrl: data.avatarUrl }))
      },
    }),
  }),
})

export const { useGetUploadUrlMutation, useConfirmAvatarUpdateMutation } =
  updateAvatarApi
