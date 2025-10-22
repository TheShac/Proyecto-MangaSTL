import dotenv from 'dotenv';
import { ProductModel } from '../models/product.model.js';

dotenv.config();

export const getEmployeeUuid = (req) => {
    return req.user?.uuid_emps || '00000000-0000-0000-0000-000000000001';
};

// OBTENER TODOS LOS PRODUCTOS
export const getAllProducts = async (req, res) => {
    try{
        const products = await ProductModel.findAll();
        res.json({ success: true, data: products });
    }
    catch(error){
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ success: false, message: "Error interno del servidor al obtener productos." });
    }
};

// OBTENER PRODUCTO POR SU ID
export const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID de producto inválido." });
    }

    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Producto no encontrado." });
        }
        return res.json({ success: true, data: product });
    } 
    catch (error) {
        console.error('Error al obtener producto por ID:', error);
        return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
};

// CREAR NUEVO PRODUCTO
export const CreateProducto = async (req, res) => {
    try {
        if(!req.user){
            return res.status(403).json({ message: 'Acceso denegado. Se requiere autenticación.' });
        }

        const uuid_emp_create = req.user.id;
        if(req.user.userType !== 'employee'){
            return res.status(403).json({ message: 'Solo los empleados pueden crear productos.' });
        }
        
        const { nombre, estado, descripcion, precio, imagen_url, stock } = req.body;
            
        if (!nombre || !precio || !estado ) {
            return res.status(400).json({ message: "Faltan campos obligatorios: nombre, estado, precio." });
        }
    
        const result = await ProductModel.create({
            nombre, estado, descripcion, precio, imagen_url, stock, uuid_emp_create
        });

        res.json({ message: 'Producto creado correctamente', result });
    } 
    catch (error) {
        console.error('Error al crear producto:', error);
        return res.status(500).json({ message: "Error interno al crear el producto.", detalle: error.message });
    }
};

// ACTUALIZAR PRODUCTO
export const ActualizarProducto = async (req, res) => {
    if(!req.user){
        return res.status(403).json({ message: 'Acceso denegado. Se requiere autenticación.' });
    }
    if(req.user.userType !== 'employee'){
        return res.status(403).json({ message: 'Solo los empleados pueden modificar productos.' });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID de producto inválido." });
    }

    const { nombre, estado, descripcion, precio, imagen_url, stock } = req.body;
    const uuid_emp_modify = req.user.id;

    if (!nombre || !estado || precio === undefined || stock === undefined) {
        return res.status(400).json({ success: false, message: "Faltan campos obligatorios: nombre, estado, precio, stock." });
    }

    try {
        const productData = {
            nombre, estado, descripcion, precio, imagen_url, stock, uuid_emp_modify
        };
            
        const success = await ProductModel.update(id, productData);

        if (!success) {
            return res.status(404).json({ success: false, message: "Producto no encontrado o no se realizaron cambios." });
        }
        return res.json({ success: true, message: "Producto actualizado exitosamente." });
    } 
    catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(500).json({ success: false, message: "Error interno al actualizar el producto." });
    }
};

// ELIMINAR PRODUCTO
export const EliminarProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID de producto inválido." });
    }

    try {
        const affectedRows = await ProductModel.delete(id);

        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Producto no encontrado." });
        }
        return res.status(204).send(); 
    } 
    catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ success: false, message: "Error interno al eliminar el producto." });
    }
};