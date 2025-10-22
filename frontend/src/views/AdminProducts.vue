<template>
    <!-- NOTA: El wrapper y sidebar se eliminan, ya que AdminLayout se encarga de ellos. -->
    <div class="container-fluid py-4">
        
        <!-- Mensajes de Alerta/Feedback -->
        <div v-if="alertMessage" :class="['alert', alertType, 'shadow-sm']" role="alert">
            {{ alertMessage }}
        </div>

        <h1 class="display-5 fw-bold text-dark mb-1">Gestión de Productos</h1>
        <p class="lead text-muted mb-4">Crea, edita o elimina mangas, figuras y otros artículos de tu catálogo.</p>

        <!-- Botón de Acción y Carga -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <button 
                class="btn btn-warning fw-bold text-white shadow-sm" 
                @click="openCreateModal"
                :disabled="isLoading"
            >
                <i class="bi bi-plus-circle me-2"></i>Añadir Nuevo Producto
            </button>
            <div v-if="isLoading" class="d-flex align-items-center text-warning">
                <div class="spinner-border spinner-border-sm me-2" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                Cargando productos...
            </div>
        </div>

        <!-- Tabla/Listado de Productos -->
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
                                <td class="small text-muted">{{ product.id }}</td>
                                <td>{{ product.name }}</td>
                                <td><span :class="getCategoryBadge(product.category)">{{ product.category }}</span></td>
                                <td>${{ product.price ? product.price.toFixed(2) : '0.00' }}</td>
                                <td>
                                    <span :class="{'text-danger fw-bold': product.stock <= 10}">{{ product.stock }}</span>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-info me-2" @click="openEditModal(product)">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(product.id, product.name)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="products.length === 0 && !isLoading" class="text-center py-5 text-muted">
                    Aún no hay productos en el catálogo. ¡Crea el primero!
                </div>
            </div>
        </div>

        <!-- Modal para Crear/Editar Producto -->
        <div v-if="showModal" class="modal-backdrop-custom">
            <div class="modal-dialog-custom">
                <div class="modal-content">
                    <form @submit.prevent="saveProduct">
                        <div class="modal-header bg-warning text-dark">
                            <h5 class="modal-title fw-bold">
                                {{ isEditing ? 'Editar Producto: ' + currentProduct.name : 'Crear Nuevo Producto' }}
                            </h5>
                            <button type="button" class="btn-close" @click="closeModal"></button>
                        </div>
                        <div class="modal-body">
                            
                            <div class="mb-3">
                                <label for="productName" class="form-label">Nombre del Producto</label>
                                <input type="text" class="form-control" id="productName" v-model="currentProduct.name" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="productDescription" class="form-label">Descripción</label>
                                <textarea class="form-control" id="productDescription" v-model="currentProduct.description" rows="3"></textarea>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="productPrice" class="form-label">Precio ($)</label>
                                    <input type="number" class="form-control" id="productPrice" v-model.number="currentProduct.price" required min="0.01" step="0.01">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="productStock" class="form-label">Stock Inicial</label>
                                    <input type="number" class="form-control" id="productStock" v-model.number="currentProduct.stock" required min="0" step="1">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="productCategory" class="form-label">Categoría</label>
                                    <select class="form-select" id="productCategory" v-model="currentProduct.category" required>
                                        <option value="" disabled>Seleccione...</option>
                                        <option value="Manga">Manga</option>
                                        <option value="Figura">Figura</option>
                                        <option value="Comic">Comic</option>
                                        <option value="Merchandising">Merchandising</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Nota: Aquí iría el campo de subida de imagen, pero lo simplificamos por ahora -->
                            <div class="mb-3">
                                <label for="productImageUrl" class="form-label">URL de Imagen (Mock)</label>
                                <input type="url" class="form-control" id="productImageUrl" v-model="currentProduct.imageUrl" placeholder="http://placehold.co/100x100">
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
                            <button type="submit" class="btn btn-warning text-white fw-bold" :disabled="isSaving">
                                <span v-if="isSaving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {{ isEditing ? 'Guardar Cambios' : 'Crear Producto' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Modal de Confirmación de Eliminación -->
        <div v-if="showDeleteConfirm" class="modal-backdrop-custom">
            <div class="modal-dialog-custom modal-sm">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title fw-bold">Confirmar Eliminación</h5>
                        <button type="button" class="btn-close btn-close-white" @click="showDeleteConfirm = false"></button>
                    </div>
                    <div class="modal-body">
                        <p>¿Estás seguro de que deseas eliminar permanentemente el producto **{{ productToDelete.name }}**?</p>
                        <p class="text-danger small fw-bold">¡Esta acción es irreversible!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showDeleteConfirm = false">Cancelar</button>
                        <button type="button" class="btn btn-danger fw-bold" @click="executeDelete" :disabled="isSaving">
                            <span v-if="isSaving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

