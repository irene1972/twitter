import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isLogged } from '../../shared/utils/funciones';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  usuario:any={};
  urlImgs: string = environment.imagesUrl;
  img:string='';

  constructor(private router: Router){}

  ngOnInit(){
    
    const usuarioString=localStorage.getItem('usuarioTwitter');
    if(isLogged() && usuarioString){
      this.usuario=JSON.parse(usuarioString);
      //console.log(this.usuario);
      this.img=this.usuario.imagen;
    }
    
  }

  cerrarSesion(){
    localStorage.removeItem('usuarioTwitter');
    //this.authService.logout();
    this.router.navigate(['/login']);
  }
}
