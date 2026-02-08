import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { RegisterForm } from './RegisterForm'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const RegisterDialog = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation('auth')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('register.title')}</DialogTitle>
          <DialogDescription>{t('register.description')}</DialogDescription>
        </DialogHeader>

        <RegisterForm />
      </DialogContent>
    </Dialog>
  )
}
