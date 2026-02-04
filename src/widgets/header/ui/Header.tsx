import { Link } from 'react-router-dom'
import { AuthButtons } from './AuthButtons'

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 mx-auto h-20 max-w-5xl bg-white">
      <div className="flex h-full items-center justify-between px-2">
        <div className="flex items-center gap-1">
          <Link to="/">
            <img src="/logo.svg" alt="Logo" width={70} height={70} />
          </Link>
          <h1 className="text-4xl font-bold">Tell&lsquo;em</h1>
        </div>

        <AuthButtons />
      </div>
    </header>
  )
}
