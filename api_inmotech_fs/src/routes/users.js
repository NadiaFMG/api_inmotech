import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', /*authenticateToken,*/ getAllUsers);
router.get('/:id', /*authenticateToken,*/ getUserById);
router.post('/', createUser);
router.put('/:id', /*authenticateToken,*/ updateUser);
router.delete('/:id', /*authenticateToken,*/ deleteUser);

export default router;