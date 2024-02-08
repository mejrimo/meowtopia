import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
	authUser,
	changeFavorites,
	deleteUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);
router.get('/profile', protect, getUserProfile);
router.patch('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUser);
router.post('/profile/favorites/:kittyId', protect, changeFavorites);

export default router;
