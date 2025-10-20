import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import DashboardAdminView from '../views/DashboardAdmin.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/admin/dashboard', name:'AdminDashboard', component: DashboardAdminView, meta: { requiresAuth: true, isAdmin: true } },
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
  // const authStore = useAuthStore(); // Si usas Pinia

  if (requiresAuth && !token) { // Si la ruta requiere auth y no hay token
    next({ name: 'Login' });
  } else if (isAdmin && token) { // Si la ruta requiere admin y hay token
    // **Aquí debes verificar el rol del usuario desde el token o Pinia Store**
    // Por ahora, solo asumo que si hay token, podría ser admin.
    // En una app real:
    // const userRole = authStore.userRole; // O decodifica el token aquí
    // if (userRole === 'admin' || userRole === 'stl_administrador' || userRole === 'stl_superadministrador') {
    //   next();
    // } else {
    //   alert('Acceso denegado. No tienes permisos de administrador.');
    //   next({ name: 'Home' }); // O a una página de "Acceso Denegado"
    // }
    next(); // Temporalmente, permite el acceso si hay token para probar el layout
  } else {
    next(); // Continuar
  }
})

export default router;