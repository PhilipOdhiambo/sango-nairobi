
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
    meta: { requiresAuth: true }
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
  {path:'/login-update', name:'LoginUpdate',
    component:()=>import('@/views/auth/LoginUpdateV.vue')
   },
  {
    path: '/forbidden',
    name: 'Unauthorized',
    component: defineAsyncComponent({
      loader: () => import('@/views/auth/UnauthorizedView.vue'),
      loadingComponent: ModalForRouting,
    })
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }  // Redirect to home for unknown routes
]

// import.meta.env.BASE_URL
const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async (to, from) => {
  useLoadingStore().startLoading() 
  const isAuthenticated = localStorage.getItem('user')
  // logic to fetch the user's role from your store or backend
  try {
    const authStore = useAuthStore()
    const res = await authStore.fetchUserData(isAuthenticated)    
    var userRole = res? res.role : ""
  } catch (error) {
    console.log(error)
  }

  // If the route requires authentication and the user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { path: '/login'}; // Redirect to login
  }

  // If the route requires a specific role and the user doesn't have it
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return { path: '/forbidden' }; // Redirect to a forbidden page
  }

  // If user is authenticated and trying to access the login page
  if (to.path === '/login' && isAuthenticated) {
    return { path: '/' }; // Redirect to dashboard
  }

  // Allow navigation
  return true;
});



router.afterEach((to, from) => {

  // Stop loading after route change completes
  useLoadingStore().stopLoading()


});


export default router
