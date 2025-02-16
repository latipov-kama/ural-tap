export interface TelegramInitData {
  user?: TelegramUser;
  auth_date: number;
  hash: string;
  signature: string
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username: string;
  photo_url?: string;
  languageCode: string
}

export interface User {
  id: number,
  username: string,
  firstName?: string,
  telegramId: number,
  balance: number,
  referralCode: string,
  createdAt?: string,
  updatedAt?: string,
}