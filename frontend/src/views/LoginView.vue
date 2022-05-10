<template>
  <form @submit.prevent="login">
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <input type="submit" value="Login" />
  </form>
</template>

<script>
  import { mapStores } from 'pinia'
  import { useUserStore } from '../stores/userStore'

  export default {
    data() {
      return {
        email: null,
        password: null
      }
    },
    computed: {
      ...mapStores(useUserStore)
    },
    methods: {
      login() {
        this.userStore.logIn({ email: this.email, password: this.password })
      }
    }
  }
</script>

<style scoped></style>
