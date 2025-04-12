import express from 'express';
import {
    getAllModuleRoles,
    getModuleRoleById,
    createModuleRole,
    updateModuleRole,
    deleteModuleRole,
} from '../controllers/moduleRoleController.js';

const router = express.Router();

router.get('/', getAllModuleRoles);
router.get('/:id', getModuleRoleById);
router.post('/', createModuleRole);
router.put('/:id', updateModuleRole);
router.delete('/:id', deleteModuleRole);

export default router;