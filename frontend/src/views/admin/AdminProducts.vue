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
                <th>Estado</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Editorial</th>
                <th>Género</th>
                <th>Creado por</th>
                <th>Modificado por</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id_producto">
                <td>{{ product.nombre }}</td>
                <td>{{ product.estado }}</td>
                <td>{{ product.descripcion }}</td>
                <td>${{ product.precio?.toFixed(2) }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.editorial || 'N/A' }}</td>
                <td>{{ product.genero || 'N/A' }}</td>
                <td>{{ product.creado_por || 'N/A' }}</td>
                <td>{{ product.modificado_por || 'N/A' }}</td>
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
                <td colspan="10" class="text-muted py-3">No hay productos registrados.</td>
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
                  <label class="form-label fw-semibold">Estado</label>
                  <input v-model="currentProduct.estado" type="text" class="form-control" required />
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Descripción</label>
                  <textarea v-model="currentProduct.descripcion" class="form-control"></textarea>
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

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Editorial</label>
                  <input v-model="currentProduct.editorial" type="text" class="form-control" />
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Género</label>
                  <input v-model="currentProduct.genero" type="text" class="form-control" />
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold">Imagen</label>
                  <input type="file" accept="image/*" @change="handleImageUpload" />
                  <div v-if="currentProduct.imagen_url" class="mt-2">
                    <img :src="currentProduct.imagen_url" alt="Preview" style="max-width:150px;" />
                  </div>
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

const API_URL = 'http://localhost:3000/api/products';
const products = ref([]);
const isLoading = ref(false);
const isSaving = ref(false);
const isEditing = ref(false);
const currentProduct = ref({});
const productModal = ref(null);

let modalInstance = null;

onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener productos');
    const data = await res.json();
    products.value = data.data || [];
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const openModal = async (edit = false, product = null) => {
  isEditing.value = edit;
  currentProduct.value = edit
    ? { ...product }
    : { nombre: '', estado: '', descripcion: '', precio: 0, stock: 0, editorial: '', genero: '', imagen_url: '' };

  await nextTick();
  modalInstance = Modal.getOrCreateInstance(productModal.value);
  modalInstance.show();
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    currentProduct.value.imagen_url = e.target.result;
  };
  reader.readAsDataURL(file);
};

const saveProduct = async () => {
  isSaving.value = true;
  try {
    const method = isEditing.value ? 'PUT' : 'POST';
    const url = isEditing.value ? `${API_URL}/${currentProduct.value.id_producto}` : `${API_URL}/create`;

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
    await deleteProduct(product.id_producto);
  }
};

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
