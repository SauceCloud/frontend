import { useTranslation } from 'react-i18next'
import { LoginDialog, RegisterDialog } from '@/features/auth'
import { Button } from '@/shared/ui/button'

export const AuthButtons = () => {
  const { t } = useTranslation('auth')

  return (
    <div className="flex gap-2">
      <LoginDialog trigger={<Button size="lg">{t('login.title')}</Button>} />
      <RegisterDialog
        trigger={
          <Button size="lg" variant="secondary">
            {t('register.title')}
          </Button>
        }
      />
    </div>
  )
}
