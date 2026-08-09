import { PencilIcon } from 'lucide-react'
import { useRef, useState, type ChangeEvent } from 'react'
import { UserAvatar, type IUser } from '@/entities/user'
import { isImageMimeType } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
  useConfirmAvatarUpdateMutation,
  useGetUploadUrlMutation,
} from '../api/updateAvatarApi'

type Props = {
  user: IUser
}

export const AvatarEditable = ({ user }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBusy, setIsBusy] = useState(false)
  const [getUploadUrl] = useGetUploadUrlMutation()
  const [confirmAvatarUpdate] = useConfirmAvatarUpdateMutation()

  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsBusy(true)
    const input = e.currentTarget
    const file = input.files?.[0]
    input.value = ''

    if (!file || !isImageMimeType(file.type)) {
      setIsBusy(false)
      return
    }

    try {
      const { uploadUrl, key, headers } = await getUploadUrl({
        contentType: file.type,
        contentLength: file.size,
      }).unwrap()

      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers,
        body: file,
      })

      if (!res.ok) throw new Error(`Upload failed: ${res.status}`)

      await confirmAvatarUpdate({ key }).unwrap()
    } catch (error) {
      console.log(error)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="group/avatar relative">
      <UserAvatar
        className="h-50 w-50 cursor-pointer"
        avatarUrl={user.avatarUrl}
        username={user.username}
      />

      <div className="absolute inset-0 rounded-full bg-black/0 transition-colors group-hover/avatar:bg-black/40" />

      <div className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/avatar:visible group-hover/avatar:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          disabled={isBusy}
          onClick={e => {
            e.preventDefault()
            inputRef.current?.click()
          }}
        >
          <PencilIcon className="size-8 text-white" />
        </Button>
      </div>

      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleUploadAvatar}
        accept="image/*"
      />
    </div>
  )
}
