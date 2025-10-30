<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
    <div class="container-fluid">

      <!-- 🟡 Nombre de la tienda -->
      <router-link to="/" class="navbar-brand fw-bold text-dark">Don Mangas</router-link>

      <div class="ms-auto d-flex align-items-center gap-3">

        <!-- 🟢 Menú lateral -->
        <button class="btn btn-outline-dark" @click="toggleMenu">
          <i class="bi bi-list"></i> Menú
        </button>

        <!-- 🛒 Carrito -->
        <router-link to="/carrito" class="btn btn-outline-dark position-relative">
          <i class="bi bi-cart"></i>
          <span
            v-if="cartCount > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cartCount }}
          </span>
        </router-link>

        <!-- 🔐 Si NO hay usuario -->
        <template v-if="!auth.isLoggedIn">
          <router-link to="/login" class="btn btn-outline-dark">Iniciar sesión</router-link>
          <router-link to="/register" class="btn btn-dark text-white">Registrar</router-link>
        </template>

        <!-- 👤 Si HAY usuario -->
        <div v-else class="position-relative">
          <button
            class="btn btn-outline-dark d-flex align-items-center"
            @click="toggleDropdown"
          >
            <i class="bi bi-person-circle me-1"></i>
            Mi cuenta
          </button>

          <!-- Dropdown personalizado -->
          <div
            v-if="dropdownOpen"
            class="dropdown-menu-custom"
            @click.stop
          >
            <router-link class="dropdown-item" to="/mis-pedidos">Mis pedidos</router-link>
            <router-link class="dropdown-item" to="/profile">Mi perfil</router-link>
            <hr class="dropdown-divider" />
            <button class="dropdown-item text-danger" @click="cerrarSesion">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <SidebarMenu :open="menuAbierto" @close="menuAbierto = false" />
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../stores/auth'
import SidebarMenu from './SidebarMenu.vue'

const auth = useAuthStore()
const menuAbierto = ref(false)
const dropdownOpen = ref(false)
const cartCount = ref(0)

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

// Cerrar dropdown al hacer clic fuera
function handleClickOutside(e) {
  if (!e.target.closest('.position-relative')) dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

function cerrarSesion() {
  auth.logout()
  dropdownOpen.value = false
  window.location.reload()
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* 🧭 Dropdown manual */
.dropdown-menu-custom {
  position: absolute;
  right: 0;
  top: 110%;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 2000;
  animation: fadeIn 0.15s ease-in-out;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #212529;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-divider {
  margin: 0.25rem 0;
  border-top: 1px solid #e9ecef;
}

/* 🔄 Animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
