import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomerModel } from '../models/customer.model.js';
import { EmployeeModel } from '../models/employee.model.js';

dotenv.config();

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'No autenticado. Token no encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const userId = decoded.id;
        const userType = decoded.userType;
        
        let user;

        if (userType === 'customer') {
            user = await CustomerModel.findById(userId);
        }
        else if (userType === 'employee') {
            user = await EmployeeModel.findById(userId);
        }
        if (!user) {
            return res.status(401).json({ message: 'Token válido, pero usuario no encontrado en la base de datos.' });
        }

        req.user = {
            ...user,
            userType: userType,
            role: decoded.role,
        };
        
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};