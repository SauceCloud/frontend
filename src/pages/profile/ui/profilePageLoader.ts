import type { LoaderFunction } from 'react-router-dom'
import { authInitPromise } from '@/app/layouts/rootLayout'
import { store } from '@/app/providers/store'
import { selectCurrentUser, usersApi, type IUser } from '@/entities/user'
import { isRtkqError } from '@/shared/api'

export type ProfileLoaderData =
  | {
      kind: 'me'
      username: string
    }
  | {
      kind: 'other'
      username: string
      user: IUser
    }

export const profilePageLoader: LoaderFunction = async ({ params }) => {
  await authInitPromise

  const username = params.username
  if (!username)
    throw new Response('Username param is required', { status: 400 })

  const state = store.getState()
  const me = selectCurrentUser(state)

  if (me?.username === username) return { kind: 'me', username }

  try {
    const user = await store
      .dispatch(usersApi.endpoints.getByUsername.initiate({ username }))
      .unwrap()

    return { kind: 'other', username, user }
  } catch (error) {
    if (isRtkqError(error) && error.status === 404)
      throw new Response('User not found', { status: 404 })

    throw new Response('Failed to load profile', { status: 500 })
  }
}
