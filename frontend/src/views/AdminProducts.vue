<template>
    <div class="d-flex" id="wrapper">
        <!-- Sidebar: Lo cargamos aquí o asumimos que el layout principal lo maneja. 
             Para este ejemplo, solo nos enfocaremos en el contenido de la vista. -->

        <div id="page-content-wrapper" class="w-100">
            <div class="container-fluid py-4">
                
                <h1 class="display-5 fw-bold text-dark mb-1">Gestión de Productos</h1>
                <p class="lead text-muted mb-4">Crea, edita o elimina mangas, figuras y otros artículos de tu catálogo.</p>

                <!-- Botón de Acción -->
                <div class="d-flex justify-content-end mb-4">
                    <button class="btn btn-warning fw-bold text-white shadow-sm" @click="showModal = true">
                        <i class="bi bi-plus-circle me-2"></i>Añadir Nuevo Producto
                    </button>
                </div>

                <!-- Tabla/Listado de Productos (Componente de la próxima iteración) -->
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Listado de Artículos</h5>
                        
                        <div class="table-responsive">
                            <table class="table table-striped table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in products" :key="product.id">
                                        <td>{{ product.id }}</td>
                                        <td>{{ product.name }}</td>
                                        <td><span :class="getCategoryBadge(product.category)">{{ product.category }}</span></td>
                                        <td>${{ product.price.toFixed(2) }}</td>
                                        <td>
                                            <span :class="{'text-danger fw-bold': product.stock <= 10}">{{ product.stock }}</span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-info me-2" @click="editProduct(product)">
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="products.length === 0" class="text-center py-5 text-muted">
                            Aún no hay productos en el catálogo. ¡Crea el primero!
                        </div>
                    </div>
                </div>

                <!-- Modal para Crear/Editar Producto -->
                <div v-if="showModal" class="modal-backdrop-custom">
                    <div class="modal-dialog-custom">
                        <div class="modal-content">
                            <div class="modal-header bg-warning text-dark">
                                <h5 class="modal-title fw-bold">Crear Nuevo Producto</h5>
                                <button type="button" class="btn-close" @click="showModal = false"></button>
                            </div>
                            <div class="modal-body">
                                <p class="text-muted">Aquí irá el formulario completo con campos para nombre, descripción, precio, stock, categoría e imagen.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
                                <button type="button" class="btn btn-warning text-white" disabled>Guardar Producto</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);

// Placeholder de productos
const products = ref([
    { id: 1, name: 'Manga: One Piece Vol. 1', category: 'Manga', price: 12.99, stock: 45 },
    { id: 2, name: 'Figura Goku SSJ', category: 'Figura', price: 45.00, stock: 5 },
    { id: 3, name: 'Comic: Spiderman #1', category: 'Comic', price: 8.50, stock: 15 },
]);

const getCategoryBadge = (category) => {
    switch (category) {
        case 'Manga': return 'badge bg-info text-dark';
        case 'Figura': return 'badge bg-primary';
        case 'Comic': return 'badge bg-success';
        default: return 'badge bg-secondary';
    }
};

const editProduct = (product) => {
    console.log('Editar producto:', product);
    // Lógica para cargar el producto en el formulario modal
    showModal.value = true;
};

const deleteProduct = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        products.value = products.value.filter(p => p.id !== id);
    }
};
</script>

<style scoped>
/* Estilos del modal para centrarlo y darle fondo */
.modal-backdrop-custom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-dialog-custom {
    max-width: 700px;
    width: 90%;
}
.modal-content {
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}
</style>