// routes.js
import express from 'express';
import { login } from '../controllers/authController.js';
//Importa los otros controladores
const router = express.Router();

router.post('/login', login);

//Agrega las otras rutas aqui.

export default router;