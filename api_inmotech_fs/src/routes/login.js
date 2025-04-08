// routes.js
import express from 'express';
import { loginApiUser } from '../controllers/authController.js';
//Importa los otros controladores
const router = express.Router();

router.post('/login', loginApiUser);

//Agrega las otras rutas aqui.

export default router;