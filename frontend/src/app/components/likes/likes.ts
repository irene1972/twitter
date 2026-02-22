import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Card } from '../card/card';

@Component({
  selector: 'app-likes',
  imports: [Card],
  templateUrl: './likes.html',
  styleUrl: './likes.css',
})
export class Likes {
  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  urlImagenes: string = environment.imagesUrl2;
  datos: any[] = [];
  usuarioLogueado: any = {};

  //añadir paginación
  datosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef, private router: Router) { }

  async ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioLogueado = JSON.parse(usuarioString);

    await fetch(`${environment.apiUrl}/likes/obtener/${this.usuarioLogueado.id}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);

        if (data.length === 0) {
          this.mensaje = 'No hay datos';
          this.tipo = true;
        } else {
          this.datos = data;

          //añadir paginación
          this.totalPaginas = Math.ceil(this.datos.length / this.itemsPorPagina);
          this.actualizarPaginacion();
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.datosPaginados = this.datos.slice(inicio, fin);
    //console.log(this.datosPaginados);
    
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

}
