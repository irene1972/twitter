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

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'detalle/:id',component:Detalle},
    {path:'likes',component:Likes},
    {path:'mi-perfil',component:MiPerfil},
    {path:'subir-imagen',component:SubirImagen},
    {path:'configuracion',component:Configuracion},
    {path:'login',component:Login},
    {path:'registro',component:Registro},
    {path:'registro-exitoso',component:RegistroExitoso},
    {path:'confirmar/:token',component:Confirmar},
    {path:'**',component:C404}
];
