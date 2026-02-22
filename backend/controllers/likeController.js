import { Like } from "../models/Like.js";

const obtenerLikesPorUsuario = async (req, res) => {
    
    const user_id=req.params.user_id;
    
    if (!user_id) {
        return res.status(400).json({ error: 'El campo es obligatorio' });
    }

    //try {
        const like = new Like(user_id);
        const resultado = await like.getByUser();
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    //} catch (error) {
       // return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    //}

}

const contarLikesPorImagen = async (req, res) => {

    try {
        const like = new Like();
        const resultado = await like.countLikesByImage();
        if (resultado) {
            res.json(resultado[0]);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const crearLike = async (req, res) => {
    
    const { image_id, user_id } = req.body;
    console.log(image_id);
    console.log(user_id);
    
    if (!image_id || !user_id) {
        return res.status(400).json({ error: 'Los campos son obligatorios' });
    }
    //try {
        const like = new Like(user_id, image_id);
        const resultado = await like.insert();
        if (resultado) {
            if (resultado[0].affectedRows === 1) {
                res.json({ mensaje: 'Like guardado correctamente' });
            } else {
                return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
            }
        } else {
            return res.status(500).json({ error: 'Ha habido un error al insertar los datos en la bd' });
        }
    //} catch (error) {
        //return res.status(500).json({ error: 'Ha habido un error al insertar los datos' });
    //}
        
}

const eliminarLike = async (req, res) => {
    const id=req.params.id;
    try {
        const like = new Like();
        const resultado = await like.delete(id);
        if (resultado) {
            res.json({mensaje:'El like se ha eliminado correctamente'});
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al eliminar los datos' });
    }
}

export {
    obtenerLikesPorUsuario,
    contarLikesPorImagen,
    crearLike,
    eliminarLike
}