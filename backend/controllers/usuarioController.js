import enviarEmail from '../helpers/email.js';
import { encriptarPassword, matchPassword } from '../helpers/password.js';
import { crearToken, decodificarToken } from '../helpers/token.js';
import { User } from '../models/User.js';

const getUsers = async (req, res) => {
    try {
        const usuario = new User();
        const resultado = await usuario.getAll();
        //const resultado=await pool.query('SELECT * FROM usuarios');
        res.json(resultado[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
    }

}

const getUser = async (req, res) => {
    const email = req.params.email;
    try {
        const usuario = new User();
        const resultado = await usuario.getByEmail(email);
        if (resultado) {
            if (resultado[0].length === 0) {
                return res.status(400).json({ error: 'El usuario no existe' });
            } else {
                res.json(resultado[0][0]);
            }
        }
        else {
            return res.status(500).json({ error: 'Ha habido algún error al consultar la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido algún error al consultar los datos' });
    }
}

const envioEmail = async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email: 'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({ mensaje: `El email se ha enviado correctamente` });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Ha habido un error al enviarse el email' });
    }
}

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Los dos campos son obligatorios' });
    }
    try {
        const usuario = new User();
        const resultado = await usuario.getByEmail(email);
        if (resultado) {
            if (resultado[0].length === 0) {
                return res.status(400).json({ error: 'El usuario no está registrado' });
            }
            const usuarioEncontrado = resultado[0][0];
            const matched = await matchPassword(password, usuarioEncontrado.password);
            if (usuarioEncontrado.confirmado !== 1) {
                return res.status(400).json({ error: 'El usuario no ha confirmado su cuenta' });
            } else {
                if (matched) {
                    res.json({
                        mensaje: 'Usuario logueado correctamente',
                        email,
                        rol: usuarioEncontrado.role,
                        nombre: usuarioEncontrado.name,
                        imagen: usuarioEncontrado.image
                    });
                } else {
                    return res.status(400).json({ error: 'El usuario o password no coinciden' });
                }
            }

        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }

}

const crearUsuario = async (req, res) => {
    const { nombre, email, password, confirmPassword, apellido, nick } = req.body;
    if (!nombre || !email || !password || !confirmPassword || !apellido || !nick) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Los password deben ser iguales' });
    }
    //todo: hashear el password antes de insertarlo
    const hashedPassword = await encriptarPassword(password);
    const token = crearToken(email);
    try {
        const usuario = new User(nombre, email, hashedPassword, token, apellido, nick);
        const resultado = await usuario.insert();
        if (resultado) {
            try {
                //envio del email
                enviarEmail({
                    email,
                    nombre,
                    token
                });

                res.json({
                    mensaje: `El usuario ha sido registrado correctamente`,
                    usuario: email
                });


            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: 'Ha habido un error al enviarse el email' });
            }

        } else {
            return res.status(500).json({ error: 'Ha habido un error al insertarse los datos en la bd' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al insertarse los datos' });
    }
}

const confirmarUsuario = async (req, res) => {

    const { token } = req.body;

    try {
        const datos = await decodificarToken(token, process.env.JWT_SECRET);
        if (datos === 'error') {
            return res.status(400).json({ error: 'Token no válido' });
        }
        const email = datos.user;
        const usuario = new User();
        const resultado = await usuario.updateConfirmado(email);
        if (resultado[0].affectedRows > 0) {
            //res.json(resultado);
            res.json({ mensaje: 'Usuario confirmado correctamente' });
        } else {
            return res.status(500).json({ error: 'Ha habido un error durante la confirmación' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error durante la confirmación' });
    }
}

const updateUsuario = async (req, res) => {
    const { nick, nombre, apellido, email, old_email } = req.body;

    if (!nick || !nombre || !apellido || !email || !old_email) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {

        const usuario = new User();

        const usuarioRecuperado = await usuario.getByEmail(old_email);


        const resultado = await usuario.updateByEmail(nick, nombre, apellido, email, old_email);

        if (resultado) {
            if (resultado[0].affectedRows > 0) {
                res.json({
                    mensaje: 'Actualizado correctamente',
                    email,
                    rol: usuarioRecuperado[0][0].role,
                    nombre,
                    imagen: usuarioRecuperado[0][0].image
                });
            } else {
                return res.status(500).json({ error: 'Ha habido un error durante la actualización de la bd' });
            }
        } else {
            return res.status(500).json({ error: 'Ha habido un error durante la actualización de la bd' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error durante la actualización' });
    }

}

const updateUsuarioConImagen = async (req, res) => {
    const { nick, nombre, apellido, email, old_email } = req.body;
    const imagen = req.file.filename;

    if (!nick || !nombre || !apellido || !email || !old_email) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {

        const usuario = new User();

        const usuarioRecuperado = await usuario.getByEmail(old_email);

        const resultado = await usuario.updateByEmailConImagen(nick, nombre, apellido, email, imagen, old_email);

        if (resultado) {
            if (resultado[0].affectedRows > 0) {
                res.json({
                    mensaje: 'Actualizado correctamente',
                    email,
                    rol: usuarioRecuperado[0][0].role,
                    nombre,
                    imagen
                });
            } else {
                return res.status(500).json({ error: 'Ha habido un error durante la actualización de la bd' });
            }
        } else {
            return res.status(500).json({ error: 'Ha habido un error durante la actualización de la bd' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error durante la actualización' });
    }
}

export {
    envioEmail,
    getUsers,
    getUser,
    loginUsuario,
    crearUsuario,
    confirmarUsuario,
    updateUsuario,
    updateUsuarioConImagen
}