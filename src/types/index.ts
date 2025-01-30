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

export interface ITask {
  id: IdType
  title: string
  desciption: string
  price: number
  completed: boolean
  userId?: IdType
}

export interface IBoost {
  id: IdType
  title: string
  descritpion: string
  price: number
  completed: boolean
  userId?: number
}

export interface TelegramInitData {
  user?: TelegramUser;
  auth_date: number;
  hash: string;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
  level: number
  tapsLimit: number
  coins: number
}