import express from 'express';
import { addKitty } from '../controllers/kittyController.js';

const router = express.Router();

router.post('/addKitty', addKitty);

export default router;
