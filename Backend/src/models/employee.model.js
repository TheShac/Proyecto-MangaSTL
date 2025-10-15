import { pool } from '../config/db.js';

export const EmployeeModel = {
  findByEmailOrUsername: async (identifier) => {
    const [rows] = await pool.query(
      `SELECT e.*, r.role_name FROM UserEmps_STL e 
       LEFT JOIN Role r ON e.id_role = r.id_role
       WHERE e.email = ? OR e.username = ?`,
      [identifier, identifier]
    );
    return rows[0];
  },

  create: async (userData) => {
    const { username, email, password, id_role } = userData;
    const [result] = await pool.query(
      `INSERT INTO UserEmps_STL (username, email, password, id_role) VALUES (?, ?, ?, ?)`,
      [username, email, password, id_role]
    );
    return result.insertId;
  },
};
