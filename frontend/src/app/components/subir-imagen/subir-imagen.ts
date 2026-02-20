import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { isLogged } from '../../shared/utils/funciones';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subir-imagen',
  imports: [ReactiveFormsModule],
  templateUrl: './subir-imagen.html',
  styleUrl: './subir-imagen.css',
})
export class SubirImagen {

  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  imagenFile!: File | null;
  usuario: any = {};
  usuario_id: string = '';

  constructor(private cd: ChangeDetectorRef, private router: Router) {
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

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = JSON.parse(usuarioString);
  }

  async cargarDatos() {
    if (!this.miForm.valid || !this.imagenFile) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log('this.miForm.value:', this.miForm.value);
    const formData = new FormData();

    formData.append('descripcion', this.miForm.value.descripcion);

    await this.consultarIdUsuario(this.usuario.email);
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
    await fetch(`${environment.apiUrl}/imagenes/crear`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          this.tipo=false;
          return;
        }
        this.mensaje = data.mensaje;
        this.tipo = true;
        
        this.router.navigate(['/home'],{
          queryParams:{code:1}
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
