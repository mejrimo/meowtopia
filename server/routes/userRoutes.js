import express from 'express';
import {
	authUser,
	deleteUser,
	getUserProfile,
	logoutUser,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.patch('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUser);

export default router;
