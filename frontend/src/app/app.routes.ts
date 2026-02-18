import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Contacto } from './components/contacto/contacto';
import { C404 } from './components/c404/c404';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'contacto',component:Contacto},
    {path:'login',component:Login},
    {path:'registro',component:Registro},
    {path:'**',component:C404}
];
