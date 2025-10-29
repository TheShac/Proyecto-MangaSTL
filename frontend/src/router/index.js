import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Cliente Views
import Dashboard from '../views/client/Dashboard.vue';
import Profile from '../views/client/Profile.vue';

// Admin Views
import AdminLayout from '../layouts/AdminLayout.vue';
import DashboardAdmin from '../views/admin/DashboardAdmin.vue';
import AdminProducts from '../views/admin/AdminProducts.vue';
import AdminEmployees from '../views/admin/AdminEmployees.vue';

// Shared Views
import Login from '../views/shared/Login.vue';
import Register from '../views/shared/Register.vue';

const adminRoutes = {
  path: '/admin',
  component: AdminLayout,
  meta: { requiresAuth: true, requiresAdmin: true },
  children: [
    { path: 'dashboard', name: 'AdminDashboard', component: DashboardAdmin },
    { path: 'products', name: 'AdminProducts', component: AdminProducts },
    { path: 'employees', name: 'AdminEmployees', component: AdminEmployees },
  ],
};

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  adminRoutes,
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Middleware global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('accessToken');
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth);
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin);

  // Si la ruta requiere autenticación y no hay token
  if (requiresAuth && !token) {
    return next({ name: 'Login' });
  }

  // Si la ruta es de admin y no tiene permisos
  if (requiresAdmin && !authStore.isAdmin) {
    return next({ name: 'Dashboard' });
  }

  next();
});

export default router;
