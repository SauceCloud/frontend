import { store } from '@/app/providers/store'
import { authApi, softLogout } from '@/features/auth'
import { initDeviceId } from '@/shared/api'

export let authInitPromise: Promise<void> | undefined

export const rootLayoutLoader = async (): Promise<undefined> => {
  if (!authInitPromise) {
    authInitPromise = (async () => {
      await initDeviceId()
      try {
        await store.dispatch(authApi.endpoints.refresh.initiate()).unwrap()
      } catch {
        store.dispatch(softLogout())
      }
    })()
  }

  await authInitPromise
  return
}
