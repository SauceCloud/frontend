import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLazyGetMeQuery } from '@/entities/user'
import { initDeviceId } from '@/shared/api'
import RootLayout from './layouts/RootLayout'

const App = () => {
  const [getMe] = useLazyGetMeQuery()

  useEffect(() => {
    initDeviceId()
    getMe()
  }, [getMe])

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<p>Tell'em</p>} />
      </Route>
    </Routes>
  )
}

export default App
