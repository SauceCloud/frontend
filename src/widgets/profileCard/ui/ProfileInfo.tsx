import type { IUser } from '@/entities/user'
import { Typography } from '@/shared/ui/typography'

type Props = {
  user: IUser
}

export const ProfileInfo = ({ user }: Props) => {
  return (
    <div className="flex grow cursor-default flex-col justify-between">
      <Typography variant="h1" className="text-start">
        {user.username}
      </Typography>

      <Typography variant="muted" className="mt-2">
        {user.description?.trim()
          ? user.description
          : 'Добавь описание профиля - оно будет находиться здесь'}
      </Typography>

      <div className="mb-6 flex grow items-end gap-10">
        {[
          { label: 'Followers', value: 248 },
          { label: 'Following', value: 132 },
          { label: 'Tracks', value: 36 },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <Typography variant="h3" className="text-2xl">
              {stat.value}
            </Typography>
            <Typography
              variant="muted"
              className="text-xs tracking-wider uppercase"
            >
              {stat.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}
