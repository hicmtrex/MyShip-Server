import express from 'express';
import {
  adminUpdateUser,
  agentList,
  createAgent,
  deleteUser,
  getClientList,
  updateUserProfile,
  userLogin,
  userRegister,
} from '../controllers/userController.js';
import { admin, auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/profile').put(auth, updateUserProfile);
router.route('/clients').get(auth, getClientList);
router
  .route('/agent')
  .post(auth, admin, createAgent)
  .get(auth, admin, agentList);
router
  .route('/:id')
  .delete(auth, admin, deleteUser)
  .put(auth, admin, adminUpdateUser);

export default router;
