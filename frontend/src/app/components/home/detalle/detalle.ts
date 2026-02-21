import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { isLogged } from '../../../shared/utils/funciones';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {

  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  urlImagenes: string = environment.imagesUrl2;
  usuarioLogueado: any = {};
  usuario: any = {};
  comentarios: any[] = [];
  numComentarios: any[] = [];
  datos: any = {};
  count:any[]=[];
  likes:any[]=[];

  miForm: FormGroup;

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      content: new FormControl('', [
        Validators.required
      ]),
      image_id: new FormControl('', [])
    }, []);
  }

  get content() {
    return this.miForm.get('content');
  }

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
      //console.log(id);

      fetch(`${environment.apiUrl}/imagenes/detalle/${id}`)
        .then(response => response.json())
        .then(data => {

          if (data.length === 0) {
            this.mensaje = 'No hay datos';
            this.tipo = true;
          } else {
            this.datos = data[0];
            console.log('datos: ', this.datos);
            //extraer num comentarios por imagen
            this.numComentariosPorImagen();

            //consultar comentarios para mostrarlos
            this.consultarComentarios();
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });

      fetch(`${environment.apiUrl}/likes/contar-likes`)
        .then(response => response.json())
        .then(data => {
          this.count = data;
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });

      fetch(`${environment.apiUrl}/likes/obtener/${this.usuarioLogueado.id}`)
      .then(response => response.json())
      .then(data => {
        this.likes = data;
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
    });

  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);


    const user = this.consultarUsuarioYGuardarComentario(this.usuarioLogueado.email);

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

  consultarComentarios() {
    fetch(`${environment.apiUrl}/comentarios/listar/${this.datos.id}`)
      .then(response => response.json())
      .then(data => {
        this.comentarios = data;
        console.log('comentarios: ', data);
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  consultarUsuarioYGuardarComentario(email: string) {
    fetch(`${environment.apiUrl}/usuarios/obtener/${email}`)
      .then(response => response.json())
      .then(data => {
        this.usuario = data;

        const comentario: any = {}
        comentario.content = this.miForm.value.content;
        comentario.image_id = this.datos.id;
        comentario.user_id = this.usuario.id;

        fetch(`${environment.apiUrl}/comentarios/crear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify(comentario)
        })
          .then(response => response.json())
          .then(data => {
            //console.log(data);
            if (data.error) {
              this.mensaje = data.error;
              return;
            }
            this.mensaje = data.mensaje;
            this.tipo = true;
            //this.miForm.reset();
            //this.router.navigate(['/detalle/',this.datos.id]);
            location.reload();
          })
          .catch(error => console.log(error))
          .finally(() => {
            this.cd.detectChanges();
          });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  eliminarComentario(id: number) {
    fetch(`${environment.apiUrl}/comentarios/eliminar/${id}`, {
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
        //this.router.navigate(['/detalle/',this.datos.id]);
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  obtenerCount(id: number):number {
    const encontrado = this.count.find((elem: any) => elem.image_id === id);
    if (encontrado) {
      return encontrado.count;
    } else {
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
