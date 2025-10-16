<template>
  <transition name="slide">
    <div v-if="open" class="fixed inset-0 z-40 flex">
      <!-- backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-40" @click="$emit('close')"></div>

      <!-- panel -->
      <aside class="ml-auto w-80 bg-white h-full shadow-lg p-6 overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Manga Sempai</h2>
          <button @click="$emit('close')" class="p-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <ul class="divide-y">
          <li class="py-3 cursor-pointer hover:text-yellow-600">En Stock</li>
          <li class="py-3 cursor-pointer hover:text-yellow-600">Tomos a pedido</li>
          <li class="py-3 cursor-pointer hover:text-yellow-600">Todos los Productos</li>
          <li class="py-3 cursor-pointer hover:text-yellow-600">Tomo único</li>
          <li class="py-3 cursor-pointer hover:text-yellow-600">Editorial</li>
          <li class="py-3 cursor-pointer hover:text-yellow-600">Figuras</li>
          <li class="py-3 cursor-pointer hover:text-yellow-600">Bolsas</li>
        </ul>

        <div class="mt-6 border-t pt-4 text-sm text-gray-600">
          <p class="font-semibold mb-2">Contáctanos</p>
          <p class="flex items-center gap-2"><span>✉️</span> administracion@mangasempai.cl</p>
          <p class="flex items-center gap-2 mt-2"><span>📞</span> 56932689586</p>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup>
defineProps({ open: { type: Boolean, default: false } });
</script>

<style>
.slide-enter-active, .slide-leave-active { transition: transform .25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
