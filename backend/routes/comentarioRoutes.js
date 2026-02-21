import express from 'express';
import {
    getComentarios,
    crearComentario,
    getComentariosPorImagenes,
    eliminarComentario
} from '../controllers/comentarioController.js';

const router=express.Router();

router.get('/listar/:image_id', getComentarios);
router.get('/num-comentarios', getComentariosPorImagenes);
router.post('/crear',crearComentario);
router.delete('/eliminar/:id',eliminarComentario);

export default router;