import express from 'express';

const router = express.Router();

router.post('/');
router.post('/auth');
router.post('/logout');
router.get('/profile');
router.patch('/profile');

export default router;
