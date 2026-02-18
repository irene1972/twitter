import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  miForm: FormGroup;
  mensaje: string='';
  tipo:boolean=false;

  constructor(){
    this.miForm=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ])
    },[]);
  }

  get email(){
    return this.miForm.get('email');
  }

  get password(){
    return this.miForm.get('password');
  }

  cargarDatos(){
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }
}
