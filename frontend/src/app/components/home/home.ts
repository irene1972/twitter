import { ChangeDetectorRef, Component } from '@angular/core';
import { isLogged } from '../../shared/utils/funciones';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  mensaje: string = '';
  tipo: boolean = false;
  urlImgs: string = environment.imagesUrl;
  urlImagenes: string = environment.imagesUrl2;
  img: string = '1771573567161-331283568.png';
  imagen: string = '1771584371475-950923000.png';
  datos:any=[];

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioTwitter');

    if (!isLogged() || !usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log(code);
      if (code == 1) {
        this.mensaje = 'La imagen se ha guardado correctamente';
        this.tipo = true;
        this.cd.detectChanges();
      }
    });

    await fetch(`${environment.apiUrl}/imagenes/listar`)
            .then(response=>response.json())
            .then(data=>{
              console.log(data);
              this.datos=data;
            })
            .catch(error=>console.log(error))
            .finally(()=>{
              this.cd.detectChanges();
            });

  }
}
