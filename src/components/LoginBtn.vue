<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const onLogin = ()=> {
  router.push('/login')}
</script>

<template>
  <button class="btn border border-cyan-600 hover:bg-cyan-600 hover:text-white" @click="onLogin">Login</button>
</template>
