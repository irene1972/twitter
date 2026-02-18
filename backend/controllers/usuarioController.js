import email from '../helpers/email.js';
import { encriptarPassword } from '../helpers/password.js';
import { User } from '../models/User.js';

const getUsers=async(req,res)=>{
    try {
        const usuario=new User();
        const resultado=await usuario.getAll();
        //const resultado=await pool.query('SELECT * FROM usuarios');
        res.json(resultado[0]);
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al consultar la base de datos'});
    }
    
}

const envioEmail=async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email:'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({mensaje:`El email se ha enviado correctamente`});

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Ha habido un error'});
    }
}

const crearUsuario=async (req, res) => {
    const {nombre,email,password,confirmPassword}=req.body;
    if(!nombre && !email && !password && !confirmPassword){
        return res.status(400).json({error:'Todos los campos son requeridos'});
    }
    if(password !== confirmPassword){
        return res.status(400).json({error:'Los password deben ser iguales'});
    }
    //todo: hashear el password antes de insertarlo
    const hashedPassword=await encriptarPassword(password);
    console.log('hashedPassword:',hashedPassword);
    try {
        const usuario=new User(nombre,email,hashedPassword);
        const resultado=await usuario.insert();
        if(resultado){
            res.json({
                mensaje:`El usuario ha sido registrado correctamente`,
                usuario: email
            });
        }else{
            return res.status(500).json({error:'Ha habido un error al insertarse los datos en la bd'});
        }
    } catch (error) {
        return res.status(500).json({error:'Ha habido un error al insertarse los datos'});
    }
}

export {
    envioEmail,
    getUsers,
    crearUsuario
}