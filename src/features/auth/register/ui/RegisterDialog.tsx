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
import { RegisterForm } from './RegisterForm'

type Props = {
  trigger: ReactNode
}

export const RegisterDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('auth')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('register.title')}</DialogTitle>
          <DialogDescription>{t('register.description')}</DialogDescription>
        </DialogHeader>
        <RegisterForm onSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
