import express from 'express';
import {
  getAllImagenesInmueble,
  getImagenesInmuebleById,
  createImagenesInmueble,
  updateImagenesInmueble,
  deleteImagenesInmueble,
} from '../controllers/imagenesInmuebleController.js'; 
const router = express.Router();


router.get('/', getAllImagenesInmueble);
router.get('/:id', getImagenesInmuebleById);
router.post('/', createImagenesInmueble);
router.put('/:id', updateImagenesInmueble);
router.delete('/:id', deleteImagenesInmueble);

export default router;
