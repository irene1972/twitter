import express from 'express';
import {
    envioEmail,
    getUsers,
    getUser,
    getUserById,
    loginUsuario,
    crearUsuario,
    confirmarUsuario,
    updateUsuario,
    updateUsuarioConImagen
} from '../controllers/usuarioController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

router.get('/',envioEmail);
router.get('/listar',getUsers);
router.get('/obtener/:email',getUser);
router.get('/obtener-por-id/:id',getUserById);
router.put('/confirmar',confirmarUsuario);
router.put('/actualizar',updateUsuario);
router.put('/actualizar-con-imagen',upload.single('imagen'),updateUsuarioConImagen);
router.post('/login',loginUsuario);
router.post('/registrar',crearUsuario);

export default router;