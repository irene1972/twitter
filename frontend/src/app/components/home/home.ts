import { Component } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router: Router){}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) this.router.navigate(['/login']);
  }
}
