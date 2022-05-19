import express from 'express';
import {
  createInternationalRp,
  createNationalRp,
  getInternationalRpById,
  getInternationalRpList,
  getNationalRpById,
  getNationalRpList,
} from '../controllers/rapidPostcontroller.js';
import { admin, auth } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/national')
  .post(auth, createNationalRp)
  .get(auth, getNationalRpList);
router.route('/national/:id').get(getNationalRpById);
router
  .route('/international')
  .post(auth, createInternationalRp)
  .get(auth, getInternationalRpList);
router.route('/international/:id').get(getInternationalRpById);

export default router;
