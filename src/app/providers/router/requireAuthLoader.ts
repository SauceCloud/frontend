import { redirect } from 'react-router-dom'
import { authInitPromise } from '@/app/layouts/rootLayout'
import { selectAuthStatus } from '@/features/auth'
import { store } from '../store'

export const requireAuthLoader = (onlyUnAuth?: boolean) => async () => {
  await authInitPromise

  const authStatus = selectAuthStatus(store.getState())
  if (!onlyUnAuth && authStatus !== 'authenticated') throw redirect('/sign-in')
  if (onlyUnAuth && authStatus === 'authenticated') throw redirect('/profile')
  return
}
