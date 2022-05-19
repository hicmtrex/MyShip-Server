import express from 'express';
import {
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
router.route('/agent').post(auth, admin, createAgent);
router.route('/:id').delete(deleteUser);

export default router;
