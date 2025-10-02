import { pool } from "../config/db";

export const createUserCustomer = async (user) => {
    const conn = await pool.getConnection();
   try{
    await conn.beginTransaction();

    const [result] = await conn.query(
        `INSERT INTO Usuario_STL (nombre, apellido, email) VALUES (?,?,?)`,
        [user.nombre, user.apellido, user.email]
    );
    
    const uuid_user = result.insertId;
    await coon.query(
        `INSERT INTO UserCustomer (uuid_user, stl_username, stl_password, telefono) VALUES (?,?,?,?)`,
        [uuid_user, user.stl_username, user.stl_password, user.telefono]
    );

    await conn.commit();
    return true;
   }
   catch(error){
    await conn.rollback();
    throw error;
   }
   finally{
    conn.release();
   }

};