import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomerModel } from '../models/customer.model.js';
import { EmployeeModel } from '../models/employee.model.js';

dotenv.config();

export const AuthController = {
  login: async (req, res) => {
    const { identifier, password } = req.body; // puede ser email o username

    try {
      // Buscar en ambas tablas
      let user = await CustomerModel.findByEmailOrUsername(identifier);
      let userType = 'customer';

      if (!user) {
        user = await EmployeeModel.findByEmailOrUsername(identifier);
        userType = 'employee';
      }

      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Generar token JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: userType === 'employee' ? user.role_name : 'client',
          userType,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      );

      res.json({ message: 'Login exitoso', token, userType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  registerCustomer: async (req, res) => {
    try {
      const { username, email, password, nombre, apellido } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await CustomerModel.create({ username, email, password: hashedPassword, nombre, apellido });
      res.json({ message: 'Cliente registrado correctamente', id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  registerEmployee: async (req, res) => {
    try {
      const { username, email, password, id_role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = await EmployeeModel.create({ username, email, password: hashedPassword, id_role });
      res.json({ message: 'Empleado registrado correctamente', id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
};
