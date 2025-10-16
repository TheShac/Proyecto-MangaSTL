<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label class="block text-gray-700">Email o Usuario</label>
          <input
            v-model="usernameOrEmail"
            type="text"
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
          Entrar
        </button>

        <p class="text-center mt-4 text-sm">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-yellow-600 hover:underline">Regístrate</router-link>
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
const usernameOrEmail = ref("");
const password = ref("");

const loginUser = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      usernameOrEmail: usernameOrEmail.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    router.push("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Error al iniciar sesión");
  }
};
</script>
