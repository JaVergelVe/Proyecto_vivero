import { Component } from '@angular/core';
import { Router,  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
