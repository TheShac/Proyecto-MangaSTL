import { pool } from '../config/db.js';

export const CustomerModel = {
  findByEmailOrUsername: async (identifier) => {
    const [rows] = await pool.query(
      `SELECT * FROM UserCustomer WHERE email = ? OR username = ?`,
      [identifier, identifier]
    );
    return rows[0];
  },

  create: async (userData) => {
    const { username, email, password, nombre, apellido } = userData;
    const [result] = await pool.query(
      `INSERT INTO UserCustomer (stl_username, stl_email, stl_password, stl_nombre, stl_apellido) VALUES (?, ?, ?, ?, ?)`,
      [username, email, password, nombre, apellido]
    );
    return result.insertId;
  },
};
