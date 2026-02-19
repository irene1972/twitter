import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-confirmar',
  imports: [],
  templateUrl: './confirmar.html',
  styleUrl: './confirmar.css',
})
export class Confirmar {
  mensaje:string='';
  tipo:boolean=false;

  constructor(private route: ActivatedRoute,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    //recuperar parámetro de la url
    this.route.paramMap.subscribe(params => {
      const token= params.get('token');
      //console.log(token);

      fetch(`${environment.apiUrl}/usuarios/confirmar`,{
                method:'PUT',
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                body:JSON.stringify({token})
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
                })
                .catch(error=>console.log(error))
                .finally(()=>{
                  this.cd.detectChanges();
                });
    });
  }
}
