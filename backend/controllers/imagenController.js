import { Image } from "../models/Image.js";
import fs from 'fs';

const getImagenes = async (req, res) => {
    try {
        const imagen = new Image();
        const resultado = await imagen.getAll();
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const getImagenesPorUsuario = async (req, res) => {

    const user_id = req.params.user_id;

    try {
        const imagen = new Image();
        const resultado = await imagen.getAllByUser(user_id);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const getImagenById = async (req, res) => {
    const id = req.params.id;
    try {
        const imagen = new Image();
        const resultado = await imagen.getById(id);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
}

const crearImagen = async (req, res) => {
    if (!req.file) {
        return res.status(500).json({ error: 'Solo se permiten imágenes JPG, JPEG, PNG, GIF o WEBP' });
    }

    const { descripcion, usuario_id } = req.body;
    const imagen = req.file.filename;

    try {
        const imagen_ = new Image(usuario_id, imagen, descripcion);
        const respuesta = await imagen_.insert();
        if (respuesta) {
            if (respuesta[0].affectedRows === 1) {
                res.json({ mensaje: 'Imagen guardada correctamente' });
            } else {
                return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
            }

        } else {
            return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al insertar los datos' });
    }

}

const eliminarImagen = async (req, res) => {
    const id = req.params.id;
    const image_path=req.params.image_path;

    try {
        
        const imagen_ = new Image();
        const respuestaComentarios = await imagen_.eliminarComentarios(id);
        const respuestaLikes = await imagen_.eliminarLikes(id);
        const respuestaImagenes = await imagen_.eliminarImagenes(id);

        //borrar los archivos
        console.log(image_path);
        fs.unlink(`public/imagenes/${image_path}`, (err) => {
            if (err) {
                console.error('Error al borrar:', err);
                return;
            }
            console.log('Archivo borrado exitosamente');
        });

        if (respuestaComentarios && respuestaLikes && respuestaImagenes) {
            res.json({ mensaje: 'Imagen eliminada correctamente' });
        } else {
            return res.status(500).json({ error: 'Ha habido un error al eliminar los datos de la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al eliminar los datos' });
    }
}

const editarImagen=async(req,res)=>{
 
    if (!req.file) {
        return res.status(500).json({ error: 'Solo se permiten imágenes JPG, JPEG, PNG, GIF o WEBP' });
    }

    const { descripcion, usuario_id } = req.body;
    const id=req.params.id;
    const imagen = req.file.filename;

    try {
    
        const imagen_ = new Image(usuario_id, imagen, descripcion);
        const respuesta = await imagen_.update(id);
        if (respuesta) {
            console.log(respuesta);
            if (respuesta[0].affectedRows === 1) {
                res.json({ mensaje: 'Imagen actualizada correctamente' });
            } else {
                return res.status(500).json({ error: 'Ha habido un error al actualizar los datos en la bd' });
            }

        } else {
            return res.status(500).json({ error: 'Ha habido un error al actualizar los datos en la bd' });
        }
            
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al actualizar los datos' });
    }
}

export {
    getImagenes,
    getImagenesPorUsuario,
    getImagenById,
    crearImagen,
    editarImagen,
    eliminarImagen
}