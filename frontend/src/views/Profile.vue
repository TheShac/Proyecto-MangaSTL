<template>
  <div class="container pt-5 pb-5 mt-4">
    <h1 class="display-5 fw-bold text-dark mb-1">Mi Perfil</h1>
    <p class="lead text-muted mb-4">Gestiona tu cuenta y preferencias</p>

    <ul class="nav nav-pills mb-4 d-flex bg-light rounded-pill p-2" id="profileTab" role="tablist">
      <li class="nav-item flex-grow-1" role="presentation">
        <button class="nav-link w-100 rounded-pill py-2 text-dark d-flex align-items-center justify-content-center"
                :class="{ 'active bg-white shadow-sm': activeTab === 'profile' }"
                @click="activeTab = 'profile'"
                type="button" role="tab" aria-selected="true">
          <img v-if="profile.image_profile" :src="profile.image_profile" alt="Foto de Perfil"
               class="rounded-circle me-2" style="width: 24px; height: 24px; object-fit: cover;">
          <i v-else class="bi bi-person me-2 fs-5"></i> Perfil
        </button>
      </li>
      <li class="nav-item flex-grow-1" role="presentation">
        <button class="nav-link w-100 rounded-pill py-2 text-dark d-flex align-items-center justify-content-center"
                :class="{ 'active bg-white shadow-sm': activeTab === 'orders' }"
                @click="activeTab = 'orders'"
                type="button" role="tab" aria-selected="false">
          <i class="bi bi-box-seam me-2 fs-5"></i> Pedidos
        </button>
      </li>
      <li class="nav-item flex-grow-1" role="presentation">
        <button class="nav-link w-100 rounded-pill py-2 text-dark d-flex align-items-center justify-content-center"
                :class="{ 'active bg-white shadow-sm': activeTab === 'favorites' }"
                @click="activeTab = 'favorites'"
                type="button" role="tab" aria-selected="false">
          <i class="bi bi-heart me-2 fs-5"></i> Favoritos
        </button>
      </li>
      <li class="nav-item flex-grow-1" role="presentation">
        <button class="nav-link w-100 rounded-pill py-2 text-dark d-flex align-items-center justify-content-center"
                :class="{ 'active bg-white shadow-sm': activeTab === 'settings' }"
                @click="activeTab = 'settings'"
                type="button" role="tab" aria-selected="false">
          <i class="bi bi-gear me-2 fs-5"></i> Configuración
        </button>
      </li>
    </ul>

    <div class="tab-content" id="profileTabContent">
      
      <div v-if="activeTab === 'profile'" class="tab-pane fade show active">
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="card-title fw-bold mb-0">Información Personal</h5>
              <button class="btn btn-sm btn-outline-secondary" @click="editPersonal = !editPersonal">Editar</button>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Nombre completo</label>
                <input v-if="editPersonal" type="text" class="form-control" v-model="profile.nombre">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.nombre }} {{ profile.apellido }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Email</label>
                <p class="form-control-plaintext fw-semibold">{{ profile.stl_email || profile.emp_email || 'N/A' }}</p> 
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Teléfono</label>
                <input v-if="editPersonal" type="text" class="form-control" v-model="editablePhone">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.stl_telefono || profile.emp_telefono || 'N/A' }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Nombre de Usuario</label>
                <p class="form-control-plaintext fw-semibold">{{ profile.stl_username || profile.emp_username || 'N/A' }}</p>
              </div>
            </div>
            <div v-if="editPersonal" class="d-flex justify-content-end mt-3">
                <button class="btn btn-secondary me-2" @click="cancelEdit('personal')">Cancelar</button>
                <button class="btn btn-primary" @click="savePersonal">Guardar</button>
            </div>
          </div>
        </div>

        <div class="card shadow-sm border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="card-title fw-bold mb-0">Dirección Personal</h5>
              <button class="btn btn-sm btn-outline-secondary" @click="editAddress = !editAddress">Editar</button>
            </div>
            <div class="row">
              <div class="col-12 mb-3">
                <label class="form-label text-muted small">Dirección</label>
                <input v-if="editAddress" type="text" class="form-control" v-model="profile.address">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.address }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Ciudad</label>
                <input v-if="editAddress" type="text" class="form-control" v-model="profile.city">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.city }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Código Postal</label>
                <input v-if="editAddress" type="text" class="form-control" v-model="profile.postalCode">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.postalCode }}</p>
              </div>
            </div>
              <div v-if="editAddress" class="d-flex justify-content-end mt-3">
                <button class="btn btn-secondary me-2" @click="cancelEdit('address')">Cancelar</button>
                <button class="btn btn-primary" @click="saveAddress">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'orders'" class="tab-pane fade show active">
         <div class="card shadow-sm border-0 p-4">
            <h5 class="card-title fw-bold mb-3">Últimos 10 Pedidos</h5>
            <div v-if="orders.length === 0" class="alert alert-info mb-0">
               No has realizado ningún pedido aún.
            </div>
            <div v-else>
               <div class="list-group">
                  <div v-for="order in orders" :key="order.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2 rounded">
                     <div>
                        <h6 class="mb-1 fw-bold">Pedido #{{ order.id }}</h6>
                        <small class="text-muted">Fecha: {{ order.date }}</small><br>
                        <small class="text-muted">Estado: <span :class="{'text-success': order.status === 'Completado', 'text-warning': order.status === 'Pendiente'}">{{ order.status }}</span></small>
                     </div>
                     <span class="badge bg-primary rounded-pill">${{ order.total.toLocaleString('es-CL') }}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div v-if="activeTab === 'favorites'" class="tab-pane fade show active">
         <div class="card shadow-sm border-0 p-4">
            <h5 class="card-title fw-bold mb-3">Mi Lista de Deseos</h5>
            <div v-if="wishlist.length === 0" class="alert alert-info mb-0">
               Tu lista de deseos está vacía.
            </div>
            <div v-else class="row row-cols-1 row-cols-md-3 g-3">
               <div class="col" v-for="item in wishlist" :key="item.id">
                  <div class="card h-100">
                     <img :src="item.image" class="card-img-top" :alt="item.name" style="height: 200px; object-fit: cover;">
                     <div class="card-body">
                        <h6 class="card-title fw-bold">{{ item.name }}</h6>
                        <p class="card-text text-muted small">{{ item.category }}</p>
                        <p class="fw-bold text-primary">${{ item.price.toLocaleString('es-CL') }}</p>
                        <div class="d-flex justify-content-between">
                           <button class="btn btn-sm btn-outline-success">Añadir al Carrito</button>
                           <button class="btn btn-sm btn-outline-danger" @click="removeFromWishlist(item.id)">
                              <i class="bi bi-x-lg"></i>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div v-if="activeTab === 'settings'" class="tab-pane fade show active">
         <div class="card shadow-sm border-0 p-4">
            <h5 class="card-title fw-bold mb-3">Configuración de la Cuenta</h5>
            <p class="text-muted">Aquí podrás gestionar la configuración de tu cuenta, como cambiar la contraseña, notificaciones, etc.</p>
            <button class="btn btn-warning">Cambiar Contraseña</button>
         </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const activeTab = ref('profile'); 

