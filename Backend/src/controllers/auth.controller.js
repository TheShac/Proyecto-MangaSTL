import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { gerUsuarioByEmailOrUsername } from "../models/usuarioSTL";

export const login = async (req, res) => {

    const { identificador, password } = req.body;

    try{
        const user = await gerUsuarioByEmailOrUsername(identificador);

        if(!user || !user.stl_password && !user.password) return res.status(401).json({ message: 'Usuario no encontrado o sin contraseña'});
        
        let hashedPassword;
        let role;

        if(user.stl_password){
            hashedPassword = user.stl_password;
            role = 'cliente_registrado';
        }
        else if(user.password){
            hashedPassword = user.password;
            role = user.role;
        }
        else{
            return res.status(401).json({ message: 'Usuario anonimo'});
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);
        if(!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta'});

        const token = jwt.sign({ uuid: user.uuid_user, role }, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token, role });
    }
    catch(err){
        res.status(500).json({ error: err.message });  
    }
};