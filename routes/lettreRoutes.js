import express from 'express';
import {
  createInternationalLettre,
  createNationalLettre,
  deleteUserCourrier,
  getAgentCourreirList,
  getAllInternationalCourrier,
  getAllNationalCourrier,
  getInternationalLettreById,
  getNationalLettreById,
  getUserCourriers,
} from '../controllers/lettresController.js';

import { acteur, auth } from '../middleware/auth.js';

const router = express.Router();
router
  .route('/international')
  .post(auth, createInternationalLettre)
  .get(auth, getAllInternationalCourrier);
router.route('/international/:id').get(auth, getInternationalLettreById);
router
  .route('/national')
  .post(auth, createNationalLettre)
  .get(auth, getAllNationalCourrier);
router.route('/usercourriers-list').get(auth, getUserCourriers);
router.route('/national/:id').get(auth, getNationalLettreById);

router.route('/agent-list').get(auth, acteur, getAgentCourreirList);
router.route('/:id').delete(auth, deleteUserCourrier);

export default router;
