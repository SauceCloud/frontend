import type { IUser } from '@/entities/user'
import type { AuthToken } from '@/shared/api'

export interface AuthResponse extends AuthToken {
  user: IUser
}

export type LoginDto = {
  email: string
  password: string
}

export type RegisterDto = {
  username: string
  birthDate: string
  email: string
  password: string
}
