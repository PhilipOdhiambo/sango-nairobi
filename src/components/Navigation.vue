<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    <h1 class="text-sm md:text-2xl font-bold text-gray-900">SANGO-NRB</h1>
    <nav class="flex items-center justify-between w-full sm:w-auto">
      <div class="flex space-x-3">
        <RouterLink to="/" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
          Home
        </RouterLink>
        <RouterLink v-if="['admin'].includes(authStore.role)" to="/admin" class="text-gray-600 hover:text-gray-900"
          active-class="text-cyan-600 font-bold">
          ADMIN
        </RouterLink>
        <RouterLink to="/about" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
          Contact
        </RouterLink>
        <RouterLink v-if="authStore.role" to="/profile" class="text-gray-600 hover:text-gray-900"
          active-class="text-cyan-600 font-bold">
          MyProfile
        </RouterLink>
      </div>
      <div class="flex items-center space-x-4 ml-4 mt-4 sm:mt-0">
        <div v-if="authStore.user" class="flex items-center">
          <span class="inline-block w-3 h-3 bg-green-700 rounded-full mr-2"></span>
          <span><strong>{{ authStore.user }}</strong></span>
        </div>
        <LogoutBtn v-if="authStore.role" />
        <LoginBtn v-else />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.js';
import { useConstStore } from '../stores/consts';
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()
const user = authStore.user;
const userRole = authStore.user;

import LoginBtn from './LoginBtn.vue';
import LogoutBtn from './LogoutBtn.vue';

onMounted(async()=> {
  const url = useConstStore().url
  const token = localStorage.getItem('user')
  try {
    
    const res = await (await (fetch(`${url}?route=auth-user&token=${token}`))).json()
    authStore.user = res.user
    authStore.role = res.role
  } catch (error) {
    console.log(error)
  }
})

</script>