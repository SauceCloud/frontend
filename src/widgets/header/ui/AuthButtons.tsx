import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button'

export const AuthButtons = () => {
  const { t } = useTranslation('auth')

  return (
    <div className="flex gap-2">
      <Link to="/sign-in">
        <Button size="lg">{t('login.title')}</Button>
      </Link>
      <Link to="/sign-up">
        <Button size="lg" variant="secondary">
          {t('register.title')}
        </Button>
      </Link>
    </div>
  )
}
