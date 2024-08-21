<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">SANGO-NRB</h1>
        <nav class="flex items-baseline mb-3 space-x-4">
            <div class="flex space-x-3">
                <RouterLink to="/" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold" >
                    Home
                </RouterLink>
                <RouterLink to="/about" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
                    Contact
                </RouterLink>
                <RouterLink v-if="user" to="/profile" class="text-gray-600 hover:text-gray-900" active-class="text-cyan-600 font-bold">
                    Profile
                </RouterLink>
            </div>
            <div>
                <div v-if="user" class="text-right flex justify-end items-center mt-5">
                    <div>
                        <span class="inline-block w-3 h-3 bg-green-700 rounded-full mr-2"></span>
                        <span><strong>{{ user.name }}</strong> </span>
                    </div>
                    <div class="ml-10">
                        <LogoutBtn />
                    </div>
                </div>
                <div v-else class="text-right flex justify-end items-center mt-5">
                    <div class="ml-10">
                        <LoginBtn />
                    </div>
                </div>

            </div>

        </nav>
    </div>





</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.js';

import LoginBtn from './LoginBtn.vue';
import LogoutBtn from './LogoutBtn.vue';

const { user } = storeToRefs(useAuthStore())

</script>