// --- Estado de la UI ---
const products = ref([]);
const isLoading = ref(false);
const isSaving = ref(false);
const showModal = ref(false);
const isEditing = ref(false);
const alertMessage = ref(null);
const alertType = ref('alert-success');

// Estado para la eliminación
const showDeleteConfirm = ref(false);
const productToDelete = reactive({ id: null, name: '' });

// Objeto para el formulario (Crear/Editar)
const initialProductState = {
    id: null,
    name: '',
    description: '',
    price: 0.01,
    stock: 0,
    category: '',
    imageUrl: 'http://placehold.co/100x100'
};
const currentProduct = reactive({ ...initialProductState });

// Función de utilidad para simular una API call
const API_BASE_URL = '/api/products'; 
const mockFetch = async (url, options = {}) => {
    // Simula retardo de red
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // Aquí iría tu lógica real de fetch, pero usamos mock data por ahora.
    // Simulación de productos que persisten en la memoria (sólo para esta sesión)
    let currentProducts = JSON.parse(localStorage.getItem('mockProducts')) || [
        { id: 1, name: 'Manga: One Piece Vol. 1', description: 'Primer volumen de la saga East Blue.', category: 'Manga', price: 12.99, stock: 45, imageUrl: 'http://placehold.co/100x100' },
        { id: 2, name: 'Figura Goku SSJ', description: 'Figura de colección escala 1/10.', category: 'Figura', price: 45.00, stock: 5, imageUrl: 'http://placehold.co/100x100' },
        { id: 3, name: 'Comic: Spiderman #1', description: 'Reimpresión de Amazing Fantasy #15.', category: 'Comic', price: 8.50, stock: 15, imageUrl: 'http://placehold.co/100x100' },
    ];

    // GET /api/products
    if (options.method === 'GET' || !options.method) {
        return { ok: true, json: () => Promise.resolve(currentProducts) };
    }

    const body = options.body ? JSON.parse(options.body) : {};

    // POST /api/products (Crear)
    if (options.method === 'POST') {
        const newId = Math.max(...currentProducts.map(p => p.id), 0) + 1;
        const newProduct = { ...body, id: newId };
        currentProducts.push(newProduct);
        localStorage.setItem('mockProducts', JSON.stringify(currentProducts));
        return { ok: true, json: () => Promise.resolve(newProduct) };
    }
    
    // PUT /api/products/:id (Editar)
    if (options.method === 'PUT' && url.includes(API_BASE_URL + '/')) {
        const id = parseInt(url.split('/').pop());
        const index = currentProducts.findIndex(p => p.id === id);
        if (index !== -1) {
            currentProducts[index] = { ...currentProducts[index], ...body };
            localStorage.setItem('mockProducts', JSON.stringify(currentProducts));
            return { ok: true, json: () => Promise.resolve(currentProducts[index]) };
        }
        return { ok: false, status: 404 };
    }

    // DELETE /api/products/:id (Eliminar)
    if (options.method === 'DELETE' && url.includes(API_BASE_URL + '/')) {
        const id = parseInt(url.split('/').pop());
        currentProducts = currentProducts.filter(p => p.id !== id);
        localStorage.setItem('mockProducts', JSON.stringify(currentProducts));
        return { ok: true, status: 204 };
    }

    return { ok: false, status: 500 };
};


// --- Métodos CRUD ---

