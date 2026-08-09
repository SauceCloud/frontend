export interface IUserBase {
  username: string
  description?: string
  avatarUrl?: string
}

export interface IUser extends IUserBase {
  birthDate: string
  email: string
}
