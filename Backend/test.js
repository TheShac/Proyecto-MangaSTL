const db = require('.config/db');

async function verificarConexion(){
    try{
        const [rows] = await db.query('SELECT * FROM user');
        console.log(' Se a conectado la base de datos', rows);
    }
    catch(error){
        console.log(' No se conecto la base de datos', error);
    }
}

verificarConexion();