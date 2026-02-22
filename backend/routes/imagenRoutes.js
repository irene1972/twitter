import express from 'express';
import {
    getImagenes,
    getImagenesPorUsuario,
    getImagenById,
    crearImagen,
    editarImagen,
    eliminarImagen
} from '../controllers/imagenController.js';
import upload2 from '../helpers/upload2.js';

const router=express.Router();

router.get('/listar', getImagenes);
router.get('/listar-por-usuario/:user_id', getImagenesPorUsuario);
router.get('/detalle/:id', getImagenById);
router.post('/crear',upload2.single('imagen'),crearImagen);
router.put('/actualizar/:id',upload2.single('imagen'),editarImagen);
router.delete('/eliminar/:id/:image_path',eliminarImagen);

export default router;