// --- Datos del Perfil (Estado Inicial) ---
const profile = ref({
  nombre: 'Cargando...',
  apellido: '',
  stl_email: null,
  emp_email: null,
  stl_username: null,
  emp_username: null,
  stl_telefono: null, // Campo para cliente
  emp_telefono: null, // Campo para empleado
  image_profile: null,
  
  // Mockup para edición de dirección
  address: 'No hay dirección registrada',
  city: 'N/A',
  postalCode: 'N/A',
});

const originalProfile = ref({});

const editPersonal = ref(false);
const editAddress = ref(false);

// --- Propiedad Computada para Teléfono (SOLUCIÓN al v-model) ---
const editablePhone = computed({
    // GET: Muestra el teléfono del cliente si existe, sino, el del empleado
    get() {
        return profile.value.stl_telefono || profile.value.emp_telefono || '';
    },
    // SET: Cuando el usuario escribe, guarda el valor en la propiedad correcta
    set(newValue) {
        // Priorizar el campo de cliente si existe, si no, usar el de empleado.
        if (profile.value.stl_telefono !== undefined && profile.value.stl_telefono !== null) {
            profile.value.stl_telefono = newValue;
        } else if (profile.value.emp_telefono !== undefined && profile.value.emp_telefono !== null) {
            profile.value.emp_telefono = newValue;
        }
        // Si ambos son null, simplemente no se guarda en el modelo real hasta que se haga el POST.
    }
});


