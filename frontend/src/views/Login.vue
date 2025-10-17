<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light pt-5">
    <div class="w-100 p-4 bg-white rounded-lg shadow-lg border border-gray-100" style="max-width: 380px;">
      <h2 class="text-center text-dark mb-4">Iniciar Sesión</h2>
      
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="identifier" class="form-label text-dark">Email o Nombre de Usuario</label>
          <input 
            v-model="identifier" 
            id="identifier" 
            type="text" 
            placeholder="Escribe tu email o usuario" 
            required
            class="form-control form-control-lg"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label text-dark">Contraseña</label>
          <input 
            v-model="password" 
            id="password" 
            type="password" 
            placeholder="Escribe tu contraseña" 
            required
            class="form-control form-control-lg"
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="btn btn-warning text-white w-100 fw-bold py-2"
        >
          {{ isLoading ? 'Iniciando...' : 'Entrar' }}
        </button>
      </form>

      <div class="mt-4 text-center small">
        <p class="text-muted">
          ¿No tienes cuenta? 
          <router-link to="/register" class="text-warning fw-bold">
            Crear una
          </router-link>
        </p>
        <p class="mt-1">
          <router-link to="/forgot-password" class="text-secondary">
            ¿Olvidaste tu contraseña?
          </router-link>
        </p>
      </div>

      <div v-if="error" class="alert alert-danger mt-3 small">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
// Lógica de script sin cambios
// ...
</script>