import express from 'express';
import {
  getAllApiUsers,
  getApiUserById,
  createApiUser,
  updateApiUser,
  deleteApiUser,
} from '../controllers/apiUsersController.js';

const router = express.Router();

router.get('/', getAllApiUsers);
router.get('/:id', getApiUserById);
router.post('/', createApiUser);
router.put('/:id', updateApiUser);
router.delete('/:id', deleteApiUser);

export default router;