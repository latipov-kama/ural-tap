export type IdType = string | number

export interface IUser {
  id: IdType
  username: string
  balance: number
  friends?: IFriend[]
  level: number
  avatarUrl?: string
  tapLevel: number
}

export interface IFriend {
  id: IdType
  username: string
  bonus: number
}
