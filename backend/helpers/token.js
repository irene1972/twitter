import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';

const crearToken=function(user){
    let token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '48h' });
    return token;
}

const decodificarToken=async function(token,secret){

    const usuario=new User();
    const response=await usuario.getByToken(token);
    
    if(response[0][0]===undefined){
        return "error";
    }
    
    const decode= jwt.verify(token,secret);
    return decode;
    
    
}

export {
    crearToken,
    decodificarToken
};