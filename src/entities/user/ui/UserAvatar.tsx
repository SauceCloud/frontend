import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Typography, type TypographyVariant } from '@/shared/ui/typography'

type Props = {
  avatarUrl?: string
  username: string
  fallbackVariant?: TypographyVariant
  fallbackStyles?: string
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

export const UserAvatar = ({
  avatarUrl,
  username,
  fallbackVariant = 'p',
  fallbackStyles,
  className,
  size,
}: Props) => {
  const initials = username[0].toUpperCase()

  return (
    <Avatar size={size} className={className}>
      <AvatarImage src={avatarUrl} alt={username} className="object-cover" />
      <AvatarFallback>
        <Typography variant={fallbackVariant} className={fallbackStyles}>
          {initials}
        </Typography>
      </AvatarFallback>
    </Avatar>
  )
}
