<template>
  <div class="container py-5">
    <!-- Título y botón -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-dark">Gestión de Productos</h2>
      <button class="btn btn-warning btn-lg shadow-sm" @click="openModal(false)">
        <i class="bi bi-plus-lg"></i> Nuevo Producto
      </button>
    </div>

    <!-- Tabla de productos -->
    <div class="card shadow border-0 rounded-4">
      <div class="card-body">
        <div v-if="isLoading" class="text-center my-5">
          <div class="spinner-border text-warning" role="status"></div>
          <p class="mt-3">Cargando productos...</p>
        </div>

        <div v-else>
          <table class="table table-hover align-middle text-center">
            <thead class="table-warning">
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Creado por</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.nombre }}</td>
                <td>{{ product.categoria }}</td>
                <td>${{ product.precio?.toFixed(2) }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.creado_por || 'N/A' }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-2" @click="openModal(true, product)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(product)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="6" class="text-muted py-3">No hay productos registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de producto -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true" ref="productModal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content shadow rounded-4 border-0">
          <div class="modal-header bg-warning text-dark">
            <h5 class="modal-title">{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="saveProduct">
            <div class="modal-body bg-light">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Nombre</label>
                  <input v-model="currentProduct.nombre" type="text" class="form-control" required />
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Categoría</label>
                  <input v-model="currentProduct.categoria" type="text" class="form-control" required />
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Precio ($)</label>
                  <input
                    v-model.number="currentProduct.precio"
                    type="number"
                    class="form-control"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Stock</label>
                  <input
                    v-model.number="currentProduct.stock"
                    type="number"
                    class="form-control"
                    min="0"
                    required
                  />
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">URL Imagen</label>
                  <input
                    v-model="currentProduct.imagen"
                    type="url"
                    class="form-control"
                    placeholder="https://imagen.jpg"
                  />
                </div>
              </div>
            </div>

            <div class="modal-footer border-0">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-warning" :disabled="isSaving">
                <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
                {{ isEditing ? 'Guardar Cambios' : 'Crear Producto' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const API_URL = 'http://localhost:3000/api/products';
const products = ref([]);
const isLoading = ref(false);
const isSaving = ref(false);
const isEditing = ref(false);
const currentProduct = ref({});
const productModal = ref(null);

let modalInstance = null;

// 🔹 Cargar productos al montar
onMounted(async () => {
  await fetchProducts();
});

// 🔹 Obtener todos los productos
const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    products.value = await res.json();
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
  } finally {
    isLoading.value = false;
  }
};

// 🔹 Abrir modal (crear o editar)
const openModal = async (edit = false, product = null) => {
  isEditing.value = edit;
  currentProduct.value = edit
    ? { ...product }
    : { nombre: '', categoria: '', precio: 0, stock: 0, imagen: '' };

  // 🔸 Esperar a que el DOM renderice el modal antes de inicializarlo
  await nextTick();
  modalInstance = Modal.getOrCreateInstance(productModal.value);
  modalInstance.show();
};

// 🔹 Guardar o crear producto
const saveProduct = async () => {
  isSaving.value = true;
  try {
    const method = isEditing.value ? 'PUT' : 'POST';
    const url = isEditing.value ? `${API_URL}/${currentProduct.value.id}` : API_URL;

    const token = localStorage.getItem('accessToken');

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(currentProduct.value),
    });

    if (!res.ok) throw new Error('Error al guardar producto');

    Swal.fire('Éxito', isEditing.value ? 'Producto actualizado' : 'Producto creado', 'success');
    modalInstance.hide();
    await fetchProducts();
  } catch (err) {
    Swal.fire('Error', err.message, 'error');
  } finally {
    isSaving.value = false;
  }
};

// 🔹 Confirmar y eliminar producto
const confirmDelete = async (product) => {
  const result = await Swal.fire({
    title: '¿Eliminar producto?',
    text: `Se eliminará "${product.nombre}"`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, eliminar',
  });

  if (result.isConfirmed) {
    await deleteProduct(product.id);
  }
};

// 🔹 Eliminar producto
const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });

    if (!res.ok) throw new Error('Error al eliminar producto');
    Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
    await fetchProducts();
  } catch (err) {
    Swal.fire('Error', err.message, 'error');
  }
};
</script>

<style scoped>
.container {
  max-width: 1100px;
}
.table thead {
  font-weight: 600;
}
.btn {
  border-radius: 8px;
}
</style>
