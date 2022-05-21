import express from 'express';
import {
  createInternationalRp,
  createNationalRp,
  deleteUserRp,
  getInternationalRpById,
  getInternationalRpList,
  getNationalRpById,
  getNationalRpList,
  getUserRapidpost,
  payRapidePost,
} from '../controllers/rapidPostcontroller.js';
import { auth } from '../middleware/auth.js';

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
router.route('/userrapidposts-list').get(auth, getUserRapidpost);
router.route('/international/:id').get(getInternationalRpById);
router.route('/stripe-pay/:id').put(auth, payRapidePost);
router.route('/:id').delete(auth, deleteUserRp);

export default router;
