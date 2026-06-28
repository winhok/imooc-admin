import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface UserInfo {
  avatar?: string
  [key: string]: unknown
}

export const login = (data: LoginParams) => {
  return request<LoginResult>({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export const getUserInfo = () => {
  return request<UserInfo>({
    url: '/sys/profile'
  })
}
