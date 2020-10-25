import { Router } from 'express';
import userController from '../controllers/userController';
import {
	registerValidation,
	loginValidation,
} from '../validators/userValidator';
import { requireAuth } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/register', (req, res) => res.json({ msg: 'Register' }));
router.route('/register').post(registerValidation, userController.registerUser);
router.route('/login').post(loginValidation, userController.loginUser);
// @ts-ignore
router.get('/login', requireAuth, userController.checkUser);

export default router;
