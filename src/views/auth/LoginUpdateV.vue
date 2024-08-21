<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-cyan-600 text-center mb-6">Update Password</h1>

      <form @submit.prevent="handleUpdatePassword">
        <div class="mb-4">
          <label for="newPassword" class="block text-gray-700 font-semibold mb-2">New Password</label>
          <input v-model="newPassword" type="password" id="newPassword" class="w-full p-3 border rounded"
            placeholder="Enter your new password" required />
        </div>

        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="w-full p-3 border rounded"
            placeholder="Confirm your new password" required />
        </div>

        <button type="submit" class="w-full bg-cyan-600 text-white py-3 rounded hover:bg-cyan-700">
          Update Password
        </button>
      </form>
      <p v-if="passwordMismatch" class="text-red-600 mt-4 text-center">Passwords do not match!.</p>
      <p v-if="passwordRepeated" class="text-red-600 mt-4 text-center">Can't update with previous password! Chose a New Password</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth.js'
import { useLoadingStore } from '../../stores/loadingStore.js'

const newPassword = ref('');
const confirmPassword = ref('');
const passwordMismatch = ref(false);
const passwordRepeated = ref(false);
const route = useRoute();
const router = useRouter();

const handleUpdatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    passwordMismatch.value = true;
    passwordRepeated.value = false
  } else if (newPassword.value == atob(route.query.password)) {
    passwordMismatch.value = false;
    passwordRepeated.value = true
  }
  else {
    // Proceed with password update logic
    try {
      const username = route.query.username
      useLoadingStore().startLoading()
      const res = await useAuthStore().updateLogin(username, newPassword.value)
      useLoadingStore().stopLoading()
      router.push('/');
    } catch (error) {
      console.log(error);
    }

  }
};
</script>

<style>
/* Additional custom styles can be added if necessary */
</style>