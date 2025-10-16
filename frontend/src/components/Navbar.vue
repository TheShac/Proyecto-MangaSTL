<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Left: logo -->
        <div class="flex items-center cursor-pointer" @click="goHome">
          <img src="../assets/vue.svg" alt="logo" class="w-10 h-10 object-cover mr-2" />
          <span class="font-bold text-lg text-gray-800">AAAAAAAAAAA AAAAAAAA</span>
        </div>

        <!-- Right: buttons -->
        <div class="flex items-center space-x-4">
          <button @click="toggleMenu" class="p-2 rounded hover:bg-gray-100">
            <!-- menu icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <button @click="toggleAuth" class="p-2 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z" />
            </svg>
          </button>

          <button @click="goCart" class="p-2 rounded hover:bg-gray-100 relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4A1 1 0 007 21h10a1 1 0 001-1.2L17 13M7 13h10" />
            </svg>
            <span v-if="cartCount" class="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">{{ cartCount }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Sidebars (mount components) -->
    <SidebarMenu :open="menuOpen" @close="menuOpen = false" />
    <SidebarAuth :open="authOpen" @close="authOpen = false" />
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SidebarMenu from './SidebarMenu.vue';
import SidebarAuth from './SidebarAuth.vue';

const router = useRouter();
const menuOpen = ref(false);
const authOpen = ref(false);

const cartCount = ref(0);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const toggleAuth = () => (authOpen.value = !authOpen.value);
const goHome = () => router.push({ name: 'Dashboard' });
const goCart = () => router.push({ name: 'Cart' }); 
</script>
