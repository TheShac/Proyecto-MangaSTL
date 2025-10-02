import express from 'express';
import {
  registerCustomer,
  createEmp,
  getAllUsers,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { checkRole, authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerCustomer);

router.use(authenticateToken);

// Crear empleados/admin/superadmin (solo admin o superadmin)
router.post('/create-employee', checkRole(['stl_administrador', 'stl_super_administrador']), createEmp);

// Obtener todos los usuarios (solo admin o superadmin)
router.get('/', checkRole(['stl_administrador', 'stl_super_administrador']), getAllUsers);

// Actualizar usuario (solo admin o superadmin)
router.put('/:uuid_user', checkRole(['stl_administrador', 'stl_super_administrador']), updateUser);

// Eliminar usuario (solo superadmin)
router.delete('/:uuid_user', checkRole(['stl_super_administrador']), deleteUser);

export default router;
