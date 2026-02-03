import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'

const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
