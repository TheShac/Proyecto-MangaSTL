<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Crear cuenta</h2>

      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label class="block text-gray-700">Nombre de usuario</label>
          <input
            v-model="username"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded transition"
        >
          Registrarse
        </button>

        <p class="text-center mt-4 text-sm">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="text-yellow-600 hover:underline">Inicia sesión</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const registerUser = async () => {
  try {
    await axios.post("http://localhost:3000/api/auth/register/customer", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
    router.push("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Error al registrar usuario");
  }
};
</script>
