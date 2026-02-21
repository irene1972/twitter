import { ChangeDetectorRef, Component } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  urlImagenes: string = environment.imagesUrl2;
  usuarioLogueado:any={};
  numComentarios: any[] = [];
  datos: any[] = [];
  count:any[]=[];
  likes:any[]=[];

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

    this.usuarioLogueado=JSON.parse(usuarioString);

    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log(code);
      if (code == 1) {
        this.mensaje = 'La imagen se ha guardado correctamente';
        this.tipo = true;
        this.cd.detectChanges();
      }
    });

    await fetch(`${environment.apiUrl}/imagenes/listar`)
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

          //extraer num comentarios por imagen
          this.numComentariosPorImagen();
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

      await fetch(`${environment.apiUrl}/likes/contar-likes`)
      .then(response => response.json())
      .then(data => {
        this.count = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

      await fetch(`${environment.apiUrl}/likes/obtener/${this.usuarioLogueado.id}`)
      .then(response => response.json())
      .then(data => {
        this.likes = data;
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

  encontrarCantidad(id: number): number {
    const encontrado = this.numComentarios.find(e => e.image_id === id);
    if (encontrado) {
      return encontrado.cantidad;
    } else {
      return 0;
    }

  }

  obtenerCount(id:number):number{
    const encontrado= this.count.find((elem:any)=>elem.image_id===id);
    if(encontrado){
      return encontrado.count;
    }else{
      return 0;
    }
  }

  haceMatchLaImagen(id:number):number{
    const encontrado=this.likes.find((elem:any)=>elem.image_id===id);
    if(encontrado){
      return encontrado.id;
    }else{
      return 0;
    }
  }

  like(event:Event,image_id:number){
    const imagen=event.target as HTMLImageElement;
    const like_id=parseInt(imagen.id);
    if(like_id===0){
      const datos:any={};
      datos.image_id=image_id;
      datos.user_id=this.usuarioLogueado.id;
      //crear el like en la base de datos
      fetch(`${environment.apiUrl}/likes/crear`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
        body: JSON.stringify(datos)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        this.mensaje=data.mensaje;
        this.tipo=true;

        location.reload();
        
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
    }

  }

  dislike(event:Event){
    const imagen=event.target as HTMLImageElement;
    const like_id=parseInt(imagen.id);
    if(like_id>0){
      //eliminar el like de la base de datos
      fetch(`${environment.apiUrl}/likes/eliminar/${like_id}`,{
        method:'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        this.mensaje=data.mensaje;
        this.tipo=true;

        location.reload();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
    }
  }
}
