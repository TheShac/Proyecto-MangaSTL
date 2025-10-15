import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomerModel } from '../models/customer.model.js';
import { EmployeeModel } from '../models/employee.model.js';

dotenv.config();

export const AuthController = {

  // LOGIN DE USUARIOS
  login: async (req, res) => {
    const { identifier, password } = req.body;

    try {
      let user = await CustomerModel.findByEmailOrUsername(identifier);
      let userType = 'customer';

      if (!user) {
        user = await EmployeeModel.findByEmailOrUsername(identifier);
        userType = 'employee';
      }

      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

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

  // REGISTRO DE USUARIOS CUSTOMER
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

  // REGISTRO DE USUARIOS EMPLOYEE
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
