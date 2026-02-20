import express from 'express';
import {
    getComentariosPorImagenes
} from '../controllers/comentarioController.js';

const router=express.Router();

router.get('/num-comentarios', getComentariosPorImagenes);

export default router;