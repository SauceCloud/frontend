import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { LoginForm } from './LoginForm'

type Props = {
  trigger: ReactNode
}

export const LoginDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('auth')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('login.title')}</DialogTitle>
          <DialogDescription>{t('login.description')}</DialogDescription>
        </DialogHeader>
        <LoginForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
