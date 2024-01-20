import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import idChecker from '../middleware/idChecker.js';
import {
	authUser,
	changeFavorites,
	deleteUser,
	getAllFavorites,
	getUserProfile,
	logoutUser,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.patch('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUser);
router.delete('/profile/favorites', protect, getAllFavorites);
router.delete(
	'/profile/favorites/:kittyId',
	protect,
	idChecker,
	changeFavorites
);

export default router;
