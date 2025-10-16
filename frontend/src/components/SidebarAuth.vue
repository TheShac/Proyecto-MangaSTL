<template>
  <transition name="slide">
    <div v-if="open" class="fixed inset-0 z-40 flex">
      <div class="fixed inset-0 bg-black bg-opacity-40" @click="$emit('close')"></div>

      <aside class="ml-auto w-96 bg-white h-full shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Iniciar sesión</h2>
          <button @click="$emit('close')" class="p-1 rounded hover:bg-gray-100">✕</button>
        </div>

        <div class="space-y-4">
          <input v-model="identifier" type="text" placeholder="Email o usuario" class="w-full p-3 border rounded" />
          <input v-model="password" type="password" placeholder="Contraseña" class="w-full p-3 border rounded" />
          <button @click="login" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded">Entrar</button>

          <p class="text-sm text-center">
            ¿No tienes cuenta?
            <a @click="goRegister" class="text-yellow-600 cursor-pointer">Crear una</a>
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

const props = defineProps({ open: Boolean });
const emit = defineEmits(['close']);

const identifier = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    // Ajusta la URL según tu backend
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      identifier: identifier.value,
      password: password.value,
    });

    // guarda token (a futuro: mejor HttpOnly cookie)
    localStorage.setItem('accessToken', res.data.accessToken);
    // cerrar sidebar y redirigir
    emit('close');
    router.push({ name: 'Dashboard' });
  } catch (err) {
    alert(err.response?.data?.message || 'Error login');
  }
};

const goRegister = () => {
  emit('close');
  router.push({ path: '/register' });
};
</script>

<style>
.slide-enter-active, .slide-leave-active { transition: transform .25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
