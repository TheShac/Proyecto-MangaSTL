<template>
  <div class="d-flex align-items-center justify-content-center bg-light pt-5 pb-5" style="min-height: 100vh;">
    <div class="w-100 p-4 bg-white rounded-lg shadow-lg border border-gray-100" style="max-width: 500px;">
      <h2 class="text-center text-dark mb-4">Crear Cuenta de Cliente</h2>
      
      <form @submit.prevent="register">
        <div class="row g-3 mb-3">
          <div class="col-sm-6">
            <label for="nombre" class="form-label text-dark">Nombre</label>
            <input v-model="form.nombre" id="nombre" type="text" required class="form-control" />
          </div>
          <div class="col-sm-6">
            <label for="apellido" class="form-label text-dark">Apellido</label>
            <input v-model="form.apellido" id="apellido" type="text" required class="form-control" />
          </div>
        </div>
        
        <div class="mb-3">
          <label for="username" class="form-label text-dark">Nombre de Usuario</label>
          <input v-model="form.username" id="username" type="text" required class="form-control" />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label text-dark">Email</label>
          <input v-model="form.email" id="email" type="email" required class="form-control" />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label text-dark">Contraseña</label>
          <input v-model="form.password" id="password" type="password" required class="form-control" />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="btn btn-warning text-white w-100 fw-bold py-2"
        >
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>

      <div class="mt-4 text-center small">
        <p class="text-muted">
          ¿Ya tienes cuenta? 
          <router-link to="/login" class="text-warning fw-bold">
            Iniciar Sesió
          </router-link>
        </p>
      </div>

      <div v-if="error" class="alert alert-danger mt-3 small">
        {{ error }}
      </div>
      <div v-if="success" class="alert alert-success mt-3 small">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// --- VARIABLES REACTIVAS Y ESTADO ---
const form = ref({
  nombre: '',
  apellido: '',
  username: '',
  email: '',
  password: '',
});

const isLoading = ref(false);
const error = ref(null);
const success = ref(null);
const router = useRouter();

// --- FUNCIÓN DE REGISTRO ---
const register = async () => {
  isLoading.value = true;
  error.value = null;
  success.value = null;

  try {
    // Asegúrate de que este endpoint sea correcto
    await axios.post('http://localhost:3000/api/auth/register/customer', form.value);

    success.value = 'Registro exitoso. Serás redirigido para iniciar sesión.';
    
    setTimeout(() => {
      router.push({ name: 'Login' });
    }, 2000);

  } catch (err) {
    console.error('Registro Error:', err);
    error.value = err.response?.data?.message || 'Error al registrar. Intenta con otro email o usuario.';
  } finally {
    isLoading.value = false;
  }
};
</script>