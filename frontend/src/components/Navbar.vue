<template>
  <nav class="flex justify-between items-center px-6 py-3 bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <!-- Logo -->
    <div @click="goHome" class="flex items-center cursor-pointer space-x-2">
      <img src="/logo.png" alt="Logo" class="w-10 h-10" />
      <h1 class="font-bold text-xl text-gray-800">Manga Sempai</h1>
    </div>

    <!-- Botones -->
    <div class="flex items-center space-x-4">
      <button @click="toggleMenu" class="text-gray-700 hover:text-black">
        <i class="fa-solid fa-bars text-2xl"></i>
      </button>

      <button @click="toggleAuth" class="text-gray-700 hover:text-black">
        <i class="fa-solid fa-user text-2xl"></i>
      </button>

      <button class="relative text-gray-700 hover:text-black">
        <i class="fa-solid fa-cart-shopping text-2xl"></i>
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">0</span>
      </button>
    </div>

    <!-- Sidebars -->
    <SidebarMenu :isOpen="menuOpen" @close="toggleMenu" />
    <SidebarAuth :isOpen="authOpen" @close="toggleAuth" />
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

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const toggleAuth = () => (authOpen.value = !authOpen.value);
const goHome = () => router.push('/');
</script>

<style scoped>
nav {
  font-family: 'Poppins', sans-serif;
}
</style>
