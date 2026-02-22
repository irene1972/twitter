import { ChangeDetectorRef, Component } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../card/card';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  imports: [DatePipe, Card],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil {
  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  usuarioLogueado: any = {};
  usuario: any = {};
  datos: any[] = [];

  //añadir paginación
  datosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioLogueado = JSON.parse(usuarioString);

    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('irene2:',id);

      fetch(`${environment.apiUrl}/usuarios/obtener-por-id/${id}`)
      .then(response => response.json())
      .then(data => {
        this.usuario = data;
        console.log('irene3:',this.usuario);
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

    fetch(`${environment.apiUrl}/imagenes/listar-por-usuario/${id}`)
      .then(response => response.json())
      .then(data => {
        this.datos = data;

        //añadir paginación
          this.totalPaginas = Math.ceil(this.datos.length / this.itemsPorPagina);
          this.actualizarPaginacion();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
    });

    
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.datosPaginados = this.datos.slice(inicio, fin);
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
