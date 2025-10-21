<template>
  <div class="d-flex" id="wrapper">
    
    <div class="bg-dark text-white border-end" id="sidebar-wrapper">
      <div class="sidebar-heading bg-warning text-dark fw-bold text-center py-3">MangaStore Admin</div>
      <div class="list-group list-group-flush flex-grow-1">
        
        <router-link to="/admin/dashboard" class="list-group-item list-group-item-action bg-dark text-white active">
          <i class="bi bi-speedometer2 me-2"></i>Dashboard
        </router-link>
        <router-link to="/admin/products" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-box-seam me-2"></i>Productos
        </router-link>
        <router-link to="/admin/inventory" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-boxes me-2"></i>Inventario
        </router-link>
        <router-link to="/admin/orders" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-journal-text me-2"></i>Pedidos
        </router-link>
        <router-link to="/admin/analytics" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-graph-up me-2"></i>Analíticas
        </router-link>
        <router-link to="/admin/clients" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-people me-2"></i>Clientes
        </router-link>
        <router-link to="/admin/configuration" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-gear me-2"></i>Configuración
        </router-link>

        <hr class="text-secondary my-2 mx-3">

        <router-link to="/admin/users" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-person-workspace me-2"></i>Gestión de Usuarios
        </router-link>
        <router-link to="/admin/profile" class="list-group-item list-group-item-action bg-dark text-white">
          <i class="bi bi-person me-2"></i>Mi Perfil
        </router-link>
        <a href="#" class="list-group-item list-group-item-action bg-dark text-danger" @click.prevent="logout">
          <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
        </a>
      </div>
      
      <div class="p-3">
        <router-link to="/" class="btn btn-outline-light w-100">Ver Tienda</router-link>
      </div>
    </div>
    
    <div id="page-content-wrapper">
      
      <!-- Se ha eliminado la Navbar, pero si deseas tener un botón de toggle en móvil, añádelo aquí -->
      <button class="btn btn-primary d-md-none m-3" @click="toggleSidebar">
          <i class="bi bi-list"></i>
      </button>

      <div class="container-fluid py-4">
        <h1 class="display-5 fw-bold text-dark mb-1">Dashboard</h1>
        <p class="lead text-muted mb-4">Resumen general de tu tienda MangaStore</p>

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
          
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
              <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title text-muted text-uppercase small mb-0">Pedidos Totales</h5>
                  <i class="bi bi-cart fs-4 text-info"></i>
                </div>
                <h3 class="fw-bold mb-0">156</h3>
                <p class="card-text text-muted small mt-1">Pedidos procesados</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 shadow-sm border-0">
              <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title text-muted text-uppercase small mb-0">Ingresos Totales</h5>
                  <i class="bi bi-currency-dollar fs-4 text-success"></i>
                </div>
                <h3 class="fw-bold mb-0">$12.450,75</h3>
                <p class="card-text text-muted small mt-1">Ingresos acumulados</p>
              </div>
            </div>
          </div>
          
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

        <div class="row g-4">
          
          <div class="col-lg-6">
            <div class="card h-100 shadow-sm border-0">
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title fw-bold mb-0">Pedidos Recientes</h5>
                  <button class="btn btn-sm btn-outline-secondary">Ver Todos</button>
                </div>
                <ul class="list-group list-group-flush flex-grow-1">
                  <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">ORD-001 <span class="badge bg-primary text-white ms-2">Procesando</span></h6>
                      <small class="text-muted">Maria Garcia</small><br>
                      <small class="text-muted">2 productos</small>
                    </div>
                    <div class="text-end">
                      <small class="fw-bold">$37.97</small><br>
                      <small class="text-muted">15-01-2024</small>
                    </div>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">ORD-002 <span class="badge bg-secondary text-white ms-2">Enviado</span></h6>
                      <small class="text-muted">Carlos López</small><br>
                      <small class="text-muted">1 producto</small>
                    </div>
                    <div class="text-end">
                      <small class="fw-bold">$89.99</small><br>
                      <small class="text-muted">14-01-2024</small>
                    </div>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">ORD-003 <span class="badge bg-success text-white ms-2">Entregado</span></h6>
                      <small class="text-muted">Ana Rodriguez</small><br>
                      <small class="text-muted">2 productos</small>
                    </div>
                    <div class="text-end">
                      <small class="fw-bold">$33.98</small><br>
                      <small class="text-muted">13-01-2024</small>
                    </div>
                  </li>
                </ul>
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
                <ul class="list-group list-group-flush flex-grow-1">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1 fw-bold">Figura Goku Super Saiyan</h6>
                      <small class="text-muted">Figura</small>
                    </div>
                    <span class="badge bg-danger rounded-pill">5 restantes</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1 fw-bold">Manga: Naruto Vol. 1</h6>
                      <small class="text-muted">Manga</small>
                    </div>
                    <span class="badge bg-danger rounded-pill">3 restantes</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 class="mb-1 fw-bold">Comic: Spiderman #1</h6>
                      <small class="text-muted">Comic</small>
                    </div>
                    <span class="badge bg-danger rounded-pill">1 restante</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Importamos el store de Pinia

const router = useRouter();
const authStore = useAuthStore(); // Inicializamos el store

const sidebarOpen = ref(true); 

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  document.getElementById('wrapper').classList.toggle('toggled', !sidebarOpen.value);
};

const logout = () => {
  // 1. Usar la función del store (que debe limpiar localStorage y el estado isLoggedIn)
  authStore.logout(); 
  // 2. Redirigir al inicio o login
  router.push({ name: 'Dashboard' }); 
};

onMounted(() => {
  // Asegura que al cargar el dashboard en móvil, esté oculto
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    document.getElementById('wrapper').classList.add('toggled');
    sidebarOpen.value = false;
  } else {
    document.getElementById('wrapper').classList.remove('toggled');
    sidebarOpen.value = true;
  }
});
</script>

<style scoped>
/* Contenedor principal para el layout */
#wrapper {
  display: flex; 
  overflow-x: hidden;
  background-color: #f8f9fa; 
  height: 100vh;
}

/* Estilos de la Barra Lateral */
#sidebar-wrapper {
  min-height: 100vh;
  width: 15rem;
  transition: margin 0.25s ease-out;
  flex-shrink: 0; 
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

/* Ocultar el sidebar (Usado en el toggle) */
#wrapper.toggled #sidebar-wrapper {
  margin-left: -15rem; 
}

/* Contenido de la Página */
#page-content-wrapper {
  width: 100%; 
  min-width: 0;
  overflow-y: auto; 
}

/* Media Query para móvil (hasta 767.98px) */
@media (max-width: 767.98px) {
  #sidebar-wrapper {
    margin-left: -15rem; 
    position: fixed; 
  }
  
  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }
}

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

.sidebar-heading {
  background-color: #ffc107 !important;
}

/* Separador */
.text-secondary {
    border-top: 1px solid rgba(255, 255, 255, 0.25) !important;
    opacity: 1;
}

/* Navbar de contenido */
#page-content-wrapper .navbar {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
</style>