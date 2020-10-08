import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();

// login
router.post('/login', AuthController.login);

// Change password
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