const fetchProducts = async () => {
    isLoading.value = true;
    try {
        // Reemplaza mockFetch por tu fetch real: await fetch(API_BASE_URL)
        const response = await mockFetch(API_BASE_URL, { method: 'GET' }); 
        
        if (response.ok) {
            products.value = await response.json();
            // Ordenar por ID descendente
            products.value.sort((a, b) => b.id - a.id); 
        } else {
            showAlert('Error al cargar los productos.', 'alert-danger');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        showAlert('Error de conexión con el servidor.', 'alert-danger');
    } finally {
        isLoading.value = false;
    }
};

const saveProduct = async () => {
    isSaving.value = true;
    const method = isEditing.value ? 'PUT' : 'POST';
    const url = isEditing.value ? `${API_BASE_URL}/${currentProduct.id}` : API_BASE_URL;

    // Crear un objeto limpio para enviar a la API
    const productData = {
        name: currentProduct.name,
        description: currentProduct.description,
        price: parseFloat(currentProduct.price),
        stock: parseInt(currentProduct.stock),
        category: currentProduct.category,
        imageUrl: currentProduct.imageUrl,
    };
    
    // Si estamos editando, incluimos el ID en el cuerpo (aunque ya está en la URL)
    if (isEditing.value) {
        productData.id = currentProduct.id;
    }

    try {
        const response = await mockFetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            showAlert(`Producto ${isEditing.value ? 'actualizado' : 'creado'} con éxito.`, 'alert-success');
            await fetchProducts(); // Refrescar la lista
            closeModal();
        } else {
            const errorData = await response.json();
            showAlert(`Error al ${isEditing.value ? 'actualizar' : 'crear'} el producto: ${errorData.message || 'Error desconocido'}.`, 'alert-danger');
        }
    } catch (error) {
        console.error('Save error:', error);
        showAlert(`Error de conexión al ${isEditing.value ? 'actualizar' : 'crear'} el producto.`, 'alert-danger');
    } finally {
        isSaving.value = false;
    }
};

const confirmDelete = (id, name) => {
    productToDelete.id = id;
    productToDelete.name = name;
    showDeleteConfirm.value = true;
};

const executeDelete = async () => {
    isSaving.value = true;
    showDeleteConfirm.value = false; // Cerrar el modal de confirmación
    
    try {
        const response = await mockFetch(`${API_BASE_URL}/${productToDelete.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            showAlert(`Producto "${productToDelete.name}" eliminado con éxito.`, 'alert-success');
            await fetchProducts(); // Refrescar la lista
        } else {
            showAlert('Error al eliminar el producto.', 'alert-danger');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showAlert('Error de conexión al eliminar el producto.', 'alert-danger');
    } finally {
        isSaving.value = false;
        productToDelete.id = null;
        productToDelete.name = '';
    }
};

// --- Métodos de Modal y UI ---

const openCreateModal = () => {
    Object.assign(currentProduct, initialProductState); // Resetear a estado inicial
    isEditing.value = false;
    showModal.value = true;
};

const openEditModal = (product) => {
    // Copiar las propiedades del producto al formulario
    Object.assign(currentProduct, product); 
    isEditing.value = true;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    // Limpiar el estado del formulario después de cerrar
    Object.assign(currentProduct, initialProductState); 
};

const showAlert = (message, type) => {
    alertMessage.value = message;
    alertType.value = type;
    setTimeout(() => {
        alertMessage.value = null;
    }, 5000); // Ocultar mensaje después de 5 segundos
};

const getCategoryBadge = (category) => {
    switch (category) {
        case 'Manga': return 'badge bg-info text-dark';
        case 'Figura': return 'badge bg-primary';
        case 'Comic': return 'badge bg-success';
        default: return 'badge bg-secondary';
    }
};

// --- Ciclo de Vida ---
onMounted(() => {
    fetchProducts();
});
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
    overflow-y: auto; /* Para permitir scroll si el modal es muy grande */
}
.modal-dialog-custom {
    max-width: 700px;
    width: 90%;
    margin: 1.75rem auto; /* Añadir margen superior e inferior */
}
.modal-content {
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}
.btn-close-white {
    filter: invert(1) grayscale(100%) brightness(200%); /* Hace la X blanca */
}

/* Estilos de la tabla para mejor visualización */
.table-responsive {
    border-radius: 0.25rem;
}
</style>