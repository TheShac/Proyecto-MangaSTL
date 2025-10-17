<template>
  <transition name="slide">
    <div v-if="open" class="fixed-top vw-100 vh-100 d-flex z-index-40" style="z-index: 1050;">
      <div class="w-100 h-100 bg-dark bg-opacity-50" @click="$emit('close')"></div>

      <aside class="ms-auto bg-white h-100 shadow-lg p-4 overflow-auto" style="width: 300px; max-width: 85%;">
        
        <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
          <h2 class="h4 fw-bolder mb-0">Don Mangas</h2>
          <button @click="$emit('close')" class="btn btn-sm btn-outline-secondary border-0 p-1">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark hover-effect">En Stock</li>
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark hover-effect">Tomos a pedido</li>
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark hover-effect">Todos los Productos</li>
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark hover-effect">Tomo único</li>
          
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark d-flex justify-content-between align-items-center hover-effect">
            Editorial <i class="bi bi-chevron-down small"></i>
          </li>
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark d-flex justify-content-between align-items-center hover-effect">
            Figuras <i class="bi bi-chevron-down small"></i>
          </li>
          
          <li class="list-group-item border-0 px-0 py-2 fw-semibold text-dark hover-effect">Bolsas</li>
        </ul>

        <div class="mb-4">
          <h6 class="text-secondary fw-bolder border-top pt-3 mb-3">SÍGUENOS</h6>
          <div class="d-flex gap-3 fs-5">
            <a href="#" class="text-dark"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-dark"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-dark"><i class="bi bi-youtube"></i></a>
            <a href="#" class="text-dark"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>
        
        <div class="mb-4">
          <h6 class="text-secondary fw-bolder border-top pt-3 mb-2">SERVICIO AL CLIENTE</h6>
          <p class="mb-1 fw-semibold text-dark hover-effect">Todos los Productos</p>
          </div>

        <div class="border-top pt-3">
          <h6 class="text-secondary fw-bolder mb-3">CONTÁCTANOS</h6>
          
          <div class="d-flex align-items-start mb-2">
            <i class="bi bi-envelope-fill text-dark me-2 mt-1"></i>
            <span class="small text-dark">administracion@test.cl</span>
          </div>

          <div class="d-flex align-items-start mb-2">
            <i class="bi bi-whatsapp text-dark me-2 mt-1"></i>
            <span class="small text-dark">56912345678</span>
          </div>

          <div class="d-flex align-items-start mb-2">
            <i class="bi bi-geo-alt-fill text-dark me-2 mt-1"></i>
            <span class="small text-dark">Tienda Online. Entregas al espacio</span>
          </div>

          <div class="d-flex align-items-start">
            <i class="bi bi-clock-fill text-dark me-2 mt-1"></i>
            <span class="small text-dark">
                Tienda Online. Atención de Lunes a Sábados.<br>
                Domingos y festivos Cerrado.
            </span>
          </div>
        </div>
        
      </aside>
    </div>
  </transition>
</template>

<script setup>
// Lógica de script
defineProps({ open: { type: Boolean, default: false } });
defineEmits(['close']); 
</script>

<style scoped>
/* Estilos para las transiciones */
.slide-enter-active, .slide-leave-active { transition: transform .25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

/* Estilo para el efecto hover en la lista de navegación */
.hover-effect {
  cursor: pointer;
}
.hover-effect:hover {
  background-color: #f8f9fa; /* Color light grey de Bootstrap */
}
</style>