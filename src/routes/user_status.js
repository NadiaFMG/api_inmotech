import express from 'express';
import {
    getAllUserStatus,
    getUserStatusById,
    createUserStatus,
    updateUserStatus,
    deleteUserStatus,
} from '../controllers/userStatusController.js';

const router = express.Router();

router.get('/', getAllUserStatus);
router.get('/:id', getUserStatusById);
router.post('/', createUserStatus);
router.put('/:id', updateUserStatus);
router.delete('/:id', deleteUserStatus);

export default router;