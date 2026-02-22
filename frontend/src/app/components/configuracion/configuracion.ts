import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { isLogged } from '../../shared/utils/funciones';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario: any = {};
  imagenFile!: File | null;
  urlImgs: string = environment.imagesUrl;
  img: string = '';

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nick: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      imagen: new FormControl('', [])
    }, []);
  }

  get nick() {
    return this.miForm.get('nick');
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellido() {
    return this.miForm.get('apellido');
  }

  get email() {
    return this.miForm.get('email');
  }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (isLogged() && usuarioString) {

      this.usuario = JSON.parse(usuarioString);

      fetch(`${environment.apiUrl}/usuarios/obtener/${this.usuario.email}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          this.mensaje = data.mensaje;
          this.tipo = true;

          this.miForm.get('nick')?.setValue(data.nick);
          this.miForm.get('nombre')?.setValue(data.name);
          this.miForm.get('apellido')?.setValue(data.surname);
          this.miForm.get('email')?.setValue(data.email);
          this.img = data.image;

        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });

    } else {
      this.router.navigate(['/login']);
    }
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    if (!this.imagenFile) {

      //console.log(this.miForm.value);
      const datos: any = {};
      datos.nick = this.miForm.value.nick;
      datos.nombre = this.miForm.value.nombre;
      datos.apellido = this.miForm.value.apellido;
      datos.email = this.miForm.value.email;
      datos.old_email = this.usuario.email;

      this.guardarUsuarioSinImagen(datos);

    } else {
      const formData = new FormData();

      // campos normales
      Object.entries(this.miForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      formData.append('old_email', this.usuario.email);

      // archivo
      formData.append('imagen', this.imagenFile);

      this.guardarUsuarioConImagen(formData);

    }

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      //console.log(this.imagenFile);
    }
  }

  async guardarUsuarioSinImagen(datos: any) {
    await fetch(`${environment.apiUrl}/usuarios/actualizar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(datos)
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
        //console.log(data);

        //guardar los datos en el local storage
        localStorage.setItem('usuarioTwitter', JSON.stringify({
          id: data.id,
          email: data.email,
          rol: data.rol,
          nombre: data.nombre,
          imagen: data.imagen
        }));

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  async guardarUsuarioConImagen(formData: FormData) {
    await fetch(`${environment.apiUrl}/usuarios/actualizar-con-imagen`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        this.mensaje = data.mensaje;
        this.tipo = true;

        //guardar los datos en el local storage
        localStorage.setItem('usuarioTwitter', JSON.stringify({
          id:data.id,
          email: data.email,
          rol: data.rol,
          nombre: data.nombre,
          imagen: data.imagen
        }));

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
