import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { isLogged } from '../../shared/utils/funciones';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario: any = {};

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
      ])
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
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });

    }
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);
    const datos:any={};
    datos.nick=this.miForm.value.nick;
    datos.nombre=this.miForm.value.nombre;
    datos.apellido=this.miForm.value.apellido;
    datos.email=this.miForm.value.email;
    datos.old_email=this.usuario.email;

    fetch(`${environment.apiUrl}/usuarios/actualizar`, {
      method: 'PUT',
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
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });

  }
}
