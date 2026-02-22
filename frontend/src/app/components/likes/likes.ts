import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-likes',
  imports: [DatePipe,RouterLink],
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
  numComentarios: any[] = [];
  count:any[]=[];
  likes:any[]=[];

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
        console.log(data);

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

  haceMatchLaImagen(id: number): number {
    const encontrado = this.likes.find((elem: any) => elem.image_id === id);
    if (encontrado) {
      return encontrado.id;
    } else {
      return 0;
    }
  }

  like(event: Event, image_id: number) {
    const imagen = event.target as HTMLImageElement;
    const like_id = parseInt(imagen.id);
    if (like_id === 0) {
      const datos: any = {};
      datos.image_id = image_id;
      datos.user_id = this.usuarioLogueado.id;
      //crear el like en la base de datos
      fetch(`${environment.apiUrl}/likes/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(datos)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          this.mensaje = data.mensaje;
          this.tipo = true;

          location.reload();

        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
    }

  }

  dislike(event: Event) {
    const imagen = event.target as HTMLImageElement;
    const like_id = parseInt(imagen.id);
    if (like_id > 0) {
      //eliminar el like de la base de datos
      fetch(`${environment.apiUrl}/likes/eliminar/${like_id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          this.mensaje = data.mensaje;
          this.tipo = true;

          location.reload();
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
    }
  }

  obtenerCount(id: number): number {
    const encontrado = this.count.find((elem: any) => elem.image_id === id);
    if (encontrado) {
      return encontrado.count;
    } else {
      return 0;
    }
  }

  encontrarCantidad(id: number): number {
    const encontrado = this.numComentarios.find((e: any) => e.image_id === id);
    if (encontrado) {
      return encontrado.cantidad;
    } else {
      return 0;
    }

  }

  numComentariosPorImagen() {
    fetch(`${environment.apiUrl}/comentarios/num-comentarios`)
      .then(response => response.json())
      .then(data => {
        this.numComentarios = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
