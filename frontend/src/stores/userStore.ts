import axios from 'axios'

import { defineStore } from 'pinia'
import { IUser } from '../models/user.model'

import {
  authHeaders,
  getLocalAccessToken,
  getLocalUser
} from '../services/auth.service'

const base_url =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000/api'

export type UserState = {
  user: null | IUser
  loggedIn: boolean
}

export const useUserStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: 'user',
  state: () =>
    ({
      user: getLocalUser(),
      loggedIn: !!getLocalAccessToken()
    } as UserState),
  actions: {
    async logIn(payload: any) {
      try {
        const user = await axios.post(`${base_url}/auth/login`, {
          email: payload.email,
          password: payload.password
        })

        this.user = user.data
        this.loggedIn = true
        localStorage.setItem('user', JSON.stringify(user.data))
        return true
      } catch (error) {
        return false
      }
    },
    async signup(payload: any) {
      try {
        const user = await axios.post(`${base_url}/auth/signup`, payload)

        this.user = user.data
        this.loggedIn = true
        localStorage.setItem('user', JSON.stringify(user.data))
        return true
      } catch (error) {
        return false
      }
    },
    logOut() {
      localStorage.removeItem('user')
      this.user = null
      this.loggedIn = false
    },
    async fetchUser() {
      if (!this.user?.token) return
      try {
        const fetchedUser = await axios.get(
          `${base_url}/auth/${this.user._id}`,
          {
            headers: authHeaders()
          }
        )

        return fetchedUser
      } catch (error) {
        return null
      }
    }
  },
  getters: {
    getUser(): null | IUser {
      if (!this.user) return null
      return this.user
    }
  }
})
