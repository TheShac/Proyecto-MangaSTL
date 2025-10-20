import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    
  const token = ref(localStorage.getItem('accessToken') || null);
  
  const isLoggedIn = computed(() => !!token.value);

  function login(accessToken) {
    token.value = accessToken;
    localStorage.setItem('accessToken', accessToken);
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('accessToken');
  }

  return { token, isLoggedIn, login, logout };
});