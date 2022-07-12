import { IUser } from '../models/user.model'

const getLocalUser = (): null | IUser => {
  const localUser = localStorage.getItem('user')
  if (localUser) return JSON.parse(localUser)
  return null
}

const authHeaders = (): undefined | {} => {
  if (getLocalUser() && getLocalUser()?.token) {
    return { 'x-access-token': getLocalUser()?.token }
  } else {
    return undefined
  }
}

const getLocalAccessToken = () => {
  const user = getLocalUser()

  return user?.token
}

const getLocalRefreshToken = (): string | null => {
  const user = getLocalUser()

  return user?.refreshToken ? user.refreshToken : null
}

const updateLocalAccessToken = (accessToken: string): void => {
  let user = getLocalUser()
  if (!user) return
  user.token = accessToken
  localStorage.setItem('user', JSON.stringify(user))
}

const updateLocalRefreshToken = (refreshToken: string): void => {
  let user = getLocalUser()
  if (!user) return
  user.refreshToken = refreshToken
  localStorage.setItem('user', JSON.stringify(user))
}

const getLocalExtraToken = (): string | null => {
  return localStorage.getItem('extraToken')
}

const updateLocalExtraToken = (extraToken: string): void => {
  localStorage.setItem('extraToken', extraToken)
}

const getLocalExtraRefreshToken = (): string | null => {
  return localStorage.getItem('extraRefreshToken')
}

const setLocalExtraRefreshToken = (token: string): void => {
  localStorage.setItem('extraRefreshToken', token)
}

export {
  getLocalUser,
  authHeaders,
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  getLocalExtraToken,
  updateLocalExtraToken,
  getLocalExtraRefreshToken,
  setLocalExtraRefreshToken
}
