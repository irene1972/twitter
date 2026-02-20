import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  miForm: FormGroup;
  mensaje: string='';
  tipo:boolean=false;

  constructor(private cd: ChangeDetectorRef,private router: Router){
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
    //console.log(this.miForm.value);
    fetch(`${environment.apiUrl}/usuarios/login`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body:JSON.stringify(this.miForm.value)
        })
          .then(response=>response.json())
          .then(data=>{
            //console.log(data);
            if(data.error){
              this.mensaje=data.error;
              return;
            }
            this.mensaje=data.mensaje;
            this.tipo=true;
            
            localStorage.setItem('usuarioTwitter',JSON.stringify({
              email:data.email,
              rol:data.rol,
              nombre:data.nombre
            }));
            this.router.navigate(['/home']);
          })
          .catch(error=>console.log(error))
          .finally(()=>{
            this.cd.detectChanges();
          });
  }
}
