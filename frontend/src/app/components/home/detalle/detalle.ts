import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogged } from '../../../shared/utils/funciones';

@Component({
  selector: 'app-detalle',
  imports: [],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {

  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  urlImagenes: string = environment.imagesUrl2;
  numComentarios: any[] = [];
  datos: any = {};

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id);

      fetch(`${environment.apiUrl}/imagenes/detalle/${id}`)
        .then(response => response.json())
        .then(data => {

          if (data.length === 0) {
            this.mensaje = 'No hay datos';
            this.tipo = true;
          } else {
            this.datos = data[0];
            console.log(this.datos[0]);
            //extraer num comentarios por imagen
            this.numComentariosPorImagen();
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });

    });

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
}
