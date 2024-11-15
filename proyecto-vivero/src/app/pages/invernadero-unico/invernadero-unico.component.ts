import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invernadero-unico',
  standalone: true,
  imports: [],
  templateUrl: './invernadero-unico.component.html',
  styleUrl: './invernadero-unico.component.css'
})
export class InvernaderoUnicoComponent {

  temperaruta:number=0;
  gas:number=0;
  humedad:string=''

  constructor(
    
    private authService: AuthService,  
    private _router: Router
  ) {}


  
  navegate(ruta:string):void{

    this._router.navigate([ruta])

  }

  cerrarSesion(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Seguro que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire('Cerrado', 'Has cerrado sesión exitosamente.', 'success');
      }
    });
  }
}
