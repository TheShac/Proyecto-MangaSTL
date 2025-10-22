import jwt from 'jsonwebtoken';
import { EmployeeModel } from '../models/employee.model.js';
import { CustomerModel } from '../models/customer.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar el usuario según su tipo
      let user;
      if (decoded.userType === 'employee') {
        user = await EmployeeModel.findById(decoded.id);
      } else {
        user = await CustomerModel.findById(decoded.id);
      }

      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado o inactivo.' });
      }

      req.user = {
        id: decoded.id,
        role: decoded.role,
        userType: decoded.userType,
        username: decoded.username,
        ...user,
      };

      next();
    } catch (error) {
      console.error('Error de autenticación:', error);
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No se proporcionó token de autenticación' });
  }
};
