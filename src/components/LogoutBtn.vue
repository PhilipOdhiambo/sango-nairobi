<script setup>
import { useAuthStore } from '../stores/auth.js';
import { useLoadingStore } from '../stores/loadingStore.js';
import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useAuthStore()
const onLogout = async()=> {
  useLoadingStore().startLoading()
  try {
    await authStore.logout(localStorage.getItem('user'))
    useLoadingStore().stopLoading()
    useAuthStore().role = null
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <button class="btn border border-red-300 hover:bg-red-300" @click="onLogout">Logout</button>
</template>
