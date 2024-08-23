<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 class="text-sm md:text-2xl font-bold text-gray-900">SANGO-NRB</h1>
      <nav class="flex items-center justify-between w-full sm:w-auto">
        <div class="flex space-x-3">
          <RouterLink to="/" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
            Home
          </RouterLink>
          <RouterLink to="/about" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
            Contact
          </RouterLink>
          <RouterLink v-if="user" to="/profile" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
            Profile
          </RouterLink>
        </div>
        <div class="flex items-center space-x-4 ml-4 mt-4 sm:mt-0">
          <div v-if="user" class="flex items-center">
            <span class="inline-block w-3 h-3 bg-green-700 rounded-full mr-2"></span>
            <span><strong>{{ user.name }}</strong></span>
          </div>
          <LogoutBtn v-if="user" />
          <LoginBtn v-else />
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '../stores/auth.js';
  
  import LoginBtn from './LoginBtn.vue';
  import LogoutBtn from './LogoutBtn.vue';
  
  const { user } = storeToRefs(useAuthStore());
  </script>
  