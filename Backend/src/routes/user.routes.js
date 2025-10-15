import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register/customer', AuthController.registerCustomer);
router.post('/register/employee', AuthController.registerEmployee);

export default router;
