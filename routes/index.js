import express from 'express';
const router = express.Router();
import UserRouter from './user.route.js';
import ProfileRouter from './profile.route.js';
import AuthRouter from './auth.route.js';
import { authMdw } from '../middlewares/auth.mdw.js';

router.use('/user', authMdw, UserRouter);

router.use('/profile', authMdw, ProfileRouter);

router.use('/auth', AuthRouter);

export default router;
