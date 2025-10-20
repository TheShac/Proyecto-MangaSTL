import { Router } from 'express';
import { Login, registerCustomer, registerEmployee, editProfile, getProfile } from '../controllers/authController.js';
import { protect } from '../Middlewares/authMiddleware.js';


const router = Router();

router.post('/login', Login);
router.post('/register/customer', registerCustomer);

router.route('/profile').get(protect, getProfile);

router.post('/register/employee', protect, registerEmployee);
//router.post('/setup-admin', protect, setupInitialAdmin);

export default router;
