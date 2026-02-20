import { Comment } from "../models/Comment.js";

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

export {
    getComentariosPorImagenes
}