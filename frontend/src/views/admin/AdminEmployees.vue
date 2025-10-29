<template>
  <div class="p-4">
    <h2 class="mb-4">Gestión de Empleados</h2>

    <!-- Botón Agregar Empleado -->
    <button class="btn btn-warning mb-3" @click="openModal">
      <i class="bi bi-person-plus me-2"></i>Agregar Empleado
    </button>

    <!-- Tabla de Empleados -->
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="table-warning">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id_emp">
            <td>{{ employee.emp_nombre }}</td>
            <td>{{ employee.emp_apellido }}</td>
            <td>{{ employee.emp_username }}</td>
            <td>{{ employee.emp_email }}</td>
            <td>{{ employee.emp_telefono }}</td>
            <td>{{ employee.nombre_rol }}</td>
            <td>
              <button class="btn btn-sm btn-info me-2">Editar</button>
              <button class="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning text-dark">
            <h5 class="modal-title">Agregar Empleado</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEmployee">
              <div class="mb-3">
                <label>Nombre</label>
                <input v-model="currentEmployee.emp_nombre" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label>Apellido</label>
                <input v-model="currentEmployee.emp_apellido" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label>Usuario</label>
                <input v-model="currentEmployee.emp_username" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label>Email</label>
                <input v-model="currentEmployee.emp_email" type="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label>Teléfono</label>
                <input v-model="currentEmployee.emp_telefono" type="text" class="form-control">
              </div>
              <div class="mb-3">
                <label>Rol</label>
                <select v-model="currentEmployee.id_role" class="form-select" required>
                  <option v-for="role in roles" :key="role.id_role" :value="role.id_role">{{ role.nombre_rol }}</option>
                </select>
              </div>
              <div class="mt-3 text-end">
                <button type="button" class="btn btn-secondary me-2" @click="closeModal">Cancelar</button>
                <button type="submit" class="btn btn-warning">Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllEmployees, createEmployee } from '../../services/EmployeeService';

const employees = ref([]);
const roles = ref([
  { id_role: 1, nombre_rol: 'Administrador' },
  { id_role: 2, nombre_rol: 'Empleado' }
]);

const currentEmployee = ref({});
const showModal = ref(false);

// Función para abrir modal y limpiar formulario
const openModal = () => {
  currentEmployee.value = {};
  showModal.value = true;
};

// Función para cerrar modal
const closeModal = () => {
  showModal.value = false;
  currentEmployee.value = {};
};

// Obtener token de localStorage
const token = ref(localStorage.getItem('token') || '');

// Cargar empleados desde backend
const fetchEmployees = async () => {
  try {
    employees.value = await getAllEmployees(token.value);
  } catch (err) {
    console.error('Error cargando empleados:', err);
  }
};

// Guardar nuevo empleado
const saveEmployee = async () => {
  try {
    await createEmployee(currentEmployee.value, token.value);
    await fetchEmployees(); // actualizar tabla
    closeModal();
  } catch (err) {
    console.error(err);
    alert('Error al guardar empleado');
  }
};

onMounted(() => {
  fetchEmployees();
});
</script>

<style>
.modal {
  transition: opacity 0.15s linear;
}
</style>
