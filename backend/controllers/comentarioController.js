import { Comment } from "../models/Comment.js";

const getComentarios = async (req, res) => {
    const image_id=req.params.image_id;

    try {
        const comentario = new Comment();
        const resultado = await comentario.getAll(image_id);
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const getComentariosPorImagenes = async (req, res) => {
    try {
        const comentario = new Comment();
        const resultado = await comentario.getCommentsByImg();
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const crearComentario = async (req, res) => {
    const { content, image_id, user_id } = req.body;
    if (!content || !image_id || !user_id) {
        return res.status(400).json({ error: 'El comentario es obligatorio' });
    }
    try {
        const comentario = new Comment(user_id, image_id, content);
        const resultado = await comentario.insertComment();
        if (resultado) {
            if (resultado[0].affectedRows === 1) {
                res.json({ mensaje: 'Comentario guardado correctamente' });
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

const eliminarComentario = async (req, res) => {
    const id=req.params.id;
    try {
        const comentario = new Comment();
        const resultado = await comentario.deleteComment(id);
        if (resultado) {
            res.json({mensaje:'El comentario se ha eliminado correctamente'});
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al eliminar los datos' });
    }
}

export {
    getComentarios,
    getComentariosPorImagenes,
    crearComentario,
    eliminarComentario
}