<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div class=" p-6 rounded-lg flex items-center justify-center">
        
        
          <slot></slot>
        
        <div class="animate-spin rounded-full h-7 w-7 border-t-4 border-blue-300"></div>
      </div>
    </div>
  </template>
  
  <script setup>  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
  });
  </script>
  