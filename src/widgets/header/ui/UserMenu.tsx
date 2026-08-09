import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from '@/app/providers/store'
import { selectCurrentUser, UserAvatar } from '@/entities/user'
import { useLogoutMutation } from '@/features/auth'
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
  const navigate = useNavigate()

  if (!user) return

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            username={user.username}
            size="lg"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" sideOffset={6} align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon />
            <Link to={`/${user.username}`}>{t('nav.profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            <Link to="/settings">{t('nav.settings')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon />
            {t('actions.logout')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
