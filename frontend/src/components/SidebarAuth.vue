<template>
  <transition name="slide">
    <div v-if="open" class="fixed-top vw-100 vh-100 d-flex z-index-40" style="z-index: 1050;">
      <div class="w-100 h-100 bg-dark bg-opacity-50" @click="$emit('close')"></div>

      <aside class="ms-auto bg-white h-100 shadow-lg p-4" style="width: 320px; max-width: 90%;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h4 fw-bold mb-0">Iniciar Sesión</h2>
          <button @click="$emit('close')" class="btn btn-sm btn-light p-1">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="d-grid gap-3">
          <input v-model="identifier" type="text" placeholder="Email o usuario" class="form-control form-control-lg" />
          <input v-model="password" type="password" placeholder="Contraseña" class="form-control form-control-lg" />
          
          <button @click="login" class="btn btn-warning text-white fw-bold py-2">Entrar</button>

          <p class="text-center small text-muted mt-2">
            ¿No tienes cuenta?
            <a @click="goRegister" class="text-warning fw-bold cursor-pointer">Crear una</a>
          </p>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// --- PROPS Y EMITS ---
const props = defineProps({ open: Boolean });
const emit = defineEmits(['close']);

// --- VARIABLES REACTIVAS ---
const identifier = ref('');
const password = ref('');
const router = useRouter();

// --- FUNCIONES DE NAVEGACIÓN Y AUTENTICACIÓN ---

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      identifier: identifier.value,
      password: password.value,
    });

    localStorage.setItem('accessToken', res.data.accessToken);
    emit('close');
    router.push({ name: 'Dashboard' });
  } catch (err) {
    alert(err.response?.data?.message || 'Error de inicio de sesión');
  }
};

const goRegister = () => {
  emit('close'); // Cierra el sidebar
  router.push({ path: '/register' }); // Navega a la ruta
};
</script>

<style>
/* Si usas transiciones, van aquí */
.slide-enter-active, .slide-leave-active { transition: transform .25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>