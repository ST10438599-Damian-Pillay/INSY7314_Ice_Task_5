import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  getAllUsers, 
  deleteUser,
  promoteUser,
  demoteUser
} from '../controllers/usercontroller.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticate, getProfile);
router.put('/me', authenticate, updateProfile);
router.get('/', authenticate, isAdmin, getAllUsers);
router.delete('/:userId', authenticate, isAdmin, deleteUser);
router.put('/:userId/promote', authenticate, isAdmin, promoteUser);
router.put('/:userId/demote', authenticate, isAdmin, demoteUser);

export default router;