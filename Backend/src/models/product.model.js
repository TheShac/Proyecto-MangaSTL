import { pool } from '../config/db.js';

export const ProductModel = {

    // OBTENER TODOS LOS PRODUCTOS
    findAll: async() => {
        const [rows] = await pool.query(
            `SELECT * FROM Producto`
        );
        return rows;
    },

    // OBTENER PRODUCTO POR ID
    findById: async(id) => {
        const [rows] = await pool.query(
            `SELECT * FROM Producto WHERE id_producto = ?`,
            [id]
        );
        return rows[0];
    },

    // CREAR NUEVO PRODUCTO
    create: async(productData) => {

        const { nombre, estado, descripcion, precio, imagen_url, stock, uuid_emp_create } = productData;

        const [result] = await pool.query(
             `INSERT INTO Producto (nombre, estado, descripcion, precio, imagen_url, stock, uuid_emp_create) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, estado, descripcion, precio, imagen_url || '', stock, uuid_emp_create]
        );
        return result;
    },

    // ACTUALIZAR PRODUCTO
    update: async(id, productData) => {
        const {nombre, estado, descripcion, precio, imagen_url, stock, uuid_emp_modify} = productData;
        const [result] = await pool.query(
          `UPDATE Producto SET 
           nombre = ?, estado = ?, descripcion = ?, precio = ?, imagen_url = ?, stock = ?, uuid_emp_modify = ?
           WHERE id_producto = ?`, 
          [nombre, estado, descripcion, precio, imagen_url, stock, uuid_emp_modify, id]
        );
        return result.affectedRows > 0;
    },

    // ELIMINAR PRODUCTO
    delete: async(id) => {
        const [result] = await pool.query(
            `DELETE FROM Producto WHERE id_producto = ?`, 
            [id]
        );
        return result.affectedRows;
    },
}