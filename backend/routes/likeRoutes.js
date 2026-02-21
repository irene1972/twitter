import express from 'express';
import {
    obtenerLikesPorUsuario,
    contarLikesPorImagen,
    crearLike,
    eliminarLike
} from '../controllers/likeController.js';

const router=express.Router();

router.get('/obtener/:user_id',obtenerLikesPorUsuario);
router.get('/contar-likes',contarLikesPorImagen);
router.post('/crear',crearLike);
router.delete('/eliminar/:id',eliminarLike);

export default router;