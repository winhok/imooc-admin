import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export const login = (data: LoginParams) => {
  return request<LoginResult>({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
