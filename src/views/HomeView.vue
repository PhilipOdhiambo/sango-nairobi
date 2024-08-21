<template>
    <div class="bg-gray-50 min-h-screen flex flex-col">
        <!-- Navbar -->
        

        <!-- Hero Section -->
        <section class="bg-cyan-600 rounded-sm text-white py-20">
            <div v-if="user" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-4"> Hi, {{ user.name }} </h2>
                <p>We are very glad to have you on Board</p>
                <p class="text-lg mb-8">Manage your savings, track your loans, and connect with your community all in
                    one place.</p>

                    <RouterLink to="/profile"
                    class="bg-white text-cyan-700 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-100">
                    Checkout Your Profile
                </RouterLink>
                
            </div>
            <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-4">Join a People's Chamaa and Empower Your Savings</h2>
                <p class="text-lg mb-8">Manage your savings, track your loans, and connect with your community all in
                    one place.</p>
                <a href="#"
                    class="bg-white text-cyan-700 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-100">Get
                    Started</a>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-20 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 class="text-3xl font-bold mb-8">Features</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="p-6 bg-white rounded-lg shadow">
                        <img src="../assets/money-tracking.jpg" alt="Payment Tracking" class="mx-auto mb-4">
                        <h4 class="text-xl font-semibold mb-2">Payment Tracking</h4>
                        <p class="text-gray-600">Keep track of all your payments, attendance, fines, and more.</p>
                    </div>
                    <div class="p-6 bg-white rounded-lg shadow">
                        <img src="../assets/loan-management.jpg" alt="Loan Management" class="mx-auto mb-4">
                        <h4 class="text-xl font-semibold mb-2">Loan Management</h4>
                        <p class="text-gray-600">Easily manage your loans, view balances, and payment schedules.</p>
                    </div>
                    <div class="p-6 bg-white rounded-lg shadow">
                        <img src="../assets/secure.jpeg" alt="Secure Platform" class="mx-auto mb-4">
                        <h4 class="text-xl font-semibold mb-2">Secure Platform</h4>
                        <p class="text-gray-600">Your data is safe with industry-standard encryption and secure access.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action Section -->
        <section class="py-20 bg-cyan-600 text-white">
            <div v-if="user" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 class="text-3xl font-bold mb-4">You have a great Idea?</h3>
                <p class="text-lg mb-8">Join up with the leaders You elected.</p>
                <p class="text-lg mb-8"> For any queries make sure you reach out.</p>
                <RouterLink to="About"
                    class="bg-white text-cyan-700 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-100">
                    Find out How
                </RouterLink>
            </div>
            <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 class="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                <p class="text-lg mb-8">Join thousands of members in managing their savings and investments.</p>
                <RouterLink to="/about"
                    class="bg-white text-cyan-700 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-100">
                    Contact Us Now
                </RouterLink>
            </div>

        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <p>&copy; 2024 Chamaa. All rights reserved.</p>
                <nav class="space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a>
                    <a href="#" class="text-gray-400 hover:text-white">Terms of Service</a>
                    <a href="#" class="text-gray-400 hover:text-white">Contact</a>
                </nav>
            </div>
        </footer>
    </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.js';

const { user } = storeToRefs(useAuthStore())
</script>

<style>
/* Add any additional custom styles if needed */
</style>