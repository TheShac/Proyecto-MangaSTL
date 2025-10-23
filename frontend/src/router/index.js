import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';

// Admin Views
import AdminLayout from '../layouts/AdminLayout.vue';
import DashboardAdmin from '../views/DashboardAdmin.vue';
import AdminProducts from '../views/AdminProducts.vue';

const adminRoutes = {
  path: '/admin',
  component: AdminLayout,
  meta: { requiresAuth: true, isAdmin: true },
  children: [
    { path: 'dashboard', name: 'AdminDashboard', component: DashboardAdmin },
    { path: 'products', name: 'AdminProducts', component: AdminProducts },
    // Aquí agregas más rutas de admin: /orders, /clients, /profile
  ]
};

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  adminRoutes,
  { path: '/:catchAll(.*)', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAdmin = to.matched.some(record => record.meta.isAdmin);
  const token = localStorage.getItem('accessToken');

  if (requiresAuth && !token) {
    next({ name: 'Login' });
  } else if (isAdmin && token) {
    next();
  } else {
    next();
  }
});

export default router;
