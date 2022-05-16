import express from 'express';
import { createOrder } from '../controllers/stripeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.route('/').post(auth,createOrder);

export default router;
