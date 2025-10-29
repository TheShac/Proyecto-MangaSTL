import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('accessToken') || null);
  const role = ref(localStorage.getItem('role') || null);
  const userType = ref(localStorage.getItem('userType') || null);
  const id = ref(localStorage.getItem('userId') || null);
  const username = ref(localStorage.getItem('username') || null);

  const isLoggedIn = computed(() => !!token.value);

  const adminRoles = [
    'stl_administrador',
    'stl_superadministrador',
    'stl_emp',
    'stl_emp_nuevo',
    'stl_practicante'
  ];

  const isAdmin = computed(() => adminRoles.includes(role.value));
  const isClient = computed(() => role.value === 'stl_cliente' || userType.value === 'cliente');

  function login(accessToken, userRole, type, userId, userName) {
    token.value = accessToken;
    role.value = userRole;
    userType.value = type;
    id.value = userId;
    username.value = userName;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('role', userRole);
    localStorage.setItem('userType', type);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', userName);
  }

  function logout() {
    token.value = null;
    role.value = null;
    userType.value = null;
    id.value = null;
    username.value = null;

    localStorage.clear();
  }

  return { token, role, userType, id, username, isLoggedIn, isAdmin, isClient, login, logout };
});
