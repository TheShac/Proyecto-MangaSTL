<template>
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-72 h-full p-6 overflow-y-auto shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">Manga Sempai</h2>
          <button @click="$emit('close')"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>

        <ul class="space-y-4">
          <li class="hover:text-blue-500 cursor-pointer">En Stock</li>
          <li class="hover:text-blue-500 cursor-pointer">Tomos a pedido</li>
          <li class="hover:text-blue-500 cursor-pointer">Todos los Productos</li>
          <li class="hover:text-blue-500 cursor-pointer">Tomo único</li>
          <li class="hover:text-blue-500 cursor-pointer">Editorial</li>
          <li class="hover:text-blue-500 cursor-pointer">Figuras</li>
          <li class="hover:text-blue-500 cursor-pointer">Bolsas</li>
        </ul>

        <div class="mt-10 border-t pt-4 text-sm text-gray-600">
          <p class="font-semibold mb-2">Contáctanos</p>
          <p>📧 administracion@mangasempai.cl</p>
          <p>📞 56932689586</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
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
