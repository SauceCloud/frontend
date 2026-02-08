import { useNavigate } from 'react-router-dom'
import { LoginDialog } from '../login/ui/LoginDialog'
import { RegisterDialog } from '../register/ui/RegisterDialog'

type Props = { mode: 'sign-in' | 'sign-up' }

export const AuthModalRoute = ({ mode }: Props) => {
  const navigate = useNavigate()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate('/', { replace: true })
    }
  }

  return mode === 'sign-in' ? (
    <LoginDialog open onOpenChange={handleOpenChange} />
  ) : (
    <RegisterDialog open onOpenChange={handleOpenChange} />
  )
}
