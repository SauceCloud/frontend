import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSelector } from '@/app/providers/store'
import { selectCurrentUser } from '@/entities/user'
import { useLogoutMutation } from '@/features/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export const UserMenu = () => {
  const [logout] = useLogoutMutation()
  const { t } = useTranslation('common')
  const user = useSelector(selectCurrentUser)

  if (!user) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar size="lg">
            <AvatarImage src={user.avatarUrl} alt="avatar" />
            <AvatarFallback>
              {user.username[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" sideOffset={6} align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            <Link to="/profile">{t('nav.profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            <Link to="/settings">{t('nav.settings')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={() => logout()}>
            <LogOutIcon />
            {t('actions.logout')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
