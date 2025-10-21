<template>
  <div class="min-h-screen">
    <Navbar v-if="!$route.path.startsWith('/admin')" />
    <main :class="{'pt-20': !$route.path.startsWith('/admin') }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute(); 
</script>

