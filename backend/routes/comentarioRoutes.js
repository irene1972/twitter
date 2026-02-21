import express from 'express';
import {
    crearComentario,
    getComentariosPorImagenes
} from '../controllers/comentarioController.js';

const router=express.Router();

router.get('/num-comentarios', getComentariosPorImagenes);
router.post('/crear',crearComentario);

export default router;