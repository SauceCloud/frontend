import { useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { selectCurrentUser } from '@/entities/user'
import { ProfileCard } from '@/widgets/profileCard'
import type { ProfileLoaderData } from './profilePageLoader'

export const ProfilePage = () => {
  const loaderData: ProfileLoaderData = useLoaderData()
  const currentUser = useSelector(selectCurrentUser)

  if (loaderData.kind === 'me') return <ProfileCard user={currentUser!} />

  return <div>{JSON.stringify(loaderData.user)}</div>
}
