import type { ImageMimeType } from '@/shared/api'

export type GetAvatarUploadUrlDto = {
  contentType: ImageMimeType
  contentLength: number
}

export type GetAvatarUploadUrlResponse = {
  key: string
  uploadUrl: string
  headers: Record<string, string>
}

export type ConfirmAvatarUpdateDto = { key: string }

export type ConfirmAvatarUpdateResponse = { avatarUrl: string }
