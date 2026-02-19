import express from 'express';
import {
    envioEmail,
    getUsers,
    loginUsuario,
    crearUsuario,
    confirmarUsuario
} from '../controllers/usuarioController.js';

const router=express.Router();

router.get('/',envioEmail);
router.get('/listar',getUsers);
//router.get('/confirmar',confirmarUsuario);
router.put('/confirmar',confirmarUsuario);
router.post('/login',loginUsuario);
router.post('/registrar',crearUsuario);

export default router;