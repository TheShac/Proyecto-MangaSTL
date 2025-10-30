import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const role = ref(null);
  const userType = ref(null);
  const id = ref(null);
  const username = ref(null);

  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => role.value === 'stl_administrador' || role.value === 'stl_superadministrador');

  function initializeAuth() {
  const storedToken = localStorage.getItem('accessToken');
  const storedRole = localStorage.getItem('role');
  const storedUser = localStorage.getItem('username');

  // ✅ Solo restaura si todos los datos están presentes
    if (storedToken && storedRole && storedUser) {
      token.value = storedToken;
      role.value = storedRole;
      username.value = storedUser;
    } 
    else {
    logout();
    }
  }


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

  return { token, role, userType, id, username, isLoggedIn, isAdmin, login, logout, initializeAuth };
});
