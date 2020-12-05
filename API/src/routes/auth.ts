import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();

// login
router.post('/login', AuthController.login);

// Forgot Password
router.put('/forgot-password', AuthController.forgotPassword);

// Create new Password
router.put('/new-passowrd', AuthController.createNewPassowrd);

// Create new Password
router.post('/refresh-token', AuthController.refreshToken);

// Change password
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
