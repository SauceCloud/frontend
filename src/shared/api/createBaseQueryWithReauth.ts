import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { getDeviceId } from './lib/deviceId'
import type { AuthToken } from './model/types'

type GetToken<S> = (state: S) => string | null
type DispatchAction = { type: string; payload?: unknown }

type CreateArgs<S> = {
  baseUrl: string
  getToken: GetToken<S>
  setTokenAction: (accessToken: string) => DispatchAction
  logoutAction: () => DispatchAction
  isAuthEndpoint?: (url: string) => boolean
  refreshPath?: string
}

const mutex = new Mutex()

export function createBaseQueryWithReauth<S>({
  baseUrl,
  getToken,
  setTokenAction,
  logoutAction,
  refreshPath = '/auth/refresh',
  isAuthEndpoint = url =>
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh'),
}: CreateArgs<S>): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getToken(getState() as S)
      if (token) headers.set('authorization', `Bearer ${token}`)
      headers.set('x-device-id', getDeviceId())
      return headers
    },
  })

  return async (args, api, extraOptions) => {
    const url = typeof args === 'string' ? args : args.url
    const skipRefresh = isAuthEndpoint(url)

    await mutex.waitForUnlock()
    let result = await rawBaseQuery(args, api, extraOptions)

    if (!skipRefresh && result.error?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const refreshResult = await rawBaseQuery(
            { url: refreshPath, method: 'POST' },
            api,
            extraOptions,
          )

          if (refreshResult.data && typeof refreshResult.data === 'object') {
            const accessToken = (refreshResult.data as AuthToken)
              .accessToken as string | undefined
            if (accessToken) {
              api.dispatch(setTokenAction(accessToken))
              result = await rawBaseQuery(args, api, extraOptions)
            } else {
              api.dispatch(logoutAction())
            }
          } else {
            api.dispatch(logoutAction())
          }
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await rawBaseQuery(args, api, extraOptions)
      }
    }

    return result
  }
}
