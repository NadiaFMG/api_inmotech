import express from 'express';
import {
    getAllPermitions,
    getPermitionById,
    createPermition,
    updatePermition,
    deletePermition
} from '../controllers/permitionsController.js';

const router = express.Router();

router.get('/', getAllPermitions);
router.get('/:id', getPermitionById);
router.post('/', createPermition);
router.put('/:id', updatePermition);
router.delete('/:id', deletePermition);

export default router;