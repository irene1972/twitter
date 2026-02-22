import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { RegistroExitoso } from './components/registro-exitoso/registro-exitoso';
import { Confirmar } from './components/confirmar/confirmar';
import { Configuracion } from './components/configuracion/configuracion';
import { SubirImagen } from './components/subir-imagen/subir-imagen';
import { Detalle } from './components/home/detalle/detalle';
import { Likes } from './components/likes/likes';
import { MiPerfil } from './components/mi-perfil/mi-perfil';
import { Editar } from './components/home/editar/editar';
import { Usuarios } from './components/usuarios/usuarios';

export const routes: Routes = [
    //GENERALES
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},

    //USUARIO
    {path:'login',component:Login},
    {path:'registro',component:Registro},
    {path:'registro-exitoso',component:RegistroExitoso},
    {path:'usuarios',component:Usuarios},
    {path:'usuarios/:busqueda',component:Usuarios},
    {path:'configuracion',component:Configuracion},
    {path:'confirmar/:token',component:Confirmar},
    {path:'mi-perfil/:id',component:MiPerfil},

    //IMAGEN
    {path:'detalle/:id',component:Detalle},
    {path:'editar/:id',component:Editar},
    {path:'subir-imagen',component:SubirImagen},

    //LIKES
    {path:'likes',component:Likes},    
    
    //OTROS
    {path:'**',component:C404}
];
