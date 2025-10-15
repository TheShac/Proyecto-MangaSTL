import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { protect } from '../Middlewares/authMiddleware.js';


const router = Router();

router.post('/login', AuthController.login);
router.post('/register/customer', AuthController.registerCustomer);

router.post('/register/employee', protect, AuthController.registerEmployee);
router.post('/setup-admin', protect, AuthController.setupInitialAdmin);

export default router;
