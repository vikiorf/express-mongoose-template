import axios from 'axios'

import { defineStore } from 'pinia'

import { authHeaders } from '../services/auth.service'

const base_url = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000/api'

export const useUserStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: 'user',
  state: () => ({
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    loggedIn: localStorage.getItem('user')
      ? !!JSON.parse(localStorage.getItem('user')).token
      : null
  }),
  actions: {
    async logIn(payload) {
      try {
        const user = await axios.post(`${base_url}/auth/login`, {
          email: payload.email,
          password: payload.password
        })

        console.log(user.data)
        this.user = user.data
        this.loggedIn = true
        localStorage.setItem('user', JSON.stringify(user.data))
        return true
      } catch (error) {
        return false
      }
    },
    async signup(payload) {
      try {
        const user = await axios.post(`${base_url}/auth/signup`, payload)

        console.log(user.data)
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
      console.log(this.token)
      if (!this.token) return
      try {
        const fetchedUser = await axios.get(
          `${base_url}/auth/${this.user._id}`,
          {
            headers: authHeaders(this.user.token)
          }
        )
        console.log(fetchedUser)
        return fetchedUser
      } catch (error) {
        console.log(error)
        return null
      }
    }
  },
  getters: {
    getUser() {
      if (!this.user) return null
      return this.user
    }
  }
})
