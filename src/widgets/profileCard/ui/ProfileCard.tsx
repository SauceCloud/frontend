import { type IUser } from '@/entities/user'
import { EditProfileDialog } from '@/features/user/edit-profile'
import { AvatarEditable } from '@/features/user/update-avatar'
import { Card, CardContent } from '@/shared/ui/card'
import { ProfileInfo } from './ProfileInfo'

type Props = {
  user: IUser
}

export const ProfileCard = ({ user }: Props) => {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <Card className="overflow-hidden">
        <CardContent className="space-y-4">
          <div className="group/card relative flex gap-6">
            <AvatarEditable user={user} />
            <ProfileInfo user={user} />

            <div className="invisible absolute top-0 right-0 opacity-0 group-hover/card:visible group-hover/card:opacity-100">
              <EditProfileDialog />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
