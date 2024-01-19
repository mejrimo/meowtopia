import express from 'express';
import {
	authUser,
	getUserProfile,
	logoutUser,
	registerUser,
	updateUserProfile,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.patch('/profile', updateUserProfile);

export default router;
