import express from 'express';
import {
    envioEmail,
    getUsers,
    getUser,
    loginUsuario,
    crearUsuario,
    confirmarUsuario,
    updateUsuario
} from '../controllers/usuarioController.js';

const router=express.Router();

router.get('/',envioEmail);
router.get('/listar',getUsers);
router.get('/obtener/:email',getUser);
router.put('/confirmar',confirmarUsuario);
router.put('/actualizar',updateUsuario);
router.post('/login',loginUsuario);
router.post('/registrar',crearUsuario);

export default router;