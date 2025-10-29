<template>
    <!--
        ¡IMPORTANTE! Eliminamos el <div id="wrapper">, el Sidebar (#sidebar-wrapper)
        y el <div id="page-content-wrapper">.
        Este componente SÓLO debe tener el contenido.
    -->
    <div class="container-fluid py-4">
        <h1 class="display-5 fw-bold text-dark mb-1">Dashboard</h1>
        <p class="lead text-muted mb-4">Resumen general de tu tienda MangaStore</p>

        <!-- Bloque de Métricas (Mantener) -->
        <div class="row g-4 mb-4">
            
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title text-muted text-uppercase small mb-0">Total Productos</h5>
                            <i class="bi bi-box-seam fs-4 text-warning"></i>
                        </div>
                        <h3 class="fw-bold mb-0">6</h3>
                        <p class="card-text text-muted small mt-1">Productos en catálogo</p>
                    </div>
                </div>
            </div>
            
            <!-- ... (resto de las tarjetas de métricas) ... -->
            
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-muted text-uppercase small mb-0">Stock Bajo</h5>
                            <i class="bi bi-exclamation-triangle fs-4 text-danger"></i>
                        </div>
                        <h3 class="fw-bold mb-0 text-danger">1</h3>
                        <p class="card-text text-muted small mt-1">Productos con poco stock</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bloque de Gráficos/Listados (Mantener) -->
        <div class="row g-4">
            
            <div class="col-lg-6">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title fw-bold mb-0">Pedidos Recientes</h5>
                            <button class="btn btn-sm btn-outline-secondary">Ver Todos</button>
                        </div>
                        <!-- ... (contenido de lista de pedidos) ... -->
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="card-title fw-bold mb-0">Productos con Stock Bajo</h5>
                            <button class="btn btn-sm btn-outline-warning">Gestionar Stock</button>
                        </div>
                        <!-- ... (contenido de lista de stock) ... -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// ¡Eliminamos toda la lógica del Sidebar (toggleSidebar, sidebarOpen, onMounted) ya que eso está en AdminLayout!
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth'; // Asegúrate de que esta ruta sea correcta

const router = useRouter();
const authStore = useAuthStore(); 

const logout = () => {
    // Si necesitas la función de logout aquí, está bien, pero idealmente se maneja en el Layout
    authStore.logout(); 
    router.push({ name: 'Dashboard' }); 
};
</script>

<style scoped>

/* Estilos del Sidebar */
.list-group-item-action {
  color: rgba(255, 255, 255, 0.8) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.list-group-item-action:hover {
  color: #ffc107 !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.list-group-item-action.active {
  background-color: #ffc107 !important;
  color: #212529 !important;
  border-color: #ffc107 !important;
}

.list-group-item-action.active .bi {
  color: #212529 !important;
}

/* Separador */
.text-secondary {
    border-top: 1px solid rgba(255, 255, 255, 0.25) !important;
    opacity: 1;
}


</style>