import express from 'express';
import {
    crearImagen,
} from '../controllers/imagenController.js';
import upload2 from '../helpers/upload2.js';

const router=express.Router();

router.post('/crear',upload2.single('imagen'),crearImagen);

export default router;