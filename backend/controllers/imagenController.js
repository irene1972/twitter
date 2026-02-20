import { Image } from "../models/Image.js"

//crearImagen
const crearImagen = async (req, res) => {
    if(!req.file){
        return res.status(500).json({ error: 'Solo se permiten imágenes JPG, JPEG, PNG o GIF' });
    }
    
    const { descripcion, usuario_id } = req.body;
    const imagen = req.file.filename;
    
    try {
        const imagen_ = new Image(usuario_id, imagen, descripcion);
        const respuesta = await imagen_.insert();
        if (respuesta) {
            if (respuesta[0].affectedRows === 1) {
                res.json({mensaje:'Imagen guardada correctamente'});
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

export {
    crearImagen
}