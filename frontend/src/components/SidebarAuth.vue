<template>
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-80 h-full p-6 shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Iniciar Sesión</h2>
          <button @click="$emit('close')"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <form @submit.prevent="loginUser" class="space-y-4">
          <input v-model="identifier" type="text" placeholder="Email o usuario" class="w-full border p-2 rounded" />
          <input v-model="password" type="password" placeholder="Contraseña" class="w-full border p-2 rounded" />
          <button class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Entrar</button>
        </form>

        <p class="mt-4 text-sm text-center">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-blue-600 hover:underline" @click="$emit('close')">
            Crear una
          </router-link>
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
const identifier = ref('');
const password = ref('');

const loginUser = () => {
  console.log('Iniciando sesión con', identifier.value, password.value);
};
defineProps({ isOpen: Boolean });
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