// --- MOCKUP DATA (Pedidos y Favoritos) ---
const orders = ref([
  { id: '12345', date: '2023-10-26', total: 25000, status: 'Completado' },
  { id: '12346', date: '2023-10-25', total: 12990, status: 'Pendiente' },
  { id: '12347', date: '2023-10-20', total: 45000, status: 'Completado' },
  { id: '12348', date: '2023-10-18', total: 30000, status: 'Completado' },
  { id: '12349', date: '2023-10-15', total: 18500, status: 'Pendiente' },
]);
const wishlist = ref([
  { id: 1, name: 'Manga: One Piece Vol. 1', category: 'Manga / Shonen', price: 12990, image: 'https://picsum.photos/200/300?random=1' },
  { id: 2, name: 'Figura: Levi Ackerman', category: 'Figura / Ataque Titanes', price: 55000, image: 'https://picsum.photos/200/300?random=2' },
]);


// --- FUNCIONES DE CARGA Y EDICIÓN ---

const fetchProfileData = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        // Redirigir a login si no hay token
        router.push({ name: 'Login' });
        return;
    }

    try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        // Mapea y actualiza el estado del perfil
        profile.value = {
            ...profile.value, // Mantiene los valores de mockup de dirección
            ...response.data, // Sobreescribe con los datos reales del backend
        };
        
        // Guarda el estado original
        originalProfile.value = { ...profile.value }; 

    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        if (error.response?.status === 401) {
            // Manejar sesión expirada
            // authStore.logout(); // Si tienes el store importado
            router.push({ name: 'Login' });
        }
    }
};


const savePersonal = async () => {
    // Aquí implementas la llamada PUT para actualizar nombre, apellido y teléfono
    alert('Funcionalidad de guardar personal pendiente de conexión al backend.');
    editPersonal.value = false;
    // ...
};

const saveAddress = async () => {
    // Aquí implementas la llamada PUT para actualizar dirección
    alert('Funcionalidad de guardar dirección pendiente de conexión al backend.');
    editAddress.value = false;
    // ...
};

const cancelEdit = (section) => {
    if (section === 'personal') {
        // Restaura los campos personales desde el estado original
        profile.value.nombre = originalProfile.value.nombre;
        profile.value.apellido = originalProfile.value.apellido;
        profile.value.stl_telefono = originalProfile.value.stl_telefono;
        profile.value.emp_telefono = originalProfile.value.emp_telefono;
        editPersonal.value = false;
    } else if (section === 'address') {
        // Restaura los campos de dirección desde el estado original
        profile.value.address = originalProfile.value.address;
        profile.value.city = originalProfile.value.city;
        profile.value.postalCode = originalProfile.value.postalCode;
        editAddress.value = false;
    }
};

const removeFromWishlist = (itemId) => {
  wishlist.value = wishlist.value.filter(item => item.id !== itemId);
  alert('Producto eliminado de tu lista de deseos.');
};


// --- Carga Inicial ---
onMounted(() => {
  fetchProfileData();
  // Se inicializa originalProfile.value.address/city/postalCode después de fetchProfileData, 
  // pero lo hacemos aquí para el mockup inicial antes de la carga
  originalProfile.value.address = profile.value.address;
  originalProfile.value.city = profile.value.city;
  originalProfile.value.postalCode = profile.value.postalCode;
});
</script>

<style scoped>
.container {
  /* Ajusta el padding superior para evitar que la navbar fija cubra el título */
  padding-top: 4rem; 
}
.nav-pills .nav-link {
  transition: all 0.2s ease-in-out;
}
.nav-pills .nav-link:not(.active):hover {
  background-color: #e9ecef;
}
</style>