<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
    <div class="container">
      
      <a class="navbar-brand d-flex align-items-center" @click="goHome" role="button">
        <span class="text-warning h4 fw-black me-2 mb-0">MC</span> 
        <span class="h5 text-dark fw-bold mb-0">Don Mangas</span>
      </a>

      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/productos" class="nav-link text-dark">Productos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mangas" class="nav-link text-dark">Mangas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/comics" class="nav-link text-dark">Comics</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/figuras" class="nav-link text-dark">Figuras</router-link>
          </li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
        
        <div v-if="!isLoggedIn" class="d-none d-md-flex align-items-center me-3">
          <router-link to="/login" class="btn btn-link text-dark me-2">Iniciar Sesión</router-link>
          <router-link to="/register" class="btn btn-warning text-white btn-sm fw-bold">Registrarse</router-link>
        </div>
        
        <div v-else class="dropdown me-3">
          <button class="btn btn-link text-dark dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle fs-5"></i> Mi Cuenta
          </button>
            <ul class="dropdown-menu" aria-labelledby="profileDropdown">
              <li><router-link to="/profile" class="dropdown-item">Mi Perfil</router-link></li>
              <li><router-link to="/orders" class="dropdown-item">Mis Pedidos</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="logout">Cerrar Sesión</a></li>
            </ul>
        </div>
        <button @click="goCart" class="btn btn-sm btn-light position-relative me-2">
            <i class="bi bi-cart"></i> 
            <span v-if="cartCount" class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
              {{ cartCount }}
            </span>
        </button>

        <button @click="toggleAuth" class="btn btn-sm btn-light d-md-none me-2">
            <i class="bi bi-person-circle"></i>
        </button>

        <button @click="toggleMenu" class="btn btn-sm btn-light d-flex flex-column align-items-center border-0 p-1">
            <img :src="menuIcon" alt="Menú" style="width: 28px; height: 28px;">
            <span class="small fw-bold text-dark mt-n1">Menú</span> 
        </button>
      </div>
    </div>

    <SidebarMenu :open="menuOpen" @close="menuOpen = false" />
    <SidebarAuth :open="authOpen" @close="authOpen = false" />
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SidebarMenu from './SidebarMenu.vue';
import SidebarAuth from './SidebarAuth.vue';

import menuIcon from '../assets/menu.png';

const router = useRouter();
const menuOpen = ref(false);
const authOpen = ref(false);

const cartCount = ref(0);

const isLoggedIn = computed(() => false); 

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const toggleAuth = () => (authOpen.value = !authOpen.value);

const goHome = () => router.push({ path: '/' });
const goCart = () => router.push({ name: 'Cart' }); 
</script>