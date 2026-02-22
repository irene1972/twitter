import { ChangeDetectorRef, Component } from '@angular/core';
import { isAdmin, isLogged } from '../../shared/utils/funciones';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink,DatePipe],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  usuarioLogueado: any = {};
  datos: any[] = [];
  isAdmin:boolean=false;

  //añadir paginación
  datosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef,private router: Router) { }

  async ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isAdmin() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }
    this.isAdmin=true;
    this.usuarioLogueado = JSON.parse(usuarioString);

    await fetch(`${environment.apiUrl}/usuarios/listar`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if(data.error){
              this.mensaje=data.error;
              return;
            }
            this.mensaje=data.mensaje;
            this.tipo=true;
            this.datos=data;
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
