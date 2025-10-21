<template>
    <div class="d-flex" id="wrapper">
        
        <!-- Sidebar (Menú Fijo) -->
        <div class="bg-dark text-white border-end" id="sidebar-wrapper">
            <div class="sidebar-heading bg-warning text-dark fw-bold text-center py-3">MangaStore Admin</div>
            <div class="list-group list-group-flush flex-grow-1">
                
                <router-link to="/admin/dashboard" class="list-group-item list-group-item-action bg-dark text-white">
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
        
        <!-- Contenido de la Página -->
        <div id="page-content-wrapper">
            <!-- Botón de Menú para móvil -->
            <button class="btn btn-dark d-md-none m-3 shadow-sm" @click="toggleSidebar">
                <i class="bi bi-list me-2"></i>Menú Admin
            </button>
            
            <!-- Aquí se renderizará el contenido de las sub-rutas (DashboardAdminContent, AdminProducts, etc.) -->
            <router-view />
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Asegúrate de que esta ruta sea correcta

const router = useRouter();
const authStore = useAuthStore(); 

const sidebarOpen = ref(true); 

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
    // Usa un ID de envoltura única para el layout de admin
    document.getElementById('wrapper').classList.toggle('toggled', !sidebarOpen.value);
};

const logout = () => {
    authStore.logout(); 
    router.push({ name: 'Dashboard' }); // Redirigir a la vista pública principal
};

onMounted(() => {
    // Lógica para que se muestre correctamente en desktop y oculto en móvil por defecto
    const isMobile = window.innerWidth < 768;
    const wrapper = document.getElementById('wrapper');
    if (isMobile) {
        wrapper.classList.add('toggled');
        sidebarOpen.value = false;
    } else {
        wrapper.classList.remove('toggled');
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
}

/* Resaltar link activo automáticamente */
.router-link-active, .router-link-exact-active {
    background-color: #ffc107 !important;
    color: #212529 !important;
    border-color: #ffc107 !important;
}

/* Estilos adicionales del Sidebar */
.list-group-item-action {
    color: rgba(255, 255, 255, 0.8) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.list-group-item-action:hover:not(.router-link-active) {
    color: #ffc107 !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
}

.list-group-item-action.router-link-active .bi {
  color: #212529 !important;
}

.sidebar-heading {
    background-color: #ffc107 !important;
}

.text-secondary {
    border-top: 1px solid rgba(255, 255, 255, 0.25) !important;
    opacity: 1;
}
</style>