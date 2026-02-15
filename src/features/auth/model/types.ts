import type { IUser } from '@/entities/user'
import type { AuthToken } from '@/shared/api'

export interface AuthResponse extends AuthToken {
  user: IUser
}
