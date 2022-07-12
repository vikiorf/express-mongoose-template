<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <input type="submit" value="Login" />
  </form>
</template>

<script lang="ts">
  import { mapStores } from 'pinia'
  import { defineComponent } from 'vue'
  import { useUserStore } from '../stores/userStore'

  export default defineComponent({
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
  })
</script>

<style scoped></style>
