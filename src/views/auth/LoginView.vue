<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold text-cyan-600 text-center mb-6">Login</h1>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="username" class="block text-gray-700 font-semibold mb-2">Username</label>
                    <input v-model="username" type="text" id="username" class="w-full p-3 border rounded"
                        placeholder="Enter your username" required />
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
                    <input v-model="password" type="password" id="password" class="w-full p-3 border rounded"
                        placeholder="Enter your password" required />
                </div>

                <button type="submit" class="w-full bg-cyan-600 text-white py-3 rounded hover:bg-cyan-700">
                    Login
                </button>
            </form>

            <div v-if="showWelcomeDialog" class="mt-6 p-4 bg-cyan-100 border border-cyan-600 rounded-lg text-center">
                <p>Welcome! It looks like you're logging in for the first time.</p>
                <button @click="goToUpdatePassword"
                    class="mt-4 bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700">
                    Click To Update Your Password
                </button>
            </div>
            <div v-if="showLoginFailure" class="mt-6 p-4 bg-red-100 border border-red-600 rounded-lg text-center">
                <p>Login failed ! Confirm Username and Password.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoadingStore } from '../../stores/loadingStore.js'
import { useAuthStore } from '../../stores/auth.js'

const username = ref('');
const password = ref('');
const showWelcomeDialog = ref(false);
const showLoginFailure = ref(false);
const router = useRouter();
const route = useRoute()

const handleLogin = async () => {
    // Server-side check for default credentials
    useLoadingStore().startLoading()
    const userStatus = await useAuthStore().login(username.value, password.value)
    if (userStatus == 'new') {
        useLoadingStore().stopLoading()
        // First time login
        showWelcomeDialog.value = true;
        showLoginFailure.value = false; // Clears any error a new login person made
    } else if (userStatus == 'ok') {
        // Proceed with normal login flow
        console.log('Logging in...');
        const loginStatus = await useAuthStore().login(username.value, password.value)
        if (loginStatus == 'ok') {
            useLoadingStore().stopLoading()
            router.push(route.query.redirect || '/')
        }
    } else {
        // Login Failure
        useLoadingStore().stopLoading()
        showLoginFailure.value = true
    }
};

const goToUpdatePassword = () => {
    router.push({
        path:'/login-update',
        query:{username:username.value,password:btoa(password.value)}
    });
};
</script>

<style>
/* Additional custom styles can be added if necessary */
</style>