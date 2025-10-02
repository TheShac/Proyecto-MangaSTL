import { pool } from "../config/db";

export const gerUsuarioByEmailOrUsername = async ( identificador ) => {
    const [rows] = await pool.query(
        `SELECT 
            u.uuid_user, u.nombre, u.apellido, u.email,
            c.stl_username, c.stl_password,
            e.username, e.password, e.role
        FROM Usuario_STL u
        LEFT JOIN UserCustomer c ON u.uuid_user = c.uuid_user
        LEFT JOIN UserEmpsTL e ON u.uuid_user = e.uuid_user
        WHERE u.email = ? OR c.stl_username = ? OR e.username = ?`,
        [identificador, identificador, identificador]
    );
    return rows[0];
};