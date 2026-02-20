import express from 'express';
import {
    getImagenes,
    crearImagen,
} from '../controllers/imagenController.js';
import upload2 from '../helpers/upload2.js';

const router=express.Router();

router.get('/listar', getImagenes);
router.post('/crear',upload2.single('imagen'),crearImagen);

export default router;