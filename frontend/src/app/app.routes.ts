import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { RegistroExitoso } from './components/registro-exitoso/registro-exitoso';
import { Confirmar } from './components/confirmar/confirmar';
import { Configuracion } from './components/configuracion/configuracion';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'configuracion',component:Configuracion},
    {path:'login',component:Login},
    {path:'registro',component:Registro},
    {path:'registro-exitoso',component:RegistroExitoso},
    {path:'confirmar/:token',component:Confirmar},
    {path:'**',component:C404}
];
