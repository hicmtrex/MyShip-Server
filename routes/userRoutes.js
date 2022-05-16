import express from 'express';
import {
  deleteUser,
  getClientList,
  updateUserProfile,
  userLogin,
  userRegister,
} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/profile').put(auth, updateUserProfile);
router.route('/clients').get(auth, getClientList);
router.route('/:id').delete(deleteUser);

export default router;
