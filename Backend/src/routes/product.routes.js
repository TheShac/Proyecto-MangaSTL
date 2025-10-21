import { Router } from 'express';
import { getAllProducts, getProductById, CreateProducto, ActualizarProducto, EliminarProducto } from '../controllers/productController.js';

const router = Router();

// OBTENER TODOS LOS PRODUCTOS
router.get('/', getAllProducts);

// OBTENER PRODUCTO POR SU ID
router.get('/:id', getProductById);

// CREAR NUEVO PRODUCTO
router.post('/', CreateProducto);

// ACTUALIZAR PRODUCTO
router.put('/:id', ActualizarProducto);

// ELIMINAR PRODUCTO
router.delete('/:id', EliminarProducto);

export default router