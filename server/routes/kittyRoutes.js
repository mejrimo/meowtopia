import express from 'express';
import idChecker from '../middleware/idChecker.js';
import {
	addKitty,
	deleteKitty,
	getAllKitties,
	getKitty,
	updateKitty,
} from '../controllers/kittyController.js';

const router = express.Router();

router.post('/addKitty', addKitty);
router.get('/', getAllKitties);
router.get('/:id', idChecker, getKitty);
router.patch('/:id', idChecker, updateKitty);
router.delete('/:id', idChecker, deleteKitty);

export default router;
