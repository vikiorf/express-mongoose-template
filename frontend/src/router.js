import { createRouter, createWebHistory } from 'vue-router'

import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: LoginView
    },
    {
      component: HomeView,
      path: '/'
    }
  ]
})
