export interface IUserBase {
  username: string
  description: string | null
}

export interface IUser extends IUserBase {
  birthDate: string
  description: string | null
  email: string
}
