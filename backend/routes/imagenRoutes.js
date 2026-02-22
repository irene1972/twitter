import express from 'express';
import {
    getImagenes,
    getImagenesPorUsuario,
    getImagenById,
    crearImagen,
} from '../controllers/imagenController.js';
import upload2 from '../helpers/upload2.js';

const router=express.Router();

router.get('/listar', getImagenes);
router.get('/listar-por-usuario/:user_id', getImagenesPorUsuario);
router.get('/detalle/:id', getImagenById);
router.post('/crear',upload2.single('imagen'),crearImagen);

export default router;