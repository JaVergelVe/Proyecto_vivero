import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceTsService } from '../../services/api.service.ts.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

  empleados: any[] = [];  
  admin:boolean = false;

  constructor(
    private empleadoService: ApiServiceTsService,  
    private _router: Router,
    private authService : AuthService
  ) {
    
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

  ngOnInit(): void {
    
  
    this.empleadoService.getEmpleados().subscribe(
      
      (data) => {
        
        this.empleados = data;  
       
      },
      (error) => {
        
        Swal.fire({
          icon: 'error',
          title: '¡Oops!',
          text: 'Hubo un error en el sistema, por favor intenta nuevamente más tarde.',
          confirmButtonText: 'Aceptar',
        });
      }
    );

    this.admin= this.empleadoService.getVariable()

  }
  navegate(ruta:string):void{

    this._router.navigate([ruta])

  }
}
