import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private router: Router){}

  cerrarSesion(){
    localStorage.removeItem('usuarioTwitter');
    this.router.navigate(['/login']);
  }
}
