import express from 'express';
import {
    envioEmail,
    getUsers,
    loginUsuario,
    crearUsuario
} from '../controllers/usuarioController.js';

const router=express.Router();

router.get('/',envioEmail);
router.get('/listar',getUsers);
router.post('/login',loginUsuario);
router.post('/registrar',crearUsuario);

export default router;