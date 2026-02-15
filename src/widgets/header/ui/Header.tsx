import { Link } from 'react-router-dom'
import { useSelector } from '@/app/providers/store'
import { selectAuthStatus } from '@/features/auth'
import { AuthButtons } from './AuthButtons'
import { UserMenu } from './UserMenu'

export const Header = () => {
  const authStatus = useSelector(selectAuthStatus)

  return (
    <header className="sticky top-0 z-40 h-20 bg-white">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-1">
          <img src="/logo.svg" alt="Logo" width={70} height={70} />
          <h1 className="text-4xl font-bold">Tell&lsquo;em</h1>
        </Link>

        {authStatus === 'authenticated' ? <UserMenu /> : <AuthButtons />}
      </div>
    </header>
  )
}
