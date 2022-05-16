import express from 'express';
import {
  createInternationalLettre,
  createNationalLettre,
  getInternationalLettreById,
  getNationalLettreById,
  getUserInternationalLettre,
} from '../controllers/lettresController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();
router.route('/international').post(auth, createInternationalLettre);
router.route('/international/:id').get(auth, getInternationalLettreById);
router.route('/national').post(auth, createNationalLettre);
router.route('/national/:id').get(auth, getNationalLettreById);
router.route('/myinternational-lettres').get(auth, getUserInternationalLettre);

export default router;
