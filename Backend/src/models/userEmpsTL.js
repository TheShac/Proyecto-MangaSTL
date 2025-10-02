import { pool } from "../config/db";

export const createUserEmp = async (user) => {
    const [result] = await pool.query(
        `INSERT INTO Usuario_STL (nombre, apellido, email) VALUES (?,?,?)`,
        [user.nombre, user.apellido, user.email]
    );

    const uuid_user = user.uuid_user;
    await pool.query(
        `INSERT INTO UserEmpsTL (uuise_user, username, password, role) VALUES (?,?,?,?)`,
        [uuid_user, user.username, user.password, user.role || 'stl_emps']  
    );
    return true;
};