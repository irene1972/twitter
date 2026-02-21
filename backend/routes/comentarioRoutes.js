import express from 'express';
import {
    getComentarios,
    crearComentario,
    getComentariosPorImagenes
} from '../controllers/comentarioController.js';

const router=express.Router();

router.get('/listar/:image_id', getComentarios);
router.get('/num-comentarios', getComentariosPorImagenes);
router.post('/crear',crearComentario);

export default router;