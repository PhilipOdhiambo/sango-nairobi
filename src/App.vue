<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useLoadingStore } from './stores/loadingStore';
import { useDataStore } from './stores/dataStore';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import ModalForRouting from '@/components/ModalForRouting.vue'
import LoginBtn from './components/LoginBtn.vue';
import LogoutBtn from './components/LogoutBtn.vue';
import Navigation from './components/Navigation.vue';

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const loadingStore = useLoadingStore()
const dataStore = useDataStore()


</script>
<template>
  <div class="w-11/12 mx-auto">
    <!-- <Navigation/> -->
    <header class="bg-white shadow">
      <Navigation></Navigation>
    </header>

    <ModalForRouting v-if="loadingStore.isLoading" />

    <RouterView />
  </div>

</template>
