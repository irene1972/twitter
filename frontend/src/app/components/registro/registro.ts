import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;

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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
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

  get password() {
    return this.miForm.get('password');
  }

  get confirmPassword() {
    return this.miForm.get('confirmPassword');
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
    fetch(`${environment.apiUrl}/usuarios/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.miForm.value)
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
        //localStorage.setItem('usuarioTwitter',JSON.stringify(data.usuario));
        this.router.navigate(['/registro-exitoso']);
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
