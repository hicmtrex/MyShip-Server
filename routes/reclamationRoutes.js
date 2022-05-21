import express from 'express';
import {
  createReclamation,
  deleteReclamation,
  getReclamationList,
  getUserReclamationList,
} from '../controllers/reclamationController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();
router.route('/').get(auth, getReclamationList);
router.route('/').post(auth, createReclamation);
router.route('/myreclamation').get(auth, getUserReclamationList);
router.route('/:id').delete(auth, deleteReclamation);

export default router;
