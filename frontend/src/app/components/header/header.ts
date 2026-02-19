import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isLogged } from '../../shared/utils/funciones';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  usuario:any={};
  constructor(private router: Router){}

  ngOnInit(){
    const usuarioString=localStorage.getItem('usuarioTwitter');
    if(isLogged() && usuarioString) this.usuario=JSON.parse(usuarioString);
    
  }

  cerrarSesion(){
    localStorage.removeItem('usuarioTwitter');
    this.router.navigate(['/login']);
  }
}
