import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isLogged } from '../../../shared/utils/funciones';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {

  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  urlImagenes: string = environment.imagesUrl2;
  imagenFile!: File | null;
  usuarioLogueado: any = {};
  usuario_id: string = '';
  datos: any = {};
  id:string | null='';

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      imagen: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    }, []);
  }

  get imagen() {
    return this.miForm.get('imagen');
  }

  get descripcion() {
    return this.miForm.get('descripcion');
  }

  async ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioLogueado = JSON.parse(usuarioString);

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      fetch(`${environment.apiUrl}/imagenes/detalle/${this.id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data[0]);
          this.datos = data[0];

          this.miForm.get('descripcion')?.setValue(this.datos.description);

        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });

    });




  }

  async cargarDatos() {
    if (!this.miForm.valid || !this.imagenFile) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log('this.miForm.value:', this.miForm.value);
    const formData = new FormData();

    formData.append('descripcion', this.miForm.value.descripcion);

    await this.consultarIdUsuario(this.usuarioLogueado.email);
    formData.append('usuario_id', this.usuario_id);

    // archivo
    formData.append('imagen', this.imagenFile);

    this.guardarImagen(formData);

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      //console.log(this.imagenFile);
    }
  }

  async guardarImagen(formData: FormData) {
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    await fetch(`${environment.apiUrl}/imagenes/actualizar/${this.id}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          this.tipo = false;
          return;
        }
        this.mensaje = data.mensaje;
        this.tipo = true;
        console.log(data);

        this.router.navigate(['/home'], {
          queryParams: { code: 3 }
        });

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  async consultarIdUsuario(email: string) {
    await fetch(`${environment.apiUrl}/usuarios/obtener/${email}`)
      .then(response => response.json())
      .then(data => {
        //console.log('data:',data);
        this.usuario_id = data.id.toString();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
