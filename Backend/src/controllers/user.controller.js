import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';

/**
 * Crear un cliente registrado
 */
export const registerCustomer = async (req, res) => {
    try {
        const { nombre, apellido, email, username, password, telefono } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario base
        const [result] = await pool.query(
        `INSERT INTO Usuario_STL (uuid_user, nombre, apellido, email)
        VALUES (UUID(), ?, ?, ?)`,
        [nombre, apellido, email]
        );

        const uuid_user = result.insertId;

        // Crear usuario cliente registrado
        await pool.query(
        `INSERT INTO UserCustomer (uuid_user, stl_username, stl_password, telefono) 
        VALUES (UUID(), ?, ?, ?)`,
        [username, hashedPassword, telefono]
        );

        res.status(201).json({ message: 'Cliente registrado exitosamente' });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Crear usuario empleado / admin / superadmin
 */
export const createEmp = async (req, res) => {
    try {
        const { nombre, apellido, email, username, password, telefono, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario base
        const [result] = await pool.query(
        `INSERT INTO Usuario_STL (uuid_user, nombre, apellido, email)
        VALUES (UUID(), ?, ?, ?)`,
        [nombre, apellido, email]
        );

        const uuid_user = result.insertId;

        // Crear usuario empleado
        await pool.query(
        `INSERT INTO UserEmpsTL (uuid_user, username, password, telefono, role) 
        VALUES (UUID(), ?, ?, ?, ?)`,
        [username, hashedPassword, telefono, role || 'stl_emps']
        );

        res.status(201).json({ message: 'Empleado/Admin creado exitosamente' });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtener todos los usuarios registrados (clientes + empleados)
 */
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT u.uuid_user, u.nombre, u.apellido, u.email,
                c.stl_username AS cliente_username,
                e.username AS empleado_username, e.role
        FROM Usuario_STL u
        LEFT JOIN UserCustomer c ON u.uuid_user = c.uuid_user
        LEFT JOIN UserEmpsTL e ON u.uuid_user = e.uuid_user
        `);
        res.json(rows);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Actualizar datos de un usuario
 */
export const updateUser = async (req, res) => {
    try {
        const { uuid_user } = req.params;
        const { nombre, apellido, email } = req.body;

        await pool.query(
        `UPDATE Usuario_STL SET nombre = ?, apellido = ?, email = ? WHERE uuid_user = ?`,
        [nombre, apellido, email, uuid_user]
        );

        res.json({ message: 'Usuario actualizado correctamente' });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Eliminar un usuario
 */
export const deleteUser = async (req, res) => {
    try {
        const { uuid_user } = req.params;

        await pool.query(`DELETE FROM Usuario_STL WHERE uuid_user = ?`, [uuid_user]);

        res.json({ message: 'Usuario eliminado correctamente' });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
