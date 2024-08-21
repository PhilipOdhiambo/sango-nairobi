<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 class="text-5xl font-bold text-cyan-600 mb-4">403</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">Unauthorized Access</h2>
      <p class="text-gray-600 mb-8">Sorry, you don't have permission to access this page.</p>
      <button @click="goBack" class="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700">
        Go Back to Home
      </button>
    </div>
  </template>
  
  <script setup>
  const goBack = () => {
    window.location.href = '/'; // Replace with your home route
  };
  </script>
  
  <style>
  /* Additional custom styles can be added if necessary */
  </style>
  