import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { LoginForm } from './LoginForm'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LoginDialog = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation('auth')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('login.title')}</DialogTitle>
          <DialogDescription>{t('login.description')}</DialogDescription>
        </DialogHeader>

        <LoginForm />
      </DialogContent>
    </Dialog>
  )
}
