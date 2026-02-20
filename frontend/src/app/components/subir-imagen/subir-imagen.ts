import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { isLogged } from '../../shared/utils/funciones';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

    if (!isLogged() || !usuarioString) this.router.navigate(['/login']);
  }

  cargarDatos(){
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);
  }
}
