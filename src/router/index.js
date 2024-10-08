
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth';
import { useConstStore } from '@/stores/consts';
import { defineAsyncComponent, ref } from 'vue';
import ModalForRouting from '@/components/ModalForRouting.vue';
import { useLoadingStore } from '@/stores/loadingStore';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },

  {
    path: '/profile',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true,roles:['admin','user']}
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/login-update', name: 'LoginUpdate',
    component: () => import('@/views/auth/LoginUpdateV.vue')
  },
  {
    path: '/forbidden',
    name: 'Unauthorized',
    component: () => import('@/views/auth/UnauthorizedView.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }  // Redirect to home for unknown routes
]

// import.meta.env.BASE_URL
const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async (to, from) => {
  // useLoadingStore().startLoading()
  // const authStore = useAuthStore()
  // let isAuthenticated = localStorage.getItem('user')
  // let userRole = ""
  // // logic to fetch the user's role from your store or backend
  // try {
  //   const user = await authStore.fetchUserData(isAuthenticated) //Returns user or null
  //   if (user) {
  //     userRole = user.role
  //   } else {

  //     isAuthenticated = null
  //   }

  // } catch (error) {
  //   console.log(error)
  //   isAuthenticated = null
  // }

  // // If the route requires authentication and the user is not authenticated
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   localStorage.clear()
  //   authStore.user = null
  //   useLoadingStore().stopLoading()
  //   return { path: '/login', query: { redirect: to.fullPath } }; // Redirect to login
  // }

  // // If the route requires a specific role and the user doesn't have it
  // if (to.meta.roles && !to.meta.roles.includes(userRole)) {
  //   useLoadingStore().stopLoading()
  //   return { path: '/forbidden' }; // Redirect to a forbidden page
  // }

  // // If user is authenticated and trying to access the login page
  // if (to.path === '/login' && isAuthenticated) {
  //   useLoadingStore().stopLoading()
  //   return { path: '/' }; // Redirect to dashboard
  // }

  // // Allow navigation
  // useLoadingStore().stopLoading()
  return true;
});






export default router
