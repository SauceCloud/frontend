import { useSelector } from '@/app/providers/store'
import {
  LoginDialog,
  RegisterDialog,
  useLogoutMutation,
  selectIsAuth,
} from '@/features/auth'
import { Button } from '@/shared/ui/button'

export const AuthButtons = () => {
  const isAuth = useSelector(selectIsAuth)
  const [logout] = useLogoutMutation()

  return (
    <div className="flex gap-2">
      {isAuth ? (
        <Button size="lg" onClick={() => logout()}>
          Выйти
        </Button>
      ) : (
        <>
          <LoginDialog trigger={<Button size="lg">Вход</Button>} />
          <RegisterDialog
            trigger={
              <Button size="lg" variant="secondary">
                Регистрация
              </Button>
            }
          />
        </>
      )}
    </div>
  )
}
