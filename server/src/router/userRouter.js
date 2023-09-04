import { Router } from 'express';

import { signIn, signUp } from '../controllers/userController.js';

const router = Router();

// Signin
router.post('/signin', signIn);

// Signup
router.post('/signup', signUp);

export { router as userRoutes };
