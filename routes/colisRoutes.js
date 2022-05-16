import express from 'express';
import {
  createInternationalCoil,
  getUserInternationalCoil,
  createNationalCoil,
  getNationalCoilById,
  getInternationalCoilById,
  payColiNational,
} from '../controllers/colisController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.route('/international').post(auth, createInternationalCoil);
router.route('/international/:id').get(auth, getInternationalCoilById);
router.route('/national').post(auth, createNationalCoil);
router.route('/national/:id').get(auth, getNationalCoilById);
router.route('/myinternational-colis').get(auth, getUserInternationalCoil);

//pay
router.route('/national-pay/:id').put(auth, payColiNational);

export default router;
