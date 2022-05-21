import express from 'express';
import {
  createInternationalCoil,
  createNationalCoil,
  getNationalCoilById,
  getInternationalCoilById,
  payColiNational,
  getInternationalCoilList,
  getNationalCoilList,
  getAgentColiList,
  agentColiPay,
  getAllUserCoils,
  deleteUserColi,
} from '../controllers/colisController.js';
import { acteur, auth } from '../middleware/auth.js';

const router = express.Router();
router
  .route('/international')
  .post(auth, createInternationalCoil)
  .get(getInternationalCoilList);
router.route('/international/:id').get(auth, getInternationalCoilById);
router
  .route('/national')
  .post(auth, createNationalCoil)
  .get(auth, getNationalCoilList);

router.route('/userscolis-list').get(auth, getAllUserCoils);

router.route('/agent-list').get(auth, acteur, getAgentColiList);

//pay
router.route('/national-pay/:id').put(auth, payColiNational);
router.route('/agent-pay/:id').post(auth, acteur, agentColiPay);
router.route('/national/:id').get(auth, getNationalCoilById);
router.route('/:id').delete(auth, deleteUserColi);

export default router;
