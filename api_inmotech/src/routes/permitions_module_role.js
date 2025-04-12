import express from 'express';
import {
    getAllPermitionsModuleRoles,
    getPermitionsModuleRoleById,
    createPermitionsModuleRole,
    updatePermitionsModuleRole,
    deletePermitionsModuleRole
} from '../controllers/permitionsModuleRoleController.js';

const router = express.Router();

router.get('/', getAllPermitionsModuleRoles);
router.get('/:id', getPermitionsModuleRoleById);
router.post('/', createPermitionsModuleRole);
router.put('/:id', updatePermitionsModuleRole);
router.delete('/:id', deletePermitionsModuleRole);

export default router;