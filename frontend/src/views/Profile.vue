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
          <i class="bi bi-person me-2 fs-5"></i> Perfil
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
                <input v-if="editPersonal" type="text" class="form-control" v-model="profile.fullName">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.fullName }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Email</label>
                <p class="form-control-plaintext fw-semibold">{{ profile.email }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Teléfono</label>
                <input v-if="editPersonal" type="text" class="form-control" v-model="profile.phone">
                <p v-else class="form-control-plaintext fw-semibold">{{ profile.phone }}</p>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted small">Nombre de Usuario</label>
                <p class="form-control-plaintext fw-semibold">{{ profile.username }}</p>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const activeTab = ref('profile'); // Pestaña activa por defecto

// --- Datos del Perfil (ejemplo, se cargarían desde tu backend) ---
const profile = ref({
  fullName: 'Juan Pérez',
  email: 'juan@example.com',
  phone: '+54 11 1234-5678',
  username: 'juanperez',
  address: 'Av. Corrientes 1234, CABA',
  city: 'Santiago',
  postalCode: '1234567',
});

// Para guardar el estado original y permitir "cancelar" la edición
const originalProfile = ref({});

const editPersonal = ref(false);
const editAddress = ref(false);

// --- Datos de Pedidos (ejemplo) ---
const orders = ref([
  { id: '12345', date: '2023-10-26', total: 25000, status: 'Completado' },
  { id: '12346', date: '2023-10-25', total: 12990, status: 'Pendiente' },
  { id: '12347', date: '2023-10-20', total: 45000, status: 'Completado' },
  { id: '12348', date: '2023-10-18', total: 30000, status: 'Completado' },
  { id: '12349', date: '2023-10-15', total: 18500, status: 'Pendiente' },
  // ... más pedidos, hasta 10
]);

// --- Lista de Deseos (ejemplo) ---
const wishlist = ref([
  { id: 1, name: 'Manga: One Piece Vol. 1', category: 'Manga / Shonen', price: 12990, image: 'https://picsum.photos/200/300?random=1' },
  { id: 2, name: 'Figura: Levi Ackerman', category: 'Figura / Ataque Titanes', price: 55000, image: 'https://picsum.photos/200/300?random=2' },
  { id: 3, name: 'Comic: Batman: The Killing Joke', category: 'Comic / DC', price: 15000, image: 'https://picsum.photos/200/300?random=3' },
]);

// --- Funciones de Edición ---
const savePersonal = async () => {
  // Lógica para enviar 'profile.fullName' y 'profile.phone' a tu backend
  console.log('Guardando información personal:', profile.value.fullName, profile.value.phone);
  try {
    // const token = localStorage.getItem('accessToken');
    // const res = await axios.put('http://localhost:3000/api/profile/personal', {
    //   fullName: profile.value.fullName,
    //   phone: profile.value.phone
    // }, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // console.log('Actualización personal exitosa:', res.data);
    alert('Información personal actualizada con éxito!');
    editPersonal.value = false;
    originalProfile.value.fullName = profile.value.fullName;
    originalProfile.value.phone = profile.value.phone;
  } catch (error) {
    console.error('Error al actualizar información personal:', error);
    alert('Error al actualizar información personal.');
  }
};

const saveAddress = async () => {
  // Lógica para enviar 'profile.address', 'profile.city', 'profile.postalCode' a tu backend
  console.log('Guardando dirección:', profile.value.address, profile.value.city, profile.value.postalCode);
  try {
    // const token = localStorage.getItem('accessToken');
    // const res = await axios.put('http://localhost:3000/api/profile/address', {
    //   address: profile.value.address,
    //   city: profile.value.city,
    //   postalCode: profile.value.postalCode
    // }, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // console.log('Actualización de dirección exitosa:', res.data);
    alert('Dirección actualizada con éxito!');
    editAddress.value = false;
    originalProfile.value.address = profile.value.address;
    originalProfile.value.city = profile.value.city;
    originalProfile.value.postalCode = profile.value.postalCode;
  } catch (error) {
    console.error('Error al actualizar dirección:', error);
    alert('Error al actualizar dirección.');
  }
};

const cancelEdit = (section) => {
  if (section === 'personal') {
    profile.value.fullName = originalProfile.value.fullName;
    profile.value.phone = originalProfile.value.phone;
    editPersonal.value = false;
  } else if (section === 'address') {
    profile.value.address = originalProfile.value.address;
    profile.value.city = originalProfile.value.city;
    profile.value.postalCode = originalProfile.value.postalCode;
    editAddress.value = false;
  }
};

const removeFromWishlist = (itemId) => {
  wishlist.value = wishlist.value.filter(item => item.id !== itemId);
  alert('Producto eliminado de tu lista de deseos.');
  // Aquí también podrías enviar una solicitud a tu backend para actualizar la wishlist
};

// --- Carga de datos al montar el componente ---
onMounted(() => {
  // Aquí es donde cargarías los datos reales del perfil, pedidos y wishlist
  // desde tu backend usando axios.

  // Ejemplo: Carga de datos del perfil
  // const token = localStorage.getItem('accessToken');
  // if (token) {
  //   axios.get('http://localhost:3000/api/profile', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   .then(response => {
  //     profile.value = response.data;
  //     originalProfile.value = { ...response.data }; // Guarda el estado original
  //   })
  //   .catch(error => {
  //     console.error('Error al cargar el perfil:', error);
  //     // Manejar error, e.g., redirigir a login
  //   });

  //   // Cargar pedidos
  //   axios.get('http://localhost:3000/api/orders/me', { /* headers */ })
  //     .then(response => orders.value = response.data.slice(0, 10)) // Obtener solo los últimos 10
  //     .catch(error => console.error('Error al cargar pedidos:', error));

  //   // Cargar wishlist
  //   axios.get('http://localhost:3000/api/wishlist/me', { /* headers */ })
  //     .then(response => wishlist.value = response.data)
  //     .catch(error => console.error('Error al cargar wishlist:', error));
  // }

  // Inicializa originalProfile con los datos de ejemplo al cargar
  originalProfile.value = { ...profile.value };
});
</script>

<style scoped>
/* Estilos para el espacio entre la navbar y el contenido */
.container {
  padding-top: 4rem; /* Ajusta este valor según la altura de tu navbar fija */
}

/* Opcional: Estilo para los botones nav-link */
.nav-pills .nav-link {
  transition: all 0.2s ease-in-out;
}
.nav-pills .nav-link:not(.active):hover {
    background-color: #e9ecef; /* Color bg-light de Bootstrap */
}

.cursor-pointer {
  cursor: pointer;
}
</